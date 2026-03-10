

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';
import {useTheme} from '../../utils/themeProvider';
import {
  fonts,
  fontMedium,
  horizontalScale,
  verticalScale,
} from '../../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createCommonStyles} from '../../constants';

interface TabOption {
  label: string;
  value: string;
}

interface CustomTabSelectorProps {
  options: TabOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  showFilterIcon?: boolean;
  onFilterPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  selectedTabStyle?: StyleProp<ViewStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  filterIconColor?: string;
  filterCount?: number;
}

const CustomTabSelector: React.FC<CustomTabSelectorProps> = ({
  options,
  selectedValue,
  onValueChange,
  showFilterIcon = false,
  onFilterPress,
  containerStyle,
  tabStyle,
  textStyle,
  selectedTabStyle,
  selectedTextStyle,
  disabled = false,
  filterIconColor,
  filterCount,
}) => {
  const {colors} = useTheme();
  const commonStyles = createCommonStyles(colors);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: verticalScale(4),
    },
    tabsContainer: {
      flex: 1,
      marginRight: showFilterIcon ? horizontalScale(8) : 0,
    },
    scrollView: {
      flexGrow: 0,
    },
    tabsRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    tab: {
      marginHorizontal: horizontalScale(4),
      paddingVertical: verticalScale(4),
      paddingHorizontal: horizontalScale(10),
      backgroundColor: colors.backgroundGray,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.backgroundGray,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedTab: {
      backgroundColor: colors.black,
      borderColor: colors.black,
    },
    tabText: {
      fontFamily: fontMedium,
      fontSize: fonts.font14,
      color: colors.normalGray,
      textAlign: 'center',
    },
    selectedTabText: {
      color: colors.white,
    },
    filterIcon: {
      width: horizontalScale(24),
      height: verticalScale(24),
      tintColor: filterIconColor || colors.primary,
    },
    filterButton: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    filterCountBadge: {
      position: 'absolute',
      top: -7,
      right: -7,
      backgroundColor: colors.primary,
      borderRadius: 12,
      minWidth: 22,
      height: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.white,
    },
    filterCountText: {
      color: colors.white,
      fontSize: fonts.font11,
      fontFamily: fontMedium,
      textAlign: 'center',
    },
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
          style={styles.scrollView}>
          <View style={styles.tabsRow}>
            {options.map(option => {
              const isSelected = selectedValue === option.value;
              const isTabDisabled = disabled || isSelected; // Disable if component is disabled OR if this tab is selected
              return (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.tab,
                    tabStyle,
                    isSelected && [styles.selectedTab, selectedTabStyle],
                  ]}
                  onPress={() => !isTabDisabled && onValueChange(option.value)}
                  activeOpacity={isTabDisabled ? 1 : 0.7} // No opacity change when disabled
                  disabled={isTabDisabled}>
                  <Text
                    style={[
                      commonStyles.typography.value,
                      {color: colors.normalGray},
                      textStyle,
                      isSelected && [styles.selectedTabText, selectedTextStyle],
                    ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      {showFilterIcon && onFilterPress && (
        <TouchableOpacity
          style={styles.filterButton}
          onPress={onFilterPress}
          activeOpacity={disabled ? 1 : 0.7}
          disabled={disabled}>
          <Ionicons
            name="filter"
            size={22}
            color={disabled ? colors.gray : colors.text}
            style={disabled ? {opacity: 0.5} : undefined}
          />
          {(() => {
            const count = Number(filterCount);
            return count && !isNaN(count) && count > 0 ? (
              <View style={styles.filterCountBadge}>
                <Text style={styles.filterCountText}>
                  {count > 99 ? '99+' : String(count)}
                </Text>
              </View>
            ) : null;
          })()}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTabSelector;
