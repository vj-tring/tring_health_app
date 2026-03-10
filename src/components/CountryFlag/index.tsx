import React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  View,
  StyleSheet,
} from 'react-native';
import {flagMap} from '../../constants/flagMap';

interface CountryFlagProps {
  isoCode: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
}

// Override unsupported or unofficial country codes
const flagOverrides: Record<string, string> = {
  UMI: 'US', // United States Minor Outlying Islands → US flag
  XK: 'XK', // Kosovo → uses custom svg usually
  EU: 'EU', // European Union → custom
  // Add more overrides as needed
};

// CDN fallback config
const FLAG_CDN_URL = 'https://flagcdn.com/w80/';
const FORMAT = '.png';

const CountryFlag: React.FC<CountryFlagProps> = ({
  isoCode,
  size = 24,
  style,
}) => {
  if (!isoCode || typeof isoCode !== 'string') {
    return null;
  }

  const normalizedCode =
    flagOverrides[isoCode.toUpperCase()] || isoCode.toUpperCase();
  const width = (size * 4) / 2.7;
  const containerStyle = [styles.container, {width, height: size}, style];

  const Flag = flagMap[normalizedCode];

  // If it's a React component (SVG) - wrap to avoid any stray text/overflow
  if (typeof Flag === 'function') {
    return (
      <View style={containerStyle}>
        <Flag width={width} height={size} />
      </View>
    );
  }

  // If it's an image asset (require returns number)
  if (typeof Flag === 'number') {
    return (
      <View style={containerStyle}>
        <Image
          source={Flag}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  }

  // CDN fallback - only use valid 2-letter codes
  const code = normalizedCode.length === 2 ? normalizedCode.toLowerCase() : 'us';
  return (
    <View style={containerStyle}>
      <Image
        source={{uri: `${FLAG_CDN_URL}${code}${FORMAT}`}}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CountryFlag;
