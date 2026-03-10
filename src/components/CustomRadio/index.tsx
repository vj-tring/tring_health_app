

import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {fonts, fontRegular} from '../../constants/fonts';

// Define the props interface for the CustomRadio component
type Props = {
  selected: boolean; // Current selected state
  onPress: () => void; // Callback when radio button is pressed
  label?: string; // Optional label text
  style?: ViewStyle; // Optional custom styles for container
  labelStyle?: TextStyle; // Optional custom styles for label
};

// Main CustomRadio component
const CustomRadio: React.FC<Props> = ({
  selected,
  onPress,
  label,
  style,
  labelStyle,
}) => (
  // Touchable container for the radio button
  <TouchableOpacity
    style={[styles.container, style]}
    onPress={onPress} // Handle press event
    activeOpacity={0.7} // Slight opacity change on press
    accessibilityRole="radio" // Accessibility role for screen readers
    accessibilityState={{selected}}>
    {/* Radio button outer circle */}
    <View style={[styles.outer, selected && styles.selected]}>
      {/* Inner circle - only shown when selected */}
      {selected && <View style={styles.inner} />}
    </View>
    {/* Optional label text, only render if string */}
    {typeof label === 'string' ? (
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    ) : null}
  </TouchableOpacity>
);

// Styles for the CustomRadio component
const styles = StyleSheet.create({
  // Main container styles
  container: {
    flexDirection: 'row', // Horizontal layout
    alignItems: 'center', // Center items vertically
    marginVertical: 6, // Vertical margin
  },
  // Outer circle styles
  outer: {
    width: 22, // Fixed width
    height: 22, // Fixed height
    borderWidth: 2, // Border width
    borderColor: '#2563eb', // Blue border color
    borderRadius: 11, // Make it circular
    marginRight: 10, // Space between circle and label
    alignItems: 'center', // Center inner circle
    justifyContent: 'center', // Center inner circle
    backgroundColor: '#fff', // White background
  },
  // Styles for selected state
  selected: {
    borderColor: '#2563eb', // Blue border when selected
  },
  // Inner circle styles
  inner: {
    width: 10, // Inner circle width
    height: 10, // Inner circle height
    backgroundColor: '#2563eb', // Blue fill when selected
    borderRadius: 5, // Make it circular
  },
  // Label text styles
  label: {
    fontSize: fonts.font15, // Label font size
    color: '#111827', // Dark gray text color
    fontFamily: fontRegular,
  },
});

export default CustomRadio;
