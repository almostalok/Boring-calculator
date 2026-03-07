import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';
import { Skin } from '../types';

interface Props {
  value: string;
  skin: Skin;
  animKey: number;
  doAnimate: boolean;
}

// ─── Measure visual width of the string ───────────────────────────────────────
// Bebas Neue is ultra-narrow — approx character widths relative to font size
function measureUnits(str: string): number {
  let units = 0;
  for (const c of str) {
    if (c === ',' || c === ' ')   units += 0.30;
    else if (c === '.' || c === ':') units += 0.25;
    else if (c === '1' || c === '-') units += 0.48;
    else if (c === '%')             units += 0.82;
    else                            units += 0.82;
  }
  return Math.max(units, 0.5);
}

// ─── Build layered text-shadow array ─────────────────────────────────────────
function buildShadowLayers(color: string, depth: number) {
  const shadows = [];
  for (let i = 1; i <= depth; i++) {
    shadows.push({
      offset: { width: i, height: i },
      color,
      blurRadius: 0,
    });
  }
  // Soft ambient shadow on top
  shadows.push({ offset: { width: depth + 2, height: depth + 4 }, color: 'rgba(0,0,0,0.9)', blurRadius: depth });
  return shadows;
}

// ─── Gradient text via SVG (Chroma skin) ──────────────────────────────────────
function GradientBigText({
  value,
  fontSize,
  width,
  shadowColor,
  depth,
}: {
  value: string;
  fontSize: number;
  width: number;
  shadowColor: string;
  depth: number;
}) {
  const height = fontSize * 1.2;
  // Build shadow layers as SVG dx/dy offsets
  const shadowLayers = Array.from({ length: depth }, (_, i) => ({
    dx: i + 1,
    dy: i + 1,
  }));

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="chromaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%"   stopColor="#FF79C6" />
            <Stop offset="28%"  stopColor="#BD93F9" />
            <Stop offset="56%"  stopColor="#8BE9FD" />
            <Stop offset="78%"  stopColor="#50FA7B" />
            <Stop offset="100%" stopColor="#FFB86C" />
          </LinearGradient>
        </Defs>
        {/* Depth shadow layers */}
        {shadowLayers.map((s, i) => (
          <SvgText
            key={i}
            x={width - (s.dx * 0.5)}
            y={fontSize * 0.92}
            textAnchor="end"
            fontFamily="BebasNeue_400Regular"
            fontSize={fontSize}
            fill={shadowColor}
            opacity={0.6 - i * (0.4 / depth)}
          >
            {value}
          </SvgText>
        ))}
        {/* Gradient face */}
        <SvgText
          x={width}
          y={fontSize * 0.92}
          textAnchor="end"
          fontFamily="BebasNeue_400Regular"
          fontSize={fontSize}
          fill="url(#chromaGrad)"
        >
          {value}
        </SvgText>
      </Svg>
    </View>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export const BigDisplay: React.FC<Props> = ({ value, skin, animKey, doAnimate }) => {
  const { width: screenW } = useWindowDimensions();
  const padH = 28;
  const availW = screenW - padH * 2;

  const units    = measureUnits(value);
  // Font size to fill ~96% of available width
  const rawFS    = (availW * 0.96) / (units * 0.52);
  const fontSize = Math.min(rawFS, screenW * 0.46);
  const depth    = Math.max(4, Math.round(fontSize * 0.22));

  // Entrance animation
  const scaleAnim = useRef(new Animated.Value(doAnimate ? 0.7 : 1)).current;
  const opacityAnim = useRef(new Animated.Value(doAnimate ? 0 : 1)).current;
  const translateAnim = useRef(new Animated.Value(doAnimate ? 20 : 0)).current;

  useEffect(() => {
    if (!doAnimate) {
      scaleAnim.setValue(1);
      opacityAnim.setValue(1);
      translateAnim.setValue(0);
      return;
    }
    scaleAnim.setValue(0.7);
    opacityAnim.setValue(0);
    translateAnim.setValue(20);

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 180,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.spring(translateAnim, {
        toValue: 0,
        tension: 180,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animKey]);

  const animStyle = {
    transform: [{ scale: scaleAnim }, { translateY: translateAnim }],
    opacity: opacityAnim,
  };

  if (skin.shadowType === 'gradient') {
    return (
      <Animated.View style={[styles.container, animStyle]}>
        <GradientBigText
          value={value}
          fontSize={fontSize}
          width={availW}
          shadowColor={skin.shadowColor}
          depth={depth}
        />
      </Animated.View>
    );
  }

  // ── Solid 3-D text: stacked Text layers ────────────────────────────────────
  const shadowLayers = buildShadowLayers(skin.shadowColor, depth);

  return (
    <Animated.View style={[styles.container, animStyle]}>
      <Text
        style={[
          styles.number,
          {
            fontSize,
            color: skin.faceColor,
            // React Native textShadow only supports single shadow,
            // so we approximate with the deepest shadow
            textShadowColor: skin.shadowColor,
            textShadowOffset: { width: depth, height: depth },
            textShadowRadius: 0,
          },
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit={false}
      >
        {value}
      </Text>
      {/* Extra ambient drop shadow for depth */}
      <Text
        style={[
          styles.number,
          styles.shadowLayer,
          {
            fontSize,
            color: 'rgba(0,0,0,0.85)',
            top: depth + 2,
            left: depth + 2,
          },
        ]}
        numberOfLines={1}
        pointerEvents="none"
      >
        {value}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  number: {
    fontFamily: 'BebasNeue_400Regular',
    lineHeight: undefined,   // auto
    textAlign: 'right',
    includeFontPadding: false,
    letterSpacing: 1,
  },
  shadowLayer: {
    position: 'absolute',
    zIndex: -1,
  },
});
