

import React from 'react';
import {View, StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {lightColors, sharedShadow} from '../../constants';
import {horizontalScale, verticalScale} from '../../constants/fonts';
import { useTheme } from '../../utils/themeProvider';

// Define the props interface for the CustomCard component
type Props = {
  children: React.ReactNode; // Content to be displayed inside the card
  style?: StyleProp<ViewStyle>; // Optional custom styles for the card
  elevation?: number; // Optional elevation/shadow depth (default: 3)
};

// Main CustomCard component
const CustomCard: React.FC<Props> = ({children, style, elevation = 0}) =>
   {
  const {colors} = useTheme();
  // Card container with combined styles and elevation
  return <View style={[styles.card,{backgroundColor: colors.primary}, {elevation}, style]}>{children}</View>
};

// Styles for the CustomCard component
const styles = StyleSheet.create({
  card: {
    marginHorizontal: horizontalScale(16),
    borderRadius: 16, // Rounded corners
    padding: horizontalScale(16), // Internal padding
    ...sharedShadow,
    marginBottom: verticalScale(18), // Vertical margin
  },
});

export default CustomCard;
