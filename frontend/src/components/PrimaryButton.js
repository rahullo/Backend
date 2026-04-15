import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function PrimaryButton({ label, onPress, disabled }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, disabled && styles.disabled]} disabled={disabled}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
  disabled: { opacity: 0.5 },
  label: { color: 'white', textAlign: 'center', fontWeight: '600' },
});
