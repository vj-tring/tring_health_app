

import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fontMedium, fontRegular, fonts } from '../../constants/fonts';
import { strings } from '../../constants/strings';
import CustomButton from '../CustomButton';

/**
 * Props interface for the CustomEmptyState component
 */
type Props = {
  /** Optional title text (default: 'Nothing Here') */
  title?: string;
  /** Optional description text */
  description?: string;
  /** Optional custom icon component (ReactNode) */
  icon?: React.ReactNode;
  /** Optional icon source for FastImage (from Images constant) */
  iconSource?: any;
  /** Optional icon size in pixels (default: 60) */
  iconSize?: number;
  /** Optional flag for search empty state - automatically uses no_search icon */
  isSearchEmpty?: boolean;
  /** Optional search text for search empty state - used with isSearchEmpty */
  searchText?: string;
  /** Optional custom styles for the container */
  style?: ViewStyle;
  /** Optional custom styles for the title */
  titleStyle?: TextStyle;
  /** Optional custom styles for the description */
  descriptionStyle?: TextStyle;
  /** Optional retry button text */
  retryText?: string;
  /** Optional retry button onPress handler */
  onRetry?: () => void;
  /** Optional custom styles for the retry button */
  retryButtonStyle?: ViewStyle;
  /** Optional custom styles for the retry button text */
  retryTextStyle?: TextStyle;
  /** Optional children component */
  children?: React.ReactNode;
};

/**
 * CustomEmptyState Component
 *
 * A flexible empty state component that can handle various scenarios:
 * - Default empty state with no_data_error icon (for all non-search scenarios)
 * - Search empty state with no_search icon (unchanged)
 * - Custom icon states with specific icons
 * - Server error states
 *
 * Icon Priority System:
 * 1. Search Empty (isSearchEmpty prop) - Always uses no_search icon
 * 2. Custom Icon (icon prop) - Custom ReactNode
 * 3. Icon Source (iconSource prop) - Direct Images usage
 * 4. Default - Uses no_data_error icon for all non-search scenarios
 *
 * @example
 * // Basic usage with default no_data_error icon
 * <CustomEmptyState
 *   title="No Data Available"
 *   description="No data found"
 * />
 *
 * @example
 * // Search empty state - automatically uses no_search icon
 * <CustomEmptyState
 *   isSearchEmpty={true}
 *   searchText="John Doe"
 * />
 *
 * @example
 * // Custom icon (ReactNode)
 * <CustomEmptyState
 *   icon={<Ionicons name="people-outline" size={50} />}
 *   title="No Individuals Available"
 *   description="Contact administrator to add users"
 * />
 *
 * @example
 * // Server error state
 * <CustomEmptyState
 *   icon={<Ionicons name="server-outline" size={50} />}
 *   title="Server Error"
 *   description="Unable to load data"
 * />
 */
const CustomEmptyState: React.FC<Props> = ({
  title, // Default title text
  description,
  icon,
  iconSource,
  iconSize = 50,
  isSearchEmpty = false,
  searchText = '',
  style,
  titleStyle,
  descriptionStyle,
  retryText = strings.emptyState.retry,
  onRetry,
  retryButtonStyle,
  retryTextStyle,
  children,
}) => {
  // Determine the icon to display
  const renderIcon = () => {
    // For search empty state, always use search icon
    if (isSearchEmpty) {
      return (
        <Ionicons
          name="search"
          size={iconSize + 40}
          color="#BFBFBF"
          style={{marginBottom: 12}}
        />
      );
    }

    // For all other cases, prioritize custom icon, then iconSource, then default to no_data_error
    if (icon) {
      return icon;
    }

    if (iconSource) {
      return (
        <FastImage
          source={iconSource}
          style={{ width: iconSize, height: iconSize, marginBottom: 12 }}
          resizeMode={FastImage.resizeMode.contain}
        />
      );
    }

    // Default to document outline for all non-search empty states
    return (
      <Ionicons
        name="document-outline"
        size={iconSize}
        color="#BFBFBF"
        style={{ marginBottom: 12 }}
      />
    );
  };

  const renderTitle = () => {
    if (isSearchEmpty && searchText) {
      return `${strings.emptyState.no_data_found_for} '${searchText}'.`;
    }
    return title || strings.emptyState.no_data_available;
  };

  // Determine the description to display
  const renderDescription = () => {
    return description;
  };

  return (
    // Main container with centered content
    <View style={[styles.container, style]}>
      {/* Icon */}
      {renderIcon()}
      {/* Title text */}
      {title && (
        <Text
          style={[
            styles.title,
            titleStyle,
            isSearchEmpty && searchText
              ? { color: '#000000' }
              : { color: '#F37335' },
          ]}>
          {renderTitle()}
        </Text>
      )}
      {/* Optional description text */}
      {renderDescription() && (
        <Text style={[styles.description, descriptionStyle]}>
          {renderDescription()}
        </Text>
      )}
      {/* Optional retry button */}
      {onRetry && (
        <CustomButton
          title={retryText}
          onPress={onRetry}
          buttonStyle={[styles.retryButton, retryButtonStyle]}
          textStyle={[styles.retryText, retryTextStyle]}
        />
      )}
      {children}
    </View>
  );
};

// Styles for the CustomEmptyState component
const styles = StyleSheet.create({
  // Main container styles
  container: {
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    flex: 1, // Take up all available space
    paddingVertical: 32, // Add padding around content
    paddingHorizontal: 16, // Horizontal padding
  },
  // Title text styles
  title: {
    fontSize: fonts.font16, // Large font size
    fontFamily: fontMedium, // Bold text
    color: '#000000', // Dark gray color
    marginTop: 12, // Space after icon
    textAlign: 'center', // Center align text
  },
  // Description text styles
  description: {
    fontSize: fonts.font15, // Medium font size
    fontFamily: fontRegular,
    color: '#5A5959', // Gray color
    marginTop: 10, // Space after title
    textAlign: 'center', // Center align text
  },
  // Retry button styles
  retryButton: {
    marginTop: 16, // Space after description
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'transparent', // Transparent background
    borderWidth: 2,
    borderColor: '#FF3B30', // #2D33DEelblue border color
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120, // Minimum width for button
  },
  // Retry button text styles
  retryText: {
    fontSize: fonts.font14,
    fontFamily: fontMedium,
    color: '#FF3B30', // Red text color
    textAlign: 'center',
  },
});

export default CustomEmptyState;
