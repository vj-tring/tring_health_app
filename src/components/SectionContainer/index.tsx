import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

interface Props {
  children: React.ReactNode;
  borderColor?: string;
  style?: ViewStyle;
}

const SectionContainer: React.FC<Props> = ({children, borderColor, style}) => (
  <View
    style={[
      styles.container,
      {borderTopColor: borderColor, borderBottomColor: borderColor},
      style,
    ]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    // borderTopWidth: 5,
    // borderBottomWidth: 3,
    // marginVertical: 12,
    marginTop: 5,
    paddingHorizontal: 16,
    // Shadow for iOS
  },
});

export default SectionContainer;
