import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../utils/themeProvider';
import { useAppSelector } from '../../hooks/reduxHooks';
import SCREEN from '../../navigation/screenNames';
import {
  fonts,
  fontSemiBold,
  fontRegular,
  horizontalScale,
  verticalScale,
} from '../../constants/fonts';

type Props = {
  title?: string;
  subtitle?: string;
};

const DashboardHeader: React.FC<Props> = ({
  title = 'Tring Health',
  subtitle,
}) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const userInfo = useAppSelector(state => state.auth.userInfo);

  const firstName = (userInfo?.firstName || '').trim();
  const lastName = (userInfo?.lastName || '').trim();
  const headerSubtitle = subtitle || `Hi, ${firstName || 'Sandiya'}!`;

  const firstInitial = firstName.charAt(0) || 'S';
  const lastInitial = lastName.charAt(0) || 'P';
  const initials = `${firstInitial}${lastInitial}`.toUpperCase();

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
        ]}
      >
        <View style={styles.headerRow}>
          <View style={styles.headerTextWrap}>
            <Text style={[styles.headerTitle, { color: colors.white }]}>
              {title}
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.white }]}>
              {headerSubtitle}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            onPress={() => navigation.navigate(SCREEN.PROFILE_SCREEN as never)}
          >
            <View
              style={[styles.avatarCircle, { backgroundColor: colors.white }]}
            >
              <Text style={[styles.avatarInitials, { color: colors.primary }]}>
                {initials}
              </Text>
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
  avatarInitials: {
    fontSize: fonts.font14,
    fontFamily: fontSemiBold,
    lineHeight: 24,
  },
});

export default DashboardHeader;
