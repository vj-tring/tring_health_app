

import React from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {fonts, fontSemiBold} from '../../constants/fonts';

// Props interface for the CustomAvatar component
type Props = {
  uri?: string; // URL of the avatar image
  name?: string; // Name to generate initials from if no image is provided
  size?: number; // Size of the avatar in pixels (defaults to 48)
  style?: ViewStyle; // Additional styles for the container
  imageStyle?: ImageStyle; // Additional styles for the image
};

// Helper function to generate initials from a name
// Takes first letter of each word, up to 2 letters, and converts to uppercase
const getInitials = (name?: string) =>
  name
    ? name
        .split(' ')
        .map(w => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '';

// CustomAvatar component that displays either an image or initials
const CustomAvatar: React.FC<Props> = ({
  uri,
  name,
  size = 48,
  style,
  imageStyle,
}) => (
  <View
    style={[
      styles.container,
      {width: size, height: size, borderRadius: size / 2}, // Make it circular
      style,
    ]}>
    {uri ? (
      // If URI is provided, display the image
      <Image
        source={{uri}}
        style={[
          styles.image,
          {width: size, height: size, borderRadius: size / 2},
          imageStyle,
        ]}
      />
    ) : (
      // If no URI, display initials in a colored background
      <View
        style={[
          styles.fallback,
          {width: size, height: size, borderRadius: size / 2},
        ]}>
        <Text style={styles.initials}>{getInitials(name)}</Text>
      </View>
    )}
  </View>
);

// Styles for the component
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#D9D9D9', // Light gray background
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {resizeMode: 'cover'}, // Ensure image covers the container
  fallback: {
    backgroundColor: '#D9D9D9', // Slightly darker gray for fallback
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  initials: {
    color: '#1e293b',
    fontFamily: fontSemiBold,
    fontSize: fonts.font14,
    lineHeight: 24,
  }, // Dark text for initials
});

export default CustomAvatar;
