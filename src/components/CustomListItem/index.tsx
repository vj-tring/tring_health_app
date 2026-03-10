

// CustomListItem component for displaying list items with optional icons and subtitle
import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {fonts, fontBold, fontRegular} from '../../constants/fonts';

// Props interface defining the component's customizable properties
type Props = {
  title: string; // Main text to display
  subtitle?: string; // Optional secondary text
  leftIcon?: React.ReactNode; // Optional icon to display on the left
  rightIcon?: React.ReactNode; // Optional icon to display on the right
  onPress?: () => void; // Optional callback function when item is pressed
  style?: ViewStyle; // Optional custom styles for the container
  titleStyle?: TextStyle; // Optional custom styles for the title text
  subtitleStyle?: TextStyle; // Optional custom styles for the subtitle text
};

const CustomListItem: React.FC<Props> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onPress,
  style,
  titleStyle,
  subtitleStyle,
}) => (
  <TouchableOpacity
    style={[styles.container, style]}
    onPress={onPress}
    disabled={!onPress}>
    {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
    <View style={styles.textContainer}>
      <Text style={[styles.title, titleStyle]} numberOfLines={1}>
        {title}
      </Text>
      {subtitle && (
        <Text style={[styles.subtitle, subtitleStyle]} numberOfLines={2}>
          {subtitle}
        </Text>
      )}
    </View>
    {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 1},
  },
  leftIcon: {marginRight: 12},
  rightIcon: {marginLeft: 12},
  textContainer: {flex: 1, minWidth: 0},
  title: {fontSize: fonts.font16, color: '#111827', fontFamily: fontBold},
  subtitle: {
    fontSize: fonts.font14,
    color: '#6b7280',
    marginTop: 2,
    fontFamily: fontRegular,
  },
});

export default CustomListItem;
