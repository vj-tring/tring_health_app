

import React from 'react';
import {Platform, StatusBar, StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../utils/themeProvider';

// Props interface for the SafeAreaContainer component
type Props = {
  children: React.ReactNode; // Content to render inside the safe area
  style?: ViewStyle; // Optional custom styles for the container
  backgroundColor?: string; // Optional background color override
  barStyle?: 'default' | 'light-content' | 'dark-content'; // Optional status bar style
};

// SafeAreaContainer provides a themed SafeAreaView with status bar handling
const SafeAreaContainer: React.FC<Props> = ({
  children,
  style,
  backgroundColor,
  barStyle,
}) => {
  const insets = useSafeAreaInsets();
  // Get theme colors and default bar style from context
  const {colors, barStyle: themeBarStyle} = useTheme(); // <-- get from theme context
  // Determine the effective background color (prop or theme default)
  const effectiveBackgroundColor = backgroundColor ?? colors.background;
  // Determine the effective status bar style (prop, theme, or fallback)
  const effectiveBarStyle = barStyle ?? themeBarStyle ?? 'dark-content';

  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={[
        styles.safe,
        {backgroundColor: effectiveBackgroundColor, paddingTop: insets.top},
        style,
      ]}>
      {/* StatusBar configuration for consistent appearance */}
      <StatusBar
        barStyle={effectiveBarStyle}
        backgroundColor={effectiveBackgroundColor}
        translucent={Platform.OS === 'android'}
      />
      {/* Render children inside the safe area */}
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1, // Take up the full available space
  },
});

export default SafeAreaContainer;
