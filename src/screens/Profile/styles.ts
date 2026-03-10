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
      justifyContent: 'space-between',
      paddingHorizontal: horizontalScale(4),
      paddingTop: verticalScale(12),
      paddingBottom: verticalScale(16),
    },
    backButton: {
      padding: verticalScale(4),
    },
    headerTitle: {
      flex: 1,
      fontSize: fonts.font18,
      fontFamily: fontSemiBold,
      color: colors.text,
      textAlign: 'center',
    },
    headerRightSpacer: {
      width: horizontalScale(32),
    },
    contentCard: {
      backgroundColor: colors.white,
      borderRadius: 24,
      marginHorizontal: horizontalScale(8),
      paddingHorizontal: horizontalScale(20),
      paddingTop: verticalScale(24),
      paddingBottom: verticalScale(24),
      marginBottom: verticalScale(24),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 6,
    },
    formContainerInCard: {
      marginTop: verticalScale(8),
    },
    avatarSection: {
      alignItems: 'center',
      marginTop: verticalScale(4),
      marginBottom: verticalScale(12),
    },
    avatarCircle: {
      width: 72,
      height: 72,
      borderRadius: 36,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: colors.primary,
    },
    avatarInitials: {
      fontSize: fonts.font24,
      fontFamily: fontSemiBold,
      lineHeight: 24,
    },
    avatarName: {
      marginTop: verticalScale(8),
      fontSize: fonts.font16,
      fontFamily: fontSemiBold,
      color: colors.text,
    },
    inputContainerStyle: {
      borderRadius: 14,
      borderColor: colors.lightGray,
      marginBottom: verticalScale(12),
    },
    updateButtonContainer: {
      marginTop: verticalScale(12),
    },
  });
};

export default createStyles;
