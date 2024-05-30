import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

interface CircleDotButtonProps {
  selected: boolean;
  onPress: () => void;
}

const CircleDotButton: React.FC<CircleDotButtonProps> = ({ selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.circle, selected && styles.selectedCircle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    backgroundColor: '#000',
  },
});

export default CircleDotButton;
