import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Skin } from '../types';
import { SKINS } from '../skins';

interface Props {
  currentIndex: number;
  onSelect: (index: number) => void;
  onClose: () => void;
  skin: Skin;
}

export const SkinPanel: React.FC<Props> = ({
  currentIndex,
  onSelect,
  onClose,
  skin,
}) => {
  const translateY = useRef(new Animated.Value(-20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        tension: 280,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <>
      {/* Backdrop */}
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

      <Animated.View
        style={[
          styles.panel,
          { transform: [{ translateY }], opacity },
        ]}
      >
        {SKINS.map((s, i) => (
          <TouchableOpacity
            key={s.id}
            style={[
              styles.row,
              i === currentIndex && styles.rowActive,
            ]}
            onPress={() => { onSelect(i); onClose(); }}
            activeOpacity={0.65}
          >
            <View style={[styles.dot, { backgroundColor: s.eqBtnColor }]} />
            <Text style={[styles.name, i === currentIndex && styles.nameActive]}>
              {s.name}
            </Text>
            <Text style={styles.tagline}>{s.tagline}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    top: 52,
    right: 16,
    zIndex: 50,
    backgroundColor: 'rgba(10,10,10,0.92)',
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    minWidth: 230,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 10,
  },
  rowActive: {
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  name: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: 'rgba(255,255,255,0.50)',
    minWidth: 72,
  },
  nameActive: {
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
  },
  tagline: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: 'rgba(255,255,255,0.28)',
    marginLeft: 'auto',
    flexShrink: 1,
  },
});
