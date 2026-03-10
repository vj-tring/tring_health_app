

import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import SafeAreaContainer from '../SafeAreaContainer';
import {useTheme} from '../../utils/themeProvider'; // adjust the path if needed

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  noPadding?: boolean;
};

const CustomScreen: React.FC<Props> = ({
  children,
  style,
  backgroundColor,
  noPadding,
}) => {
  const {colors} = useTheme();
  // Use prop if provided, otherwise use theme color
  const effectiveBackgroundColor =
    backgroundColor ?? colors.background ?? '#fff';

  return (
    <SafeAreaContainer
      backgroundColor={effectiveBackgroundColor}
      style={styles.safeArea}>
      <View
        style={[styles.container, noPadding && {paddingHorizontal: 0}, style]}>
        {children}
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default CustomScreen;
