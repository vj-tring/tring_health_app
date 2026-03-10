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
      fontSize: fonts.font14,
      fontFamily: fontRegular,
      color: colors.plainGrey,
      textAlign: 'center',
      marginBottom: verticalScale(20),
      lineHeight: 22,
    },
    inputContainerStyle: {
      borderRadius: 14,
      borderColor: colors.lightGray,
    },
    buttonContainerInCard: {
      marginTop: verticalScale(20),
      alignSelf: 'stretch',
    },
    linkContainer: {
      marginTop: verticalScale(16),
      alignItems: 'center',
    },
    linkText: {
      fontSize: fonts.font14,
      fontFamily: fontMedium,
      color: colors.primary,
    },
  });
};

export default createStyles;
