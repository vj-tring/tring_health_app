

import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  fontRegular,
  fontSemiBold,
  fonts,
  horizontalScale,
  verticalScale,
} from '../../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../utils/themeProvider';
import CustomModal from '../CustomModal';
import CustomRadio from '../CustomRadio';
import CustomButton from '../CustomButton';
import {strings} from '../../constants/strings';

// Filter option interface
export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

// Props interface for the CustomFilter component
interface CustomFilterProps {
  options: FilterOption[]; // Array of filter options
  selectedValue?: string; // Currently selected value
  onFilterChange: (value: string) => void; // Callback when filter changes
  title?: string; // Modal title (default: "Filter")
  placeholder?: string; // Placeholder text when no filter is selected
  containerStyle?: StyleProp<ViewStyle>; // Custom container styles
  showSelectedValue?: boolean; // Show selected value as text (default: true)
  iconSize?: number; // Size of the filter icon (default: 24)
}

// Main CustomFilter component
const CustomFilter: React.FC<CustomFilterProps> = ({
  options,
  selectedValue,
  onFilterChange,
  title = strings.filter.title,
  placeholder = strings.filter.placeholder,
  containerStyle,
  showSelectedValue = true,
  iconSize = 24,
}) => {
  // State to control modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Debug: Log non-string labels when modal opens
  useEffect(() => {
    if (isModalVisible) {
      options.forEach(opt => {
        if (typeof opt.label !== 'string') {
          console.warn('CustomFilter option label is not a string:', opt);
        }
      });
    }
  }, [isModalVisible, options]);

  const {colors} = useTheme();

  // Get selected option label
  const selectedOption = options.find(option => option.value === selectedValue);

  // Sanitize options: ensure all labels are strings
  const safeOptions = options.map(opt => ({
    ...opt,
    label:
      typeof opt.label === 'string'
        ? opt.label
        : opt.label != null
        ? String(opt.label)
        : '',
  }));

  // Handle filter selection
  const handleFilterSelect = (value: string) => {
    onFilterChange(value);
    setIsModalVisible(false);
  };

  // Open filter modal
  const openFilterModal = () => {
    setIsModalVisible(true);
  };

  // Close filter modal
  const closeFilterModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {/* Filter button */}
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: colors.white,
            borderColor: colors.border,
          },
          containerStyle,
        ]}
        onPress={openFilterModal}
        activeOpacity={0.7}>
        {/* Filter icon */}
        <Ionicons name="filter" size={iconSize} color={colors.primary} style={styles.icon} />

        {/* Selected value text */}
        {showSelectedValue && (
          <Text
            style={[
              styles.selectedText,
              {
                color: selectedOption ? colors.text : colors.gray,
              },
            ]}
            numberOfLines={1}>
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
        )}

        {/* Dropdown arrow */}
        <Ionicons name="chevron-down" size={20} color={colors.gray} style={styles.arrowIcon} />
      </TouchableOpacity>

      {/* Filter Modal */}
      <CustomModal
        visible={isModalVisible}
        onRequestClose={closeFilterModal}
        backgroundColor="rgba(0,0,0,0.5)">
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: colors.white,
            },
          ]}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <Text
              style={[
                styles.modalTitle,
                {
                  color: colors.text,
                },
              ]}>
              {title}
            </Text>
            <TouchableOpacity
              onPress={closeFilterModal}
              style={styles.closeButton}
              hitSlop={{top: 15, bottom: 15, left: 25, right: 25}}>
              <Ionicons name="close" size={24} color={colors.gray} />
            </TouchableOpacity>
          </View>

          {/* Filter Options */}
          <ScrollView
            style={styles.optionsContainer}
            showsVerticalScrollIndicator={false}>
            {safeOptions.map(option => (
              <CustomRadio
                key={option.id}
                selected={selectedValue === option.value}
                onPress={() => handleFilterSelect(option.value)}
                label={option.label}
                style={styles.radioItem}
                labelStyle={{
                  ...styles.radioLabel,
                  color: colors.text,
                }}
              />
            ))}
          </ScrollView>

          {/* Clear Filter Button */}
          {selectedValue && (
            <CustomButton
              title={strings.filter.clear}
              onPress={() => handleFilterSelect('')}
            />
          )}
        </View>
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    minHeight: verticalScale(40),
  },
  icon: {
    marginRight: horizontalScale(8),
  },
  selectedText: {
    flex: 1,
    fontSize: fonts.font14,
    fontFamily: fontRegular,
    marginRight: horizontalScale(8),
    textAlign: 'center',
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
  modalContent: {
    borderRadius: 16,
    padding: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: fonts.font18,
    fontFamily: fontSemiBold,
  },
  closeButton: {
    padding: horizontalScale(4),
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  optionsContainer: {
    paddingVertical: verticalScale(16),
    maxHeight: verticalScale(300),
  },
  radioItem: {
    marginVertical: verticalScale(8),
  },
  radioLabel: {
    fontSize: fonts.font16,
    fontFamily: fontRegular,
  },
  clearButton: {
    marginHorizontal: horizontalScale(20),
    marginBottom: verticalScale(16),
    paddingVertical: verticalScale(12),
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: fonts.font14,
    fontFamily: fontSemiBold,
  },
});

export default CustomFilter;
