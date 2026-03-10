

// Import React and necessary React Native components
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
// Import font and scaling utilities
import {
  fonts,
  fontSemiBold,
  horizontalScale,
  verticalScale,
} from '../../constants/fonts';
import {useTheme} from '../../utils/themeProvider';

// Define the props interface for the CustomButton component
interface CustomButtonProps {
  title: string; // Text to display on the button
  onPress: () => void; // Function to call when button is pressed
  buttonStyle?: StyleProp<ViewStyle>; // Optional custom styles for the button container
  textStyle?: StyleProp<TextStyle>; // Optional custom styles for the button text
  disabled?: boolean; // Optional flag to disable the button
}

// Define the CustomButton component with TypeScript
const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  disabled = false, // Default disabled state to false
}) => {
  const {colors} = useTheme();
  return (
    // TouchableOpacity provides touch feedback and handles press events
    <TouchableOpacity
      // Combine default styles with custom styles and disabled state
      style={[
        styles.button,
        {backgroundColor: colors.primary},
        disabled && styles.disabledButton,
        buttonStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.7} // Set opacity when button is pressed
      disabled={disabled}>
      {/* Button text with combined styles */}
      <Text style={[styles.buttonText, {color: colors.white}, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// Define the component styles
const styles = StyleSheet.create({
  button: {
    paddingVertical: verticalScale(12), // Responsive vertical padding
    paddingHorizontal: horizontalScale(16), // Responsive horizontal padding
    borderRadius: 14, // Rounded corners
    alignItems: 'center', // Center content horizontally
  },
  buttonText: {
    fontSize: fonts.font14, // Font size from constants
    fontFamily: fontSemiBold, // Semi-bold font weight
  },
  disabledButton: {
    opacity: 0.5, // Set
  },
});

export default CustomButton;
