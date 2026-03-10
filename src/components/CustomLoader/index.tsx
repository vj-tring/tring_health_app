

import React from 'react';
import {ActivityIndicator, View, StyleSheet, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';

// Define the props interface for the CustomLoader component
type Props = {
  size?: 'small' | 'large'; // Optional size of the loader (default: 'large')
  color?: string; // Optional color of the loader (default: '#2563eb')
  style?: ViewStyle; // Optional custom styles for the container
};

// Main CustomLoader component
const CustomLoader: React.FC<Props> = ({
  size = 'large', // Default to large size
  color, // Default to blue color
  style, // Optional custom styles
}) => (
  // Container View with centered loader
  <View style={[styles.container, style]}>
    {/* Custom GIF loader */}
    <FastImage
      source={{
        uri: 'https://tenor.com/view/loading-gif-gif-14552965973889090211',
      }}
      style={{
        width: size === 'large' ? 64 : 32,
        height: size === 'large' ? 64 : 32,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  </View>
);

// Styles for the CustomLoader component
const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    padding: 12, // Add padding around the loader
  },
});

// Loader for button loading states with primary color
export const ButtonLoader: React.FC<{
  size?: 'small' | 'large';
  style?: ViewStyle;
  color?:string
}> = ({size = 'small', style,color="#F37335"}) => (
  <View style={[styles.container, style]}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

export default CustomLoader;
