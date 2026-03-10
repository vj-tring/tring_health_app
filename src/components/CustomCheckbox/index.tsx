

import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fonts, fontRegular} from '../../constants/fonts';
import {lightColors} from '../../constants';

// Define the props interface for the CustomCheckbox component
type Props = {
  checked: boolean; // Current checked state
  onChange: (checked: boolean) => void; // Callback when checkbox state changes
  label?: string; // Optional label text
  style?: ViewStyle; // Optional custom styles for container
  labelStyle?: TextStyle; // Optional custom styles for label
};

// Main CustomCheckbox component
const CustomCheckbox: React.FC<Props> = ({
  checked,
  onChange,
  label,
  style,
  labelStyle,
}) => (
  // Touchable container for the checkbox
  <TouchableOpacity
    style={[styles.container, style]}
    onPress={() => onChange(!checked)} // Toggle checked state on press
    activeOpacity={0.7} // Slight opacity change on press
    accessibilityRole="checkbox" // Accessibility role for screen readers
    accessibilityState={{checked}}>
    {/* Checkbox box container */}
    <View style={[styles.box, checked && styles.checked]}>
      {/* Inner checkmark - only shown when checked */}
      {checked && (
        <Ionicons name="checkmark" size={14} color="#fff" style={styles.tickIcon} />
      )}
    </View>
    {/* Optional label text */}
    {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
  </TouchableOpacity>
);

// Styles for the CustomCheckbox component
const styles = StyleSheet.create({
  // Main container styles
  container: {
    flexDirection: 'row', // Horizontal layout
    alignItems: 'center', // Center items vertically
    marginVertical: 6, // Vertical margin
  },
  // Checkbox box styles
  box: {
    width: 22, // Fixed width
    height: 22, // Fixed height
    borderWidth: 2, // Border width
    borderColor: lightColors.primary, // Blue border color
    borderRadius: 4, // Slightly rounded corners
    marginRight: 10, // Space between box and label
    alignItems: 'center', // Center inner checkmark
    justifyContent: 'center', // Center inner checkmark
    backgroundColor: '#fff', // White background
  },
  // Styles for checked state
  checked: {
    backgroundColor: lightColors.primary, // Blue background when checked
  },
  // Inner checkmark styles
  inner: {
    width: 10, // Checkmark width
    height: 10, // Checkmark height
    backgroundColor: '#fff', // White checkmark
    borderRadius: 2, // Slightly rounded checkmark
  },
  // Tick icon style for checked state
  tickIcon: {
    width: 14,
    height: 14,
  },
  // Label text styles
  label: {
    fontSize: fonts.font12, // Label font size
    fontFamily: fontRegular,
    color: '#111827', // Dark gray text color
  },
});

export default CustomCheckbox;
