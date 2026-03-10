import React from 'react';
import {View, StyleSheet, Dimensions, StyleProp, ViewStyle} from 'react-native';
import {useTheme} from '../../utils/themeProvider';

const screenWidth = Dimensions.get('window').width;

interface CustomSeparatorProps {
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

const CustomSeparator = ({backgroundColor, style}: CustomSeparatorProps) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.separator,
        {
          backgroundColor: backgroundColor ?? colors.primary,
          width: screenWidth,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 7,
    alignSelf: 'center',
    opacity: 0.3,
  },
});

export default CustomSeparator;
