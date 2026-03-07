import { Token } from '../types';

export const OPERATORS = ['+', '−', '×', '÷'] as const;
export type Operator = (typeof OPERATORS)[number];

// ─── Evaluate expression string ───────────────────────────────────────────────
export function evaluate(expr: string): string {
  try {
    if (!expr || expr === '-') return '0';

    const js = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/%/g, '/100');

    // eslint-disable-next-line no-new-func
    const r: number = Function(`"use strict"; return (${js})`)();

    if (!isFinite(r) || isNaN(r)) return 'Error';

    // Round floating-point noise
    return parseFloat(r.toPrecision(12)).toString();
  } catch {
    return 'Error';
  }
}

// ─── Format number with commas ────────────────────────────────────────────────
export function addCommas(raw: string): string {
  if (!raw || raw === 'Error') return raw || '0';
  const negative = raw.startsWith('-');
  const abs = negative ? raw.slice(1) : raw;
  const [intPart, decPart] = abs.split('.');
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const result = decPart !== undefined ? `${formatted}.${decPart}` : formatted;
  return negative ? `-${result}` : result;
}

// ─── Format final result for display ──────────────────────────────────────────
export function formatResult(raw: string): string {
  if (raw === 'Error') return raw;
  const n = parseFloat(raw);
  if (isNaN(n)) return raw;
  if (Math.abs(n) >= 1e12 || (n !== 0 && Math.abs(n) < 1e-9)) {
    return n.toExponential(5);
  }
  return addCommas(parseFloat(n.toPrecision(10)).toString());
}

// ─── Get the last typed segment (after last operator) ─────────────────────────
export function lastSegment(expr: string): string {
  if (!expr) return '';
  let idx = -1;
  for (let i = expr.length - 1; i >= 0; i--) {
    if ((OPERATORS as readonly string[]).includes(expr[i])) {
      idx = i;
      break;
    }
  }
  return idx >= 0 ? expr.slice(idx + 1) : expr;
}

// ─── Format segment for big display ──────────────────────────────────────────
export function formatSegment(seg: string): string {
  if (!seg) return '0';
  if (seg.endsWith('%')) {
    const num = seg.slice(0, -1);
    return addCommas(num) + '%';
  }
  return addCommas(seg);
}

// ─── Tokenise expression for equation line ────────────────────────────────────
export function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let current = '';

  for (const ch of expr) {
    if ((OPERATORS as readonly string[]).includes(ch)) {
      if (current) tokens.push({ type: 'num', value: current });
      tokens.push({ type: 'op', value: ch });
      current = '';
    } else {
      current += ch;
    }
  }

  if (current) tokens.push({ type: 'num', value: current });
  return tokens;
}

// ─── Input mutation helpers ──────────────────────────────────────────────────
export function isOperator(ch: string): boolean {
  return (OPERATORS as readonly string[]).includes(ch);
}

export function toggleSign(expr: string): string {
  if (!expr) return '-';
  const lastOpIdx = Math.max(-1, ...OPERATORS.map(op => expr.lastIndexOf(op)));
  const pre = expr.slice(0, lastOpIdx + 1);
  const num = expr.slice(lastOpIdx + 1);
  if (!num) return expr;
  return num.startsWith('-') ? pre + num.slice(1) : pre + '-' + num;
}
