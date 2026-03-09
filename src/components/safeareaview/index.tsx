import React from 'react';
import {SafeAreaView, StyleSheet, ViewStyle} from 'react-native';

import {useTheme} from '../../theme';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export const ScreenContainer: React.FC<Props> = ({children, style}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background,
    },
  });
  return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
};
