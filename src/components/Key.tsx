import React, { useRef, useCallback } from 'react';
import {
  Animated,
  Pressable,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Svg, { Path, Line } from 'react-native-svg';
import { KeyKind, Skin } from '../types';

interface Props {
  label: string;
  kind: KeyKind;
  skin: Skin;
  onPress: (label: string) => void;
  flex?: number;
}

function BackspaceIcon({ color, size }: { color: string; size: number }) {
  return (
    <Svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 28 22"
      fill="none"
    >
      <Path
        d="M10 2L2.5 11L10 20H25.5V2H10Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Line
        x1={14.5} y1={7.5} x2={21.5} y2={14.5}
        stroke={color} strokeWidth={1.8} strokeLinecap="round"
      />
      <Line
        x1={21.5} y1={7.5} x2={14.5} y2={14.5}
        stroke={color} strokeWidth={1.8} strokeLinecap="round"
      />
    </Svg>
  );
}

export const Key: React.FC<Props> = ({ label, kind, skin, onPress, flex = 1 }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 0.78,
        tension: 400,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.28,
        duration: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressOut = useCallback(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        tension: 280,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const color =
    kind === 'op' ? skin.opColor
    : kind === 'eq' ? skin.eqBtnColor
    : kind === 'fn' ? skin.fnColor
    : skin.numColor;

  const fontSize =
    kind === 'fn' ? 18
    : kind === 'op' || kind === 'eq' ? 28
    : 28;

  const fontWeight: '300' | '400' | '500' | '600' | '700' =
    kind === 'num' ? '300'
    : kind === 'fn' ? '500'
    : '600';

  return (
    <Animated.View style={[{ flex, transform: [{ scale }], opacity }]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress(label)}
        style={styles.pressable}
        android_ripple={null}
        hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
      >
        <View style={styles.inner}>
          {label === '⌫' ? (
            <BackspaceIcon color={color} size={24} />
          ) : (
            <Text
              style={[
                styles.label,
                {
                  color,
                  fontSize,
                  fontWeight,
                  fontFamily:
                    kind === 'num'
                      ? 'Inter_300Light'
                      : kind === 'fn'
                      ? 'Inter_500Medium'
                      : 'Inter_600SemiBold',
                },
              ]}
            >
              {label}
            </Text>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    includeFontPadding: false,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
});
