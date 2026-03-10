import React from 'react';
import {View, Text, TouchableOpacity, StatusBar, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../utils/themeProvider';
import {fonts, fontSemiBold, fontRegular, horizontalScale, verticalScale} from '../../constants/fonts';

type Props = {
  title?: string;
  subtitle?: string;
};

const DashboardHeader: React.FC<Props> = ({
  title = 'Tring Health',
  subtitle = 'Hi, Sandiya!',
}) => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.primary,
            paddingTop: verticalScale(16) + insets.top,
          },
        ]}>
        <View style={styles.headerRow}>
          <View style={styles.headerTextWrap}>
            <Text style={[styles.headerTitle, {color: colors.white}]}>
              {title}
            </Text>
            <Text style={[styles.headerSubtitle, {color: colors.white}]}>
              {subtitle}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}>
            <View
              style={[
                styles.avatarCircle,
                {backgroundColor: colors.white},
              ]}>
              <Ionicons
                name="person-outline"
                size={24}
                color={colors.primary}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: verticalScale(24),
    paddingHorizontal: horizontalScale(16),
    borderBottomRightRadius: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: fonts.font22,
    fontFamily: fontSemiBold,
    marginBottom: verticalScale(2),
  },
  headerSubtitle: {
    fontSize: fonts.font14,
    fontFamily: fontRegular,
    opacity: 0.95,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DashboardHeader;

