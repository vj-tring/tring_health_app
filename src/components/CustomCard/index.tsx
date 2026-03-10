

import React from 'react';
import {View, StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {lightColors, sharedShadow} from '../../constants';
import {horizontalScale, verticalScale} from '../../constants/fonts';

// Define the props interface for the CustomCard component
type Props = {
  children: React.ReactNode; // Content to be displayed inside the card
  style?: StyleProp<ViewStyle>; // Optional custom styles for the card
  elevation?: number; // Optional elevation/shadow depth (default: 3)
};

// Main CustomCard component
const CustomCard: React.FC<Props> = ({children, style, elevation = 0}) => (
  // Card container with combined styles and elevation
  <View style={[styles.card, {elevation}, style]}>{children}</View>
);

// Styles for the CustomCard component
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff', // White background
    borderRadius: 12, // Rounded corners
    padding: horizontalScale(16), // Internal padding
    ...sharedShadow,
    marginVertical: verticalScale(8), // Vertical margin
    borderWidth: 1,
    borderColor: lightColors.border,
  },
});

export default CustomCard;
