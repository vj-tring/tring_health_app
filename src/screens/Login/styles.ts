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
    formContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    buttonContainer: {
      marginTop: verticalScale(20),
    },
    mainContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
      backgroundColor: colors.white,
      marginBottom: verticalScale(15),
    },
    logoImage: {
      height: verticalScale(50),
      width: horizontalScale(50),
      resizeMode: 'contain',
    },
    imageContainer: {
      alignItems: 'center',
      marginTop: verticalScale(50),
    },
    signInTxt: {
      color: colors.plainGrey,
      fontSize: fonts.font16,
      fontFamily: fontSemiBold,
      textAlign: 'center',
      paddingBottom: verticalScale(15),
    },
    forgotTxt: {
      color: colors.primary,
      fontSize: fonts.font14,
      marginTop: verticalScale(10),
    },
    agreementContainer: {
      marginTop: verticalScale(16),
      marginHorizontal: horizontalScale(20),
      alignItems: 'center',
    },
    agreementText: {
      fontSize: fonts.font12,
      fontFamily: fontRegular,
      color: colors.text,
      textAlign: 'center',
      lineHeight: verticalScale(20),
    },
    linkText: {
      fontSize: fonts.font12,
      fontFamily: fontSemiBold,
      color: colors.primary,
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
    logo: {
      resizeMode: 'contain',
      width: 76,
      height: 76,
    },
    headerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: verticalScale(25),
    },
    subText: {
      color: colors.plainGrey,
      fontSize: fonts.font16,
      fontFamily: fontMedium,
      textAlign: 'center',
    },
    buttonPhone: {
      backgroundColor: colors.white,
      borderColor: colors.primary,
      borderWidth: 1,
    },
    phonetxt: {
      color: colors.primary,
      fontFamily: fontSemiBold,
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: verticalScale(10),
      marginBottom: verticalScale(10),
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#D3D3D3',
    },
    dividerText: {
      marginHorizontal: 8,
      color: '#888',
      fontSize: fonts.font14,
      fontFamily: fontRegular,
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
      paddingTop: verticalScale(40),
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
      marginBottom: verticalScale(6),
    },
    cardSubtitle: {
      fontSize: fonts.font13,
      fontFamily: fontRegular,
      color: colors.plainGrey,
      textAlign: 'center',
      marginBottom: verticalScale(7),
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
    secondaryButtonStyle: {
      borderRadius: 14,
      borderWidth: 1.5,
    },
    countryFlagContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    countryFlagMargin: {
      marginRight: horizontalScale(5),
    },
  });
};

export default createStyles;
