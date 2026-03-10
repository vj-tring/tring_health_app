import { StyleSheet } from 'react-native';
import type { AppColors } from '../../constants/colors';
import {
  fontRegular,
  fontSemiBold,
  fonts,
  horizontalScale,
  verticalScale,
} from '../../constants/fonts';

const createStyles = (colors: AppColors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.veryLightGray,
    },
    scrollContent: {
      paddingBottom: verticalScale(100),
    },
    titleSection: {
      paddingHorizontal: horizontalScale(16),
      paddingTop: verticalScale(16),
      paddingBottom: verticalScale(18),
    },
    screenTitle: {
      fontSize: fonts.font24,
      fontFamily: fontSemiBold,
      color: colors.text,
    },
    screenSubtitle: {
      fontSize: fonts.font14,
      fontFamily: fontRegular,
      color: colors.plainGrey,
    },
    rankCard: {
      backgroundColor: colors.primary,
      borderRadius: 20,
      marginHorizontal: horizontalScale(16),
      paddingHorizontal: horizontalScale(16),
      paddingTop: verticalScale(18),
      paddingBottom: verticalScale(18),
      marginBottom: verticalScale(20),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 6,
    },
    rankHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: verticalScale(12),
    },
    rankTitle: {
      fontSize: fonts.font14,
      fontFamily: fontRegular,
      color: '#ffffff',
      opacity: 0.95,
    },
    rankValue: {
      fontSize: fonts.font32,
      fontFamily: fontSemiBold,
      color: '#ffffff',
      marginTop: verticalScale(4),
    },
    rankCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255,255,255,0.18)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rankFooterRow: {
      marginTop: verticalScale(12),
    },
    rankPointsBlock: {
      backgroundColor: 'rgba(255,255,255,0.18)',
      borderRadius: 14,
      paddingVertical: verticalScale(12),
      paddingHorizontal: horizontalScale(14),
    },
    rankPointsLabel: {
      fontSize: fonts.font12,
      fontFamily: fontRegular,
      color: '#ffffff',
      opacity: 0.95,
      marginBottom: verticalScale(2),
    },
    rankPointsValue: {
      fontSize: fonts.font18,
      fontFamily: fontSemiBold,
      color: '#ffffff',
    },
    tabsContainer: {
      flexDirection: 'row',
      backgroundColor: colors.white,
      marginHorizontal: horizontalScale(16),
      borderRadius: 14,
      padding: horizontalScale(8),
      marginBottom: verticalScale(18),
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: verticalScale(10),
      borderRadius: 12,
    },
    tabItemActive: {
      backgroundColor: colors.primary,
    },
    tabText: {
      fontSize: fonts.font12,
      fontFamily: fontRegular,
      color: colors.plainGrey,
    },
    tabTextActive: {
      color: '#ffffff',
      fontFamily: fontSemiBold,
    },
    sectionTitle: {
      paddingHorizontal: horizontalScale(16),
      marginBottom: verticalScale(8),
      fontSize: fonts.font16,
      fontFamily: fontSemiBold,
      color: colors.text,
    },
    rankingCard: {
      backgroundColor: '#ffffff',
      marginHorizontal: horizontalScale(16),
      borderRadius: 16,
      paddingHorizontal: horizontalScale(16),
      paddingVertical: verticalScale(14),
      marginBottom: verticalScale(10),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    rankingCardYou: {
      backgroundColor: '#EEF2FF',
      borderWidth: 1,
      borderColor: colors.primary,
    },
    rankBadgeYou: {
      backgroundColor: colors.white,
    },
    rankPositionCircle: {
      width: 39,
      height: 39,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: horizontalScale(12),
    },
    rankPositionCircleDefault: {
      backgroundColor: colors.veryLightGray,
    },
    rankPositionText: {
      fontSize: fonts.font14,
      fontFamily: fontSemiBold,
      color: colors.text,
      lineHeight: 24,
    },
    rankPositionTextYou: {
      color: colors.black,
    },
    rankInitialsYou: {
      color: colors.primary,
    },
    rankingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    rankBadge: {
      width: 39,
      height: 39,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: horizontalScale(10),
    },
    rankBadgeGold: {
      backgroundColor: '#FFE08A',
    },
    rankBadgeSilver: {
      backgroundColor: '#E5E7EB',
    },
    rankBadgeBronze: {
      backgroundColor: '#FED7AA',
    },
    rankBadgeDefault: {
      backgroundColor: colors.veryLightGray,
    },
    rankInitials: {
      fontSize: fonts.font16,
      fontFamily: fontSemiBold,
      color: colors.text,
      lineHeight: 24,
    },
    rankingName: {
      fontSize: fonts.font14,
      fontFamily: fontSemiBold,
      color: colors.text,
    },
    rankingPoints: {
      fontSize: fonts.font12,
      fontFamily: fontRegular,
      color: colors.plainGrey,
    },
    rankingRightBadge: {
      backgroundColor: '#FFF7D6',
      borderRadius: 999,
      paddingHorizontal: horizontalScale(8),
      paddingVertical: verticalScale(4),
    },
    rankingRightBadgeText: {
      fontSize: fonts.font11,
      fontFamily: fontRegular,
      color: '#B45309',
    },
  });
};

export default createStyles;
