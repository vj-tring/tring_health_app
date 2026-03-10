

import React, {useState, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StyleProp,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../utils/themeProvider';
import {createCommonStyles} from '../../constants/commonStyles';
import {
  fontMedium,
  fontRegular,
  fonts,
  fontSemiBold,
  horizontalScale,
  verticalScale,
} from '../../constants/fonts';
import CustomModal from '../CustomModal';
import SkeletonLoader from '../SkeletonLoader';
import {SafeAreaView} from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import CustomSearchBar from '../CustomSearchBar';
import CustomEmptyState from '../CustomEmptyState';
import CustomErrorState from '../CustomErrorState';

// Props interface for the CustomDropdown component
interface CustomDropdownProps {
  label?: string; // Optional label text
  value: string; // Selected value
  onSelect: (value: string) => void; // Callback when option is selected
  options: Array<{
    value: string;
    label: string;
    assetName?: string;
    assetCode?: string;
  }>; // Array of options
  placeholder?: string; // Optional placeholder text
  containerStyle?: StyleProp<ViewStyle>; // Optional custom styles for the container
  inputStyle?: StyleProp<ViewStyle>; // Optional custom styles for the input
  labelStyle?: StyleProp<TextStyle>; // Optional custom styles for the label
  editable?: boolean; // If false, dropdown is disabled
  errorMessage?: string; // Optional error message to display
  required?: boolean; // If true, shows asterisk
  customIcon?: any; // Custom icon to display instead of default dropdown arrow
  onCustomPress?: () => void; // Custom press handler instead of opening modal
  customContent?: React.ReactNode; // Custom content to display in the input
  isLoading?: boolean; // Loading state for the dropdown
  isError?: boolean; // Error state for the dropdown
  error?: string; // Error message for the dropdown
  icon?: any; // Icon to display in the empty state
  onRetry?: () => void; // Retry function for error state
  isSearch?: boolean; // If true, shows search bar
  height?: any; // Height of the dropdown
  modal?: boolean; // Modal visible state
  customIconStyle?: string; // Custom icon style
  onLoadMore?: () => void; // Callback for load more (pagination)
  hasMoreData?: boolean; // Whether there's more data to load
  isLoadingMore?: boolean; // Loading state for pagination
  onSearchChange?: (searchText: string) => void; // Callback when search text changes
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  value,
  onSelect,
  options,
  placeholder = 'Select...',
  containerStyle,
  inputStyle,
  labelStyle,
  editable = true,
  errorMessage,
  required = false,
  customIcon,
  onCustomPress,
  isLoading = false,
  isError = false,
  error,
  onRetry,
  isSearch = true,
  icon,
  height,
  modal = true,
  customIconStyle,
  onLoadMore,
  hasMoreData = false,
  isLoadingMore = false,
  onSearchChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const {colors} = useTheme();
  const commonStyles = createCommonStyles(colors);

  // Find the currently selected option or use the value directly if not in options
  const selectedOption = options.find(option => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : value;

  // Filter options based on search text
  const filteredOptions = useMemo(() => {
    if (!searchText.trim()) {
      return options;
    }
    const searchLower = searchText.toLowerCase();
    return options.filter(option => {
      // Search in the label (which includes both fault name and code)
      if (option.label.toLowerCase().includes(searchLower)) {
        return true;
      }
      // For fault names, also search in the value (fault code)
      if (option.value.toLowerCase().includes(searchLower)) {
        return true;
      }
      // For assets, also search in assetName and assetCode
      if (
        option.assetName &&
        option.assetName.toLowerCase().includes(searchLower)
      ) {
        return true;
      }
      if (
        option.assetCode &&
        option.assetCode.toLowerCase().includes(searchLower)
      ) {
        return true;
      }
      return false;
    });
  }, [options, searchText]);

  // Handle option selection
  const handleOptionSelect = (selectedValue: string) => {
    onSelect(selectedValue);
    setModalVisible(false);
    setSearchText(''); // Clear search when option is selected
  };

  // Handle search text change
  const handleSearchChange = (text: string) => {
    setSearchText(text);
    // Call external search callback if provided
    if (onSearchChange) {
      onSearchChange(text);
    }
  };

  // Handle end reached with memoization
  const handleEndReached = useCallback(() => {
    if (hasMoreData && !isLoadingMore && onLoadMore && !searchText.trim()) {
      onLoadMore();
    }
  }, [hasMoreData, isLoadingMore, onLoadMore, searchText]);

  // Render modal item
  const renderModalItem = (item: {
    value: string;
    label: string;
    assetName?: string;
    assetCode?: string;
  }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => handleOptionSelect(item.value)}>
      {label === 'Asset' ? (
        <View style={styles.assetItemContainer}>
          <View style={styles.assetIconContainer}>
            <Ionicons name="folder-open-outline" size={24} color={colors.gray} />
          </View>
          <View style={styles.assetTextContainer}>
            <Text
              style={[
                commonStyles.typography.valueMedium,
                {color: colors.text, marginTop: 2},
              ]}>
              {item.assetName || ''}
            </Text>
            <Text
              style={[
                commonStyles.typography.subtitle,
                {color: colors.gray, marginBottom: 0},
              ]}>
              {item.assetCode || ''}
            </Text>
          </View>
        </View>
      ) : (
        <Text
          style={[
            commonStyles.typography.bodyTextMedium,
            {color: colors.text},
          ]}>
          {item.label}
        </Text>
      )}
    </TouchableOpacity>
  );
  const listSkeleton = ({count = 6}) => (
    <SkeletonPlaceholder
      backgroundColor={colors.backgroundGray}
      highlightColor={colors.white}
      speed={1200}>
      {Array.from({length: count}).map((_, idx) => (
        <SkeletonPlaceholder.Item
          key={idx}
          width="100%"
          height={50}
          borderRadius={4}
          marginBottom={idx < count - 1 ? verticalScale(12) : 0}
        />
      ))}
    </SkeletonPlaceholder>
  );
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Render label if provided */}
      {label && (
        <Text
          style={[
            commonStyles.typography.title,
            editable ? {color: colors.text} : {color: colors.text},
            labelStyle,
          ]}>
          {label}
          {required && <Text style={{color: colors.error}}> *</Text>}
        </Text>
      )}

      {/* Dropdown input container */}
      <TouchableOpacity
        style={[
          styles.inputContainer,
          editable
            ? {backgroundColor: colors.white}
            : {backgroundColor: colors.backgroundGray},
          {
            borderColor: errorMessage ? colors.error : colors.border,
          },
          inputStyle,
        ]}
        onPress={() => {
          if (editable) {
            if (onCustomPress) {
              onCustomPress();
            }
            if (modal) {
              setModalVisible(true);
            }
          }
        }}
        disabled={!editable}
        activeOpacity={0.7}>
        {/* Display selected option or placeholder */}
        <Text
          style={[
            styles.input,
            editable ? {color: colors.text} : {color: colors.text},
            !displayValue && {color: colors.gray},
          ]}>
          {displayValue || placeholder}
        </Text>

        {/* Dropdown arrow icon or custom icon */}
        {customIcon ? (
          <FastImage
            source={customIcon}
            style={styles.dropdownIcon}
            resizeMode="contain"
            tintColor={customIconStyle}
          />
        ) : (
          <Ionicons
            name="chevron-down"
            size={22}
            color={customIconStyle || colors.text}
          />
        )}
      </TouchableOpacity>

      {/* Error message display */}
      {errorMessage && (
        <Text style={[styles.errorText, {color: colors.error}]}>
          {errorMessage}
        </Text>
      )}

      {/* Selection Modal */}
      <CustomModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        backgroundColor="rgba(0,0,0,0.5)"
        modalHeight={height ? height : Platform.OS === 'ios' ? '95%' : '90%'}>
        <SafeAreaView
          style={[styles.modalContent, {height: height ? height : '100%'}]}>
          <View style={styles.modalHeader}>
            <Text
              style={[
                commonStyles.typography.titleLarge,
                {color: colors.text, textAlign: 'center', flex: 1},
              ]}>
              {label || 'Select Option'}
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              hitSlop={{top: 15, bottom: 15, left: 25, right: 25}}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          {isSearch && (
            <View style={styles.searchContainer}>
              <CustomSearchBar
                placeholder={
                  label === 'Fault Name'
                    ? 'Search by Fault Name or Code'
                    : label === 'Asset'
                    ? 'Search by Asset Name or Code'
                    : `Search by ${label || 'options'} Name or Code`
                }
                value={searchText}
                onChangeText={handleSearchChange}
                onClear={() => setSearchText('')}
              />
            </View>
          )}
          {isLoading ? (
            <View style={styles.modalLoadingContainer}>
              {listSkeleton({count: 6})}
            </View>
          ) : isError ? (
            <View style={styles.modalErrorContainer}>
              <CustomErrorState error={error} onRetry={onRetry} />
            </View>
          ) : filteredOptions.length === 0 ? (
            <View style={styles.modalEmptyContainer}>
              <CustomEmptyState
                title={
                  searchText
                    ? `No search results found for "${searchText}"`
                    : `No ${label || 'Options'} Available`
                }
                // description={
                //   searchText
                //     ? `No ${label || 'options'} found for "${searchText}"`
                //     : `No ${label || 'options'} available at the moment`
                // }
                isSearchEmpty={!!searchText}
                searchText={searchText}
              />
            </View>
          ) : (
            <>
              <FlatList
                data={filteredOptions}
                keyExtractor={(item, index) => `${item.value}-${index}`}
                renderItem={({item}) => renderModalItem(item)}
                showsVerticalScrollIndicator={false}
                style={{flex: 1}}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.3}
                ListFooterComponent={
                  isLoadingMore ? (
                    <View
                      style={{
                        paddingVertical: 16,
                        width: '100%',
                        backgroundColor: colors.background || '#fff',
                      }}>
                      {listSkeleton({count: 3})}
                    </View>
                  ) : null
                }
                removeClippedSubviews={false}
              />
            </>
          )}
        </SafeAreaView>
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: verticalScale(10),
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
  },
  input: {
    flex: 1,
    fontSize: fonts.font14,
    fontFamily: fontRegular,
    paddingVertical: verticalScale(0),
  },
  dropdownIcon: {
    width: 20,
    height: 20,
    marginLeft: horizontalScale(8),
  },
  errorText: {
    fontSize: fonts.font12,
    marginTop: verticalScale(5),
    fontFamily: fontRegular,
  },
  modalContent: {
    backgroundColor: '#fff',
    minHeight: '40%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },

  closeIcon: {
    width: 16,
    height: 16,
  },
  modalItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  modalLoadingContainer: {
    paddingVertical: 16,
  },
  searchContainer: {
    paddingTop: 2,
  },
  modalErrorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(18),
  },
  modalEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(18),
  },
  assetItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetIconContainer: {
    width: 45,
    height: 45,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: horizontalScale(12),
  },
  assetIcon: {
    width: 24,
    height: 24,
  },
  assetTextContainer: {
    flex: 1,
  },
});

export default CustomDropdown;
