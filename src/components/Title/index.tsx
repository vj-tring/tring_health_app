

import React from 'react';
import {Text, StyleSheet, TextStyle, StyleProp} from 'react-native';
import {fontSemiBold, fonts} from '../../constants/fonts';
import {useTheme} from '../../utils/themeProvider';

// Props interface for the TitleText component
type TitleTextProps = {
  text: string; // The text to display as the title
  style?: StyleProp<TextStyle>; // Optional custom styles for the title text
};

// TitleText component for displaying themed title text
const TitleText: React.FC<TitleTextProps> = ({text, style}) => {
  const {colors} = useTheme(); // Get theme-aware colors
  return (
    <Text style={[styles.title, {color: colors.text}, style]}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: fonts.font22, // Large font size
    fontFamily: fontSemiBold, // Semi-bold font
    textAlign: 'center', // Center align text
    paddingTop: 12, // Add padding at the top
  },
});

export default TitleText;
