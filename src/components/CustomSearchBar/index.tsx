

import React, {useState} from 'react';
import {
  Text as RNText,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {
  fontRegular,
  fonts,
  horizontalScale,
  verticalScale,
} from '../../constants/fonts';
import {useTheme} from '../../utils/themeProvider';

// Props interface for the CustomSearchBar component
interface CustomSearchBarProps {
  value: string; // Search input value
  onChangeText: (text: string) => void; // Callback when text changes
  onSearch?: (text: string) => void; // Callback when search is triggered
  placeholder?: string; // Optional placeholder text
  containerStyle?: StyleProp<ViewStyle>; // Optional custom styles for the container
  inputStyle?: StyleProp<TextStyle>; // Optional custom styles for the input
  showClearButton?: boolean; // If true, show clear button when input has value
  showSearchButton?: boolean; // If true, show search button
  autoFocus?: boolean; // If true, input will be focused on mount
  editable?: boolean; // If false, input is disabled
  onSubmitEditing?: () => void; // Callback when user submits the search
  onClear?: () => void; // Callback when user clears the search
}

// Main CustomSearchBar component
const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  value,
  onChangeText,
  onSearch,
  placeholder = 'Search...',
  containerStyle,
  inputStyle,
  showClearButton = true,
  showSearchButton = true,
  autoFocus = false,
  editable = true,
  onSubmitEditing,
  onClear,
}) => {
  const {colors} = useTheme();

  // Clear the search text
  const clearSearch = () => {
    onChangeText('');
    if (onClear) {
      onClear();
    }
  };

  // Handle search action
  const handleSearch = () => {
    if (onSearch && value.trim()) {
      onSearch(value.trim());
    }
    if (onSubmitEditing) {
      onSubmitEditing();
    }
  };

  return (
    // Container for the search bar
    <View
      style={[
        styles.container,
        {
          backgroundColor: editable ? colors.white : colors.gray,
          borderColor: colors.border,
        },
        containerStyle,
      ]}>
      {/* Search icon on the left (Unicode so it always shows) */}
      <RNText style={[styles.searchIcon, { color: colors.gray }]}>⌕</RNText>

      {/* Main TextInput field */}
      <TextInput
        style={[styles.input, {color: colors.text}, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        underlineColorAndroid="transparent"
        editable={editable}
        autoFocus={autoFocus}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />

      {/* Clear button */}
      {showClearButton && value.length > 0 && (
        <TouchableOpacity onPress={clearSearch} style={styles.iconContainer}>
          <RNText style={[styles.iconText, { color: colors.gray }]}>✕</RNText>
        </TouchableOpacity>
      )}

      {/* Search button */}
      {showSearchButton && value.length > 0 && (
        <TouchableOpacity onPress={handleSearch} style={styles.iconContainer}>
          <RNText style={[styles.iconText, { color: colors.primary }]}>→</RNText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: horizontalScale(12),
    height: verticalScale(47),
    marginVertical: verticalScale(5),
  },
  searchIcon: {
    fontSize: 20,
    marginRight: horizontalScale(8),
  },
  input: {
    flex: 1,
    fontSize: fonts.font14,
    fontFamily: fontRegular,
    paddingVertical: verticalScale(0),
  },
  iconContainer: {
    marginLeft: horizontalScale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
  },
});

export default CustomSearchBar;
