import {StyleSheet} from 'react-native';
import type {AppColors} from '../../constants/colors';
import {
  fontMedium,
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
    header: {
      backgroundColor: colors.primary,
      paddingTop: verticalScale(44),
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
      color: colors.white,
      marginBottom: verticalScale(2),
    },
    headerSubtitle: {
      fontSize: fonts.font14,
      fontFamily: fontRegular,
      color: colors.white,
      opacity: 0.95,
    },
    scrollContent: {
      paddingBottom: verticalScale(100),
    },
    welcomeSection: {
      paddingHorizontal: horizontalScale(16),
      paddingTop: verticalScale(16),
      paddingBottom: verticalScale(18),
    },
    welcomeTitle: {
      fontSize: fonts.font24,
      fontFamily: fontSemiBold,
      color: colors.text,
    },
    welcomeSubtitle: {
      fontSize: fonts.font14,
      fontFamily: fontRegular,
      color: colors.plainGrey,
    },
    progressCard: {
      backgroundColor: colors.primary,
      borderRadius: 20,
      marginHorizontal: horizontalScale(16),
      paddingHorizontal: horizontalScale(16),
      paddingTop: verticalScale(20),
      paddingBottom: verticalScale(20),
      marginBottom: verticalScale(20),
    },
    progressCardHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: verticalScale(12),
    },
    progressCardLabel: {
      fontSize: fonts.font14,
      fontFamily: fontMedium,
      color: colors.white,

      opacity: 0.95,
    },
    progressPercent: {
      fontSize: fonts.font32,
      fontFamily: fontSemiBold,
      color: colors.white,
      marginBottom: verticalScale(8),
    },
    progressBarTrack: {
      height: 6,
      borderRadius: 3,
      backgroundColor: 'rgba(255,255,255,0.3)',
      marginBottom: verticalScale(12),
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      borderRadius: 3,
      backgroundColor: colors.white,
      width: '0%',
    },
    progressFooter: {
      fontSize: fonts.font12,
      fontFamily: fontRegular,
      color: colors.white,
      opacity: 0.9,
    },
    weeklyCard: {
      backgroundColor: colors.white,
      borderRadius: 20,
      marginHorizontal: horizontalScale(16),
      paddingHorizontal: horizontalScale(16),
      paddingTop: verticalScale(18),
      paddingBottom: verticalScale(18),
      marginBottom: verticalScale(20),
    },
    weeklyHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: verticalScale(12),
    },
    weeklyTitle: {
      fontSize: fonts.font16,
      fontFamily: fontSemiBold,
      color: colors.text,
    },
    weeklySubtext: {
      fontSize: fonts.font12,
      fontFamily: fontRegular,
      color: colors.plainGrey,
    },
    weeklyBarTrack: {
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.lightGray,
      overflow: 'hidden',
      marginTop: verticalScale(12),
      marginBottom: verticalScale(8),
    },
    weeklyBarFill: {
      height: '100%',
      borderRadius: 4,
      backgroundColor: colors.primary,
    },
    weeklyFooterText: {
      fontSize: fonts.font11,
      fontFamily: fontRegular,
      color: colors.plainGrey,
    },
    cardsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: horizontalScale(16),
      justifyContent: 'space-between',
    },
    summaryCard: {
      width: '47%',
      backgroundColor: colors.white,
      borderRadius: 16,
      padding: horizontalScale(16),
      marginBottom: verticalScale(12),
    },
    iconCircle: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: verticalScale(12),
    },
    summaryLabel: {
      fontSize: fonts.font12,
      fontFamily: fontRegular,
      color: colors.plainGrey,
      marginBottom: verticalScale(4),
    },
    summaryValue: {
      fontSize: fonts.font20,
      fontFamily: fontSemiBold,
      color: colors.text,
      marginBottom: verticalScale(2),
    },
    summarySubtext: {
      fontSize: fonts.font11,
      fontFamily: fontRegular,
      color: colors.plainGrey,
    },
    summaryProgressBar: {
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.lightGray,
      marginTop: verticalScale(8),
      overflow: 'hidden',
    },
    summaryProgressFill: {
      height: '100%',
      borderRadius: 2,
      backgroundColor: colors.primary,
    },
  });
};

export default createStyles;
