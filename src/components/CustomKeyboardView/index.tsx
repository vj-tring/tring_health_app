

import React, { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header } from '..';
import CustomScreen from '../CustomScreen';

// Define the props interface for the CustomKeyboardAwareScreen component
type Props = {
  children: React.ReactNode; // Content to be displayed
  style?: ViewStyle; // Optional custom styles for the container
  contentContainerStyle?: ViewStyle; // Optional custom styles for the content container
  backgroundColor?: string; // Optional background color (default: white)
  header?: ReactNode;
  title?: string; // Optional
};

// Main CustomKeyboardAwareScreen component
const CustomKeyboardAwareScreen: React.FC<Props> = ({
  children,
  style,
  contentContainerStyle,
  backgroundColor,
  title = '', // Default
  header = false,
}) => (
  <CustomScreen style={style} backgroundColor={backgroundColor}>
    {/* Keyboard-aware scroll view for handling keyboard interactions */}
    {header && <Header title={title} />}
    <KeyboardAwareScrollView
      contentContainerStyle={[
        {flexGrow: 1}, // Default content container styles
        contentContainerStyle, // Custom content container styles
      ]}
      enableOnAndroid // Enable keyboard handling on Android
      extraScrollHeight={24} // Extra scroll height when keyboard is shown
      keyboardShouldPersistTaps="handled" // Handle taps while keyboard is visible
      showsVerticalScrollIndicator={false}>
      {/* Hide scroll indicator */}
      {children}
    </KeyboardAwareScrollView>
  </CustomScreen>
);

export default CustomKeyboardAwareScreen;
