import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import CountryFlag from '../../components/CountryFlag';
import CustomSearchBar from '../../components/CustomSearchBar';
import Images from '../../constants/images';
import {
  fontMedium,
  fontRegular,
  fonts,
  fontSemiBold,
  verticalScale,
} from '../../constants/fonts';
import { useTheme } from '../../utils/themeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomEmptyState from '../../components/CustomEmptyState';

interface Country {
  name: string;
  dialCode: string;
  isoCode: string;
  flag: string;
  mobileNumberLength: number;
  example: string;
}

interface Props {
  visible: boolean;
  countries: Country[];
  searchValue: string;
  onSearch: (text: string) => void;
  onSelect: (country: Country) => void;
  onRequestClose: () => void;
}

const CountryPickerModal: React.FC<Props> = ({
  visible,
  countries,
  searchValue,
  onSearch,
  onSelect,
  onRequestClose,
}) => {
  const { colors } = useTheme();
  if (!visible) return null;
  return (
    <SafeAreaView style={styles.modalContainer}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: colors.black }]}>
          Select Country
        </Text>
        <TouchableOpacity
          onPress={onRequestClose}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          style={styles.cancelButton}>
          <Text style={[styles.cancelText, { color: colors.primary }]}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchBarContainer}>
        <CustomSearchBar
          value={searchValue}
          onChangeText={onSearch}
          placeholder="Search Country or Code"
          containerStyle={{ flex: 1 }}
          showSearchButton={true}
        />
      </View>
      {countries.length === 0 ? (
        <CustomEmptyState
          isSearchEmpty={!!searchValue}
          searchText={searchValue}
          title={
            searchValue
              ? `We didn't find any data for '${searchValue}'.`
              : 'No Countries Found'
          }
        />
      ) : (
        <FlatList
          data={countries}
          keyExtractor={item => item.isoCode}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onSelect(item)}
              style={styles.countryItem}>
              <View style={styles.countryRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CountryFlag
                    isoCode={item.isoCode}
                    size={19}
                    style={styles.flag}
                  />
                  <Text style={[styles.countryName, { color: colors.black }]}>
                    {item.name}
                  </Text>
                </View>
                <Text style={[styles.countryName, { color: colors.black }]}>
                  {item.dialCode}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: '100%',
    marginVertical: verticalScale(18),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    paddingHorizontal: 4,
  },
  headerText: {
    fontSize: fonts.font18,
    fontFamily: fontSemiBold,
  },
  cancelButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  cancelText: {
    fontSize: fonts.font16,
    fontFamily: fontMedium,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  countryItem: {
    padding: 10,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  flag: {
    marginRight: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: fonts.font16,
    fontFamily: fontMedium,
  },
  countryName: {
    fontSize: fonts.font14,
    fontFamily: fontRegular,
  },
});

export default CountryPickerModal;
