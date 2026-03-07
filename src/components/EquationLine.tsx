import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
} from 'react-native';
import { Token, Skin } from '../types';

interface Props {
  tokens: Token[];
  settled: boolean;
  result: string;
  expr: string;
  skin: Skin;
}

function BlinkingCursor({ color }: { color: string }) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0, duration: 0, delay: 550, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 0, delay: 550, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  return (
    <Animated.View
      style={{
        width: 2,
        height: 14,
        backgroundColor: color,
        borderRadius: 1,
        marginLeft: 3,
        opacity,
        alignSelf: 'center',
      }}
    />
  );
}

export const EquationLine: React.FC<Props> = ({
  tokens,
  settled,
  result,
  expr,
  skin,
}) => {
  if (tokens.length === 0 && !settled) {
    return (
      <View style={styles.row}>
        <Text style={[styles.placeholder, { color: skin.eqColor }]}>0</Text>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      {tokens.map((tok, i) => (
        <Text
          key={i}
          style={[
            styles.token,
            {
              color: tok.type === 'op' ? skin.eqOpColor : skin.eqColor,
              fontWeight: tok.type === 'op' ? '700' : '400',
              paddingHorizontal: tok.type === 'op' ? 4 : 1,
            },
          ]}
        >
          {tok.value}
        </Text>
      ))}

      {/* Show = after result is settled */}
      {settled && result ? (
        <Text style={[styles.token, { color: skin.eqOpColor, fontWeight: '700', paddingHorizontal: 4 }]}>
          =
        </Text>
      ) : null}

      {/* Blinking cursor while typing */}
      {!settled && expr ? <BlinkingCursor color={skin.eqOpColor} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minHeight: 22,
    marginBottom: 6,
  },
  token: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    letterSpacing: 0.2,
    includeFontPadding: false,
  },
  placeholder: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    opacity: 0.3,
  },
});
