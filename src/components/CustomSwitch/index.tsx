

import React from 'react';
import {
  Switch,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {fonts, fontRegular} from '../../constants/fonts';

// Props interface for the CustomSwitch component
type Props = {
  value: boolean; // Current state of the switch (on/off)
  onValueChange: (v: boolean) => void; // Callback when the switch value changes
  label?: string; // Optional label to display next to the switch
  style?: ViewStyle; // Optional custom styles for the container
  labelStyle?: TextStyle; // Optional custom styles for the label text
};

// Main CustomSwitch component
const CustomSwitch: React.FC<Props> = ({
  value,
  onValueChange,
  label,
  style,
  labelStyle,
}) => (
  // Container for the label and switch
  <View style={[styles.container, style]}>
    {/* Render label if provided */}
    {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
    {/* Native Switch component */}
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{false: '#d1d5db', true: '#2563eb'}} // Track color for off/on
      thumbColor={value ? '#fff' : '#f4f3f4'} // Thumb color based on value
    />
  </View>
);

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center', marginVertical: 6}, // Row layout for label and switch
  label: {
    marginRight: 12,
    fontSize: fonts.font15,
    color: '#111827',
    fontFamily: fontRegular,
  }, // Label styling
});

export default CustomSwitch;
