

import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {useTheme} from '../../utils/themeProvider';
import {horizontalScale} from '../../constants';

// Props interface for the AppHeader component
type Props = {
  separator?: boolean;
  margin?: boolean;
  isBack?: boolean; // Show back button if true
  title?: string; // Header title text
  onPressBack?: any; // Optional custom back button handler
  Edit?: boolean; // Optional edit button label or element
  style?: any; // Optional style for the header
  color?: Boolean;
  onPressEdit?: () => void; // Optional edit button handler
};

// Memoized AppHeader component to prevent unnecessary re-renders
const AppHeader = React.memo(
  ({
    isBack = true,
    title,
    margin = false,
    onPressBack,
    Edit = false,
    onPressEdit,
    style,
    color,
    separator = true,
  }: Props) => {
    const navigation = useNavigation(); // Navigation object from React Navigation
    const {colors} = useTheme();

    // Handle back button press (custom or default navigation)
    const backPress = () => {
      onPressBack ? onPressBack() : navigation.goBack();
    };

    return (
      // Header container with themed background
      <View
        style={[
          styles.container,
          separator && {
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          },
          !margin && {marginHorizontal: -16},
          {backgroundColor: color ? 'transparent' : colors.background},
          style,
        ]}>
        <View
          style={[
            styles.headerView,
            (margin || separator) && {marginHorizontal: 16},
          ]}>
          {/* Left: Back button or placeholder */}
          {isBack ? (
            <TouchableOpacity
              style={styles.sideContainer}
              onPress={backPress}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 30}}>
              <Ionicons name="arrow-back" size={24} color={colors.black} />
            </TouchableOpacity>
          ) : (
            <View
              style={[styles.sideContainer, {width: horizontalScale(16)}]}
            />
          )}

          {/* Center: Title */}
          <View style={styles.titleContainer}>
            {title && (
              <Text
                numberOfLines={1}
                style={[styles.title, {color: colors.black}]}>
                {title}
              </Text>
            )}
          </View>

          {/* Right: Edit button or placeholder */}
          {Edit ? (
            <TouchableOpacity
              style={styles.sideContainer}
              onPress={onPressEdit}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 30}}>
              <Ionicons name="close" size={24} color={colors.black} />
            </TouchableOpacity>
          ) : (
            <View
              style={[styles.sideContainer, {width: horizontalScale(16)}]}
            />
          )}
        </View>
      </View>
    );
  },
);

export default AppHeader;
