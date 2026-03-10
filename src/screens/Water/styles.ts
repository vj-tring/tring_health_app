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
    todayCard: {
      backgroundColor: colors.primary,
      borderRadius: 20,
      marginHorizontal: horizontalScale(16),
      paddingHorizontal: horizontalScale(16),
      paddingTop: verticalScale(18),
      paddingBottom: verticalScale(18),
      marginBottom: verticalScale(20),
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 6,
    },
    todayHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: verticalScale(12),
    },
    todayTitle: {
      fontSize: fonts.font14,
      fontFamily: fontMedium,
      color: colors.white,
      opacity: 0.95,
    },
    todaySteps: {
      fontSize: fonts.font32,
      fontFamily: fontSemiBold,
      color: colors.white,
      marginTop: verticalScale(4),
      marginBottom: verticalScale(2),
    },
    todayGoalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: verticalScale(4),
    },
    todayGoalText: {
      fontSize: fonts.font12,
      fontFamily: fontRegular,
      color: colors.white,
      opacity: 0.9,
    },
    todayPercentText: {
      fontSize: fonts.font12,
      fontFamily: fontMedium,
      color: colors.white,
    },
    todayProgressTrack: {
      height: 6,
      borderRadius: 3,
      backgroundColor: 'rgba(255,255,255,0.3)',
      marginTop: verticalScale(10),
      overflow: 'hidden',
    },
    todayProgressFill: {
      height: '100%',
      borderRadius: 3,
      backgroundColor: colors.white,
      width: '0%',
    },
    todayCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255,255,255,0.18)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logCard: {
      backgroundColor: colors.white,
      borderRadius: 20,
      marginHorizontal: horizontalScale(16),
      paddingHorizontal: horizontalScale(16),
      paddingTop: verticalScale(18),
      paddingBottom: verticalScale(18),
      marginBottom: verticalScale(16),
    },
    logTitle: {
      fontSize: fonts.font16,
      fontFamily: fontSemiBold,
      color: colors.text,
      marginBottom: verticalScale(12),
    },
    glassesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: verticalScale(12),
    },
    glassTile: {
      width: '22%',
      aspectRatio: 1,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: verticalScale(12),
      paddingVertical: verticalScale(8),
      backgroundColor: colors.veryLightGray,
    },
    glassTileFilled: {
      backgroundColor: colors.primary,
    },
    logRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    removeButton: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    removeButtonText: {
      color: colors.primary,
    },
    tipsCard: {
      backgroundColor: '#E6F4FF',
      borderRadius: 20,
      marginHorizontal: horizontalScale(16),
      paddingHorizontal: horizontalScale(16),
      paddingTop: verticalScale(18),
      paddingBottom: verticalScale(18),
      marginBottom: verticalScale(24),
    },
    tipsTitle: {
      fontSize: fonts.font16,
      fontFamily: fontSemiBold,
      color: colors.text,
      marginBottom: verticalScale(12),
    },
    tipRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(6),
    },
    tipIcon: {
      fontSize: fonts.font16,
      marginRight: horizontalScale(8),
    },
    tipText: {
      fontSize: fonts.font14,
      fontFamily: fontRegular,
      color: colors.text,
      flex: 1,
      flexWrap: 'wrap',
    },
  });
};

export default createStyles;

