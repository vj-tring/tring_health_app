import {StyleSheet} from 'react-native';
import type {AppColors} from '../../constants/colors';
import {
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
    headerOverCard: {
      alignItems: 'center',
      paddingTop: verticalScale(20),
      paddingBottom: verticalScale(16),
    },
    text_logo: {
      alignSelf: 'center',
      marginBottom: verticalScale(12),
    },
    cardTitle: {
      fontSize: fonts.font20,
      fontFamily: fontSemiBold,
      color: colors.text,
      textAlign: 'center',
    },
    cardSubtitle: {
      fontSize: fonts.font14,
      fontFamily: fontRegular,
      color: colors.plainGrey,
      textAlign: 'center',
      marginBottom: verticalScale(4),
    },
    formContainerInCard: {
      marginTop: verticalScale(8),
    },
    buttonContainerInCard: {
      marginTop: verticalScale(16),
      alignSelf: 'stretch',
    },
    inputContainerStyle: {
      borderRadius: 14,
      borderColor: colors.lightGray,
    },
    primaryButtonGradient: {
      borderRadius: 14,
      overflow: 'hidden',
      marginBottom: verticalScale(2),
    },
    primaryButtonInner: {
      paddingVertical: verticalScale(14),
      paddingHorizontal: horizontalScale(16),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 14,
    },
    primaryButtonText: {
      fontSize: fonts.font16,
      fontFamily: fontSemiBold,
      color: colors.white,
    },
    signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: verticalScale(12),
      marginBottom: verticalScale(4),
    },
    signupText: {
      fontSize: fonts.font12,
      fontFamily: fontRegular,
      color: colors.text,
    },
    signupLink: {
      fontSize: fonts.font12,
      fontFamily: fontSemiBold,
      color: colors.primary,
    },
    countryFlagContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    countryFlagMargin: {
      marginRight: horizontalScale(5),
    },
    dropDownIcon: {
      width: 12,
      height: 12,
    },
    chevronDown: {
      fontSize: 10,
      paddingHorizontal: 2,
    },
    inputText: {
      fontSize: fonts.font14,
      fontFamily: fontRegular,
      color: colors.black,
      paddingLeft: verticalScale(6),
    },
  });
};

export default createStyles;
