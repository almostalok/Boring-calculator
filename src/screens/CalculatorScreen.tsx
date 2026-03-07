import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Platform,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';

import { useCalculator } from '../hooks/useCalculator';
import { BigDisplay } from '../components/BigDisplay';
import { EquationLine } from '../components/EquationLine';
import { Key } from '../components/Key';
import { SkinPanel } from '../components/SkinPanel';
import { SKINS } from '../skins';
import { KeyDef, KeyKind } from '../types';

// ─── Button layout — exactly matching real app ─────────────────────────────
const ROWS: KeyDef[][] = [
  [
    { label: 'C',   kind: 'fn' },
    { label: '%',   kind: 'fn' },
    { label: '⌫',   kind: 'fn' },
    { label: '÷',   kind: 'op' },
  ],
  [
    { label: '7', kind: 'num' },
    { label: '8', kind: 'num' },
    { label: '9', kind: 'num' },
    { label: '×', kind: 'op' },
  ],
  [
    { label: '4', kind: 'num' },
    { label: '5', kind: 'num' },
    { label: '6', kind: 'num' },
    { label: '−', kind: 'op' },
  ],
  [
    { label: '1', kind: 'num' },
    { label: '2', kind: 'num' },
    { label: '3', kind: 'num' },
    { label: '+', kind: 'op' },
  ],
  [
    { label: '0',   kind: 'num' },
    { label: '.',   kind: 'num' },
    { label: '+/-', kind: 'fn'  },
    { label: '=',   kind: 'eq'  },
  ],
];

export const CalculatorScreen: React.FC = () => {
  const { height: screenH } = useWindowDimensions();
  const [skinIdx, setSkinIdx]   = useState(0);
  const [showSkins, setShowSkins] = useState(false);

  const skin = SKINS[skinIdx];
  const calc = useCalculator();

  // Long-press to copy result
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copiedOpacity = useRef(new Animated.Value(0)).current;

  const onDisplayPressIn = () => {
    const val = calc.settled
      ? calc.result
      : calc.showLivePreview
      ? calc.livePreview
      : calc.bigDisplay;
    if (!val || val === '0') return;

    longPressRef.current = setTimeout(async () => {
      await Clipboard.setStringAsync(val.replace(/,/g, ''));
      Animated.sequence([
        Animated.timing(copiedOpacity, { toValue: 1, duration: 120, useNativeDriver: true }),
        Animated.delay(1000),
        Animated.timing(copiedOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    }, 500);
  };

  const onDisplayPressOut = () => {
    if (longPressRef.current) clearTimeout(longPressRef.current);
  };

  // Dynamic C/⌫ label
  const rows = ROWS.map(row =>
    row.map(btn =>
      btn.label === 'C' && !calc.settled && calc.expr
        ? { ...btn, label: '⌫' }
        : btn
    )
  );

  const keypadFlex = 0.44;
  const displayFlex = 1 - keypadFlex;

  return (
    <View style={[styles.root, { backgroundColor: skin.bg }]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={
          skin.id === 'opal' || skin.id === 'andy'
            ? 'dark-content'
            : 'light-content'
        }
      />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        {/* ── Top bar ── */}
        <View style={styles.topBar}>
          <Text style={[styles.appLabel, { color: skin.eqColor }]}>!CALC</Text>
          <View style={styles.topRight}>
            {/* Mute toggle */}
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={calc.toggleMute}
              activeOpacity={0.6}
            >
              <Text style={[styles.muteIcon, { color: skin.fnColor, opacity: calc.muted ? 0.22 : 0.65 }]}>
                ♪
              </Text>
            </TouchableOpacity>

            {/* Skin toggle */}
            <TouchableOpacity
              style={[styles.skinDot, { backgroundColor: skin.eqBtnColor }]}
              onPress={() => setShowSkins(v => !v)}
              activeOpacity={0.75}
            >
              <Text style={[styles.skinDotText, { color: skin.bg }]}>✦</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Display ── */}
        <View
          style={[styles.display, { flex: displayFlex }]}
          onStartShouldSetResponder={() => true}
          onResponderGrant={onDisplayPressIn}
          onResponderRelease={onDisplayPressOut}
        >
          {/* Copied toast */}
          <Animated.View style={[styles.copiedToast, { opacity: copiedOpacity, backgroundColor: skin.eqBtnColor }]}>
            <Text style={[styles.copiedText, { color: skin.bg }]}>COPIED</Text>
          </Animated.View>

          <EquationLine
            tokens={calc.tokens}
            settled={calc.settled}
            result={calc.result}
            expr={calc.expr}
            skin={skin}
          />

          {/* Big 3D number */}
          <BigDisplay
            value={calc.bigDisplay}
            skin={skin}
            animKey={calc.animKey}
            doAnimate={calc.settled}
          />

          {/* Live preview */}
          {!calc.settled && calc.showLivePreview && (
            <Text style={[styles.livePreview, { color: skin.eqOpColor }]}>
              = {calc.livePreview}
            </Text>
          )}

          {/* Hold to copy hint */}
          {(calc.settled || calc.showLivePreview) && (
            <Text style={[styles.holdHint, { color: skin.eqColor }]}>
              HOLD TO COPY
            </Text>
          )}
        </View>

        {/* ── Separator ── */}
        <View style={[styles.separator, { backgroundColor: skin.eqColor }]} />

        {/* ── Keypad ── */}
        <View style={[styles.keypad, { flex: keypadFlex }]}>
          {rows.map((row, ri) => (
            <View key={ri} style={styles.keyRow}>
              {row.map(btn => (
                <Key
                  key={btn.label}
                  label={btn.label}
                  kind={btn.kind}
                  skin={skin}
                  onPress={calc.press}
                />
              ))}
            </View>
          ))}
        </View>
      </SafeAreaView>

      {/* ── Skin panel overlay ── */}
      {showSkins && (
        <SkinPanel
          currentIndex={skinIdx}
          onSelect={setSkinIdx}
          onClose={() => setShowSkins(false)}
          skin={skin}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 0,
    height: 44,
  },
  appLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    letterSpacing: 3,
    textTransform: 'uppercase',
    opacity: 0.7,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  muteIcon: {
    fontSize: 18,
  },
  skinDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skinDotText: {
    fontSize: 12,
    fontWeight: '700',
  },
  display: {
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 14,
    position: 'relative',
  },
  copiedToast: {
    position: 'absolute',
    top: 12,
    right: 24,
    zIndex: 10,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  copiedText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    letterSpacing: 2,
  },
  livePreview: {
    fontFamily: 'Inter_500Medium',
    fontSize: 18,
    textAlign: 'right',
    marginTop: 6,
    opacity: 0.8,
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  holdHint: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 8,
    letterSpacing: 2,
    textAlign: 'right',
    marginTop: 8,
    opacity: 0.35,
    textTransform: 'uppercase',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    opacity: 0.12,
    marginHorizontal: 24,
  },
  keypad: {
    paddingHorizontal: 4,
    paddingBottom: Platform.OS === 'android' ? 8 : 4,
    paddingTop: 4,
  },
  keyRow: {
    flex: 1,
    flexDirection: 'row',
  },
});
