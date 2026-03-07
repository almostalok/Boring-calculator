import { useState, useCallback } from 'react';
import {
  evaluate,
  formatResult,
  lastSegment,
  formatSegment,
  isOperator,
  toggleSign,
  tokenize,
} from '../engine/math';
import { playTone } from '../engine/audio';
import { Token } from '../types';

export interface CalcOutput {
  // State
  expr: string;
  result: string;
  settled: boolean;
  animKey: number;
  // Derived display values
  bigDisplay: string;       // what the huge number shows
  tokens: Token[];          // tokenised equation line
  livePreview: string;      // = xxx shown while typing
  showLivePreview: boolean;
  // Actions
  press: (label: string) => void;
  muted: boolean;
  toggleMute: () => void;
}

export function useCalculator(): CalcOutput {
  const [expr, setExpr]       = useState('');
  const [result, setResult]   = useState('');
  const [settled, setSettled] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [muted, setMuted]     = useState(false);

  const toggleMute = useCallback(() => setMuted(m => !m), []);

  const press = useCallback((label: string) => {
    // Fire tone/haptic
    playTone(label, muted);

    // ── EQUALS ──────────────────────────────────────────────────────────────
    if (label === '=') {
      if (!expr) return;
      const raw = evaluate(expr);
      setResult(formatResult(raw));
      setSettled(true);
      setAnimKey(k => k + 1);
      return;
    }

    // ── POST-SETTLED: next action after = pressed ────────────────────────────
    if (settled) {
      const rawResult = result.replace(/,/g, '');
      if (isOperator(label)) {
        setExpr(rawResult + label); setResult(''); setSettled(false);
      } else if (label === 'C') {
        setExpr(''); setResult(''); setSettled(false);
      } else if (label === '⌫') {
        setExpr(''); setResult(''); setSettled(false);
      } else if (label === '%') {
        setExpr(rawResult + '%'); setResult(''); setSettled(false);
      } else {
        setExpr(label); setResult(''); setSettled(false);
      }
      return;
    }

    // ── CLEAR ────────────────────────────────────────────────────────────────
    if (label === 'C') {
      setExpr('');
      return;
    }

    // ── BACKSPACE ────────────────────────────────────────────────────────────
    if (label === '⌫') {
      setExpr(e => e.slice(0, -1));
      return;
    }

    // ── SIGN TOGGLE ──────────────────────────────────────────────────────────
    if (label === '+/-') {
      setExpr(e => toggleSign(e));
      return;
    }

    // ── PERCENT ──────────────────────────────────────────────────────────────
    if (label === '%') {
      if (expr && !isOperator(expr.slice(-1)) && !expr.endsWith('%')) {
        setExpr(e => e + '%');
      }
      return;
    }

    // ── OPERATOR ─────────────────────────────────────────────────────────────
    if (isOperator(label)) {
      if (!expr) {
        if (label === '−') setExpr('-');
        return;
      }
      // Replace trailing operator
      if (isOperator(expr.slice(-1))) {
        setExpr(e => e.slice(0, -1) + label);
        return;
      }
      setExpr(e => e + label);
      return;
    }

    // ── DECIMAL ──────────────────────────────────────────────────────────────
    if (label === '.') {
      const seg = lastSegment(expr);
      if (seg.includes('.') || seg.includes('%')) return;
      if (!expr || isOperator(expr.slice(-1))) {
        setExpr(e => e + '0.');
        return;
      }
      setExpr(e => e + '.');
      return;
    }

    // ── MAX LENGTH GUARD ─────────────────────────────────────────────────────
    if (expr.length >= 26) return;

    // ── DIGIT ────────────────────────────────────────────────────────────────
    setExpr(e => e + label);
  }, [expr, result, settled, muted]);

  // ── Derived values ─────────────────────────────────────────────────────────
  const seg         = lastSegment(expr);
  const bigDisplay  = settled ? result : formatSegment(seg);

  const liveRaw     = (!settled && expr) ? evaluate(expr) : '';
  const livePreview = liveRaw && liveRaw !== 'Error' ? formatResult(liveRaw) : '';
  const showLivePreview = Boolean(
    livePreview && livePreview !== bigDisplay.replace(/,/g, '')
  );

  const tokens = tokenize(expr);

  return {
    expr,
    result,
    settled,
    animKey,
    bigDisplay,
    tokens,
    livePreview,
    showLivePreview,
    press,
    muted,
    toggleMute,
  };
}
