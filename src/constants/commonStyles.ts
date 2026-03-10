import {StyleSheet} from 'react-native';
import {AppColors} from './colors';
import {fontMedium, fontRegular, fontSemiBold, fonts} from './fonts';

// Typography styles (only those used in the app)
export const createTypographyStyles = (colors: AppColors) =>
  StyleSheet.create({
    title: {
      fontFamily: fontSemiBold,
      fontSize: fonts.font16,
      color: colors.text,
      textAlign: 'left',
    },
    titleLarge: {
      fontFamily: fontSemiBold,
      fontSize: fonts.font18,
      color: colors.text,
      textAlign: 'left',
      lineHeight: 26,
    },
    subtitle: {
      fontFamily: fontMedium,
      fontSize: fonts.font14,
      color: colors.text,
      marginBottom: 4,
    },
    bodyTextMedium: {
      fontFamily: fontRegular,
      fontSize: fonts.font15,
      color: colors.text,
      lineHeight: 20,
    },
    bodyTextLarge: {
      fontFamily: fontRegular,
      fontSize: fonts.font16,
      color: colors.text,
      lineHeight: 22,
    },
    value: {
      fontFamily: fontSemiBold,
      fontSize: fonts.font14,
      color: colors.text,
    },
    valueMedium: {
      fontFamily: fontSemiBold,
      fontSize: fonts.font15,
      color: colors.text,
    },
    valueLarge: {
      fontFamily: fontSemiBold,
      fontSize: fonts.font16,
      color: colors.text,
    },
  });

// Component styles (only those used in the app)
export const createComponentStyles = (colors: AppColors) =>
  StyleSheet.create({
    card: {
      borderRadius: 10,
      borderWidth: 1,
      paddingVertical: 12,
      paddingHorizontal: 12,
      marginBottom: 16,
      alignItems: 'flex-start',
      backgroundColor: colors.white,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 1,
      borderColor: colors.border,
    },
  });

export const sharedShadow = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 1,
};

export const createCommonStyles = (colors: AppColors) => ({
  typography: createTypographyStyles(colors),
  components: createComponentStyles(colors),
});

export type TypographyStyles = ReturnType<typeof createTypographyStyles>;
export type ComponentStyles = ReturnType<typeof createComponentStyles>;
export type CommonStyles = ReturnType<typeof createCommonStyles>;
