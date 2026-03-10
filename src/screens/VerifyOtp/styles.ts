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
    mainView: {
      flex: 1,
    },
    screenWrap: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    headerArea: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: verticalScale(48),
      paddingBottom: verticalScale(20),
      paddingHorizontal: horizontalScale(16),
    },
    backButton: {
      paddingVertical: verticalScale(8),
      paddingRight: horizontalScale(12),
    },
    backButtonText: {
      fontSize: fonts.font24,
      color: colors.text,
    },
    headerSpacer: {
      width: 40,
    },
    headerTitle: {
      flex: 1,
      fontSize: fonts.font20,
      fontFamily: fontSemiBold,
      color: colors.text,
      textAlign: 'center',
      lineHeight: 28,
    },
    contentWrapper: {
      flex: 1,
      justifyContent: 'center',
    },
    contentCard: {
      backgroundColor: colors.white,
      borderRadius: 24,
      marginHorizontal: horizontalScale(8),
      paddingHorizontal: horizontalScale(20),
      paddingTop: verticalScale(16),
      paddingBottom: verticalScale(16),
      marginBottom: verticalScale(24),
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 6,
    },
    instructionText: {
      color: colors.plainGrey,
      fontFamily: fontRegular,
      fontSize: fonts.font14,
      textAlign: 'center',
      marginBottom: verticalScale(8),
    },
    emailText: {
      color: colors.text,
      fontFamily: fontSemiBold,
      fontSize: fonts.font15,
      textAlign: 'center',
      marginBottom: verticalScale(24),
    },
    otpRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: verticalScale(16),
      gap: horizontalScale(8),
    },
    otpBox: {
      width: horizontalScale(44),
      height: verticalScale(52),
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: colors.lightGray,
      textAlign: 'center',
      fontSize: fonts.font20,
      fontFamily: fontMedium,
      color: colors.text,
      backgroundColor: colors.white,
    },
    otpBoxError: {
      borderColor: colors.error,
    },
    otpErrorText: {
      color: colors.error,
      fontFamily: fontMedium,
      fontSize: fonts.font14,
      textAlign: 'center',
      marginTop: verticalScale(8),
    },
    resendContainer: {
      alignItems: 'center',
      marginTop: verticalScale(16),
    },
    resendLink: {
      color: colors.primary,
      fontFamily: fontMedium,
      fontSize: fonts.font14,
    },
    timerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: horizontalScale(6),
    },
    timerText: {
      color: colors.plainGrey,
      fontFamily: fontRegular,
      fontSize: fonts.font14,
    },
    timerCount: {
      color: colors.text,
      fontFamily: fontSemiBold,
      fontSize: fonts.font14,
    },
    successIcon: {
      fontSize: 28,
      marginBottom: verticalScale(8),
    },
    buttonContainer: {
      marginTop: verticalScale(24),
      alignSelf: 'stretch',
    },
  });
};

export default createStyles;
