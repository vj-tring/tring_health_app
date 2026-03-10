

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fontSemiBold, fontRegular} from '../../constants/fonts';
import {useTheme} from '../../utils/themeProvider';

// Props interface for the ToastView component
type ToastViewProps = {
  message: string; // Main toast message
  subMessage?: string; // Optional secondary message
};

// ToastView component for displaying toast notifications with optional logo and sub-message
const ToastView: React.FC<ToastViewProps> = ({message, subMessage}) => {
  const {colors} = useTheme();

  return (
    // Toast container with themed background
    <View style={[styles.container, {backgroundColor: colors.card}]}>
      <Ionicons name="apps" size={28} color={colors.primary} style={styles.logoImage} />

      {/* Message container */}
      <View style={{flex: 1}}>
        {/* Main message text */}
        <Text style={[styles.message, {color: colors.text}]}>{message}</Text>
        {/* Render sub-message if provided */}
        {subMessage && (
          <Text style={[styles.subMessage, {color: colors.text}]}>
            {subMessage}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  message: {
    fontSize: 14,
    fontFamily: fontSemiBold,
  },
  subMessage: {
    fontSize: 12,
    fontFamily: fontRegular,
    marginTop: 2,
  },
  logoImage: {
    marginRight: 18,
  },
});

export default ToastView;
