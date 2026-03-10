

import {Dimensions, PixelRatio} from 'react-native';
const {width, height} = Dimensions.get('window');

export const fontSize = {
  size2: 2,
  size4: 4,
  size6: 6,
  size8: 8,
  size10: 10,
  size12: 12,
  size14: 14,
  size16: 16,
  size18: 18,
  size20: 20,
  size22: 22,
  size24: 24,
  size26: 26,
  size28: 28,
  size30: 30,
  size32: 32,
  size34: 34,
  size36: 36,
  size38: 38,
  size40: 40,
};

// Define breakpoints
const isTablet = width >= 600;

// Set base width/height
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// Apply less aggressive scaling on tablets
const tabletScaleFactor = 0.75;
const scaleDownIfTablet = (value: number) =>
  isTablet ? value * tabletScaleFactor : value;

// Updated scale functions
const horizontalScale = (size: number) =>
  scaleDownIfTablet((width / guidelineBaseWidth) * size);
const verticalScale = (size: number) =>
  scaleDownIfTablet((height / guidelineBaseHeight) * size);
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export {horizontalScale, verticalScale, moderateScale};

// Set base width
const baseWidth = isTablet ? 768 : 375; // 768 for iPad/tablets, 375 for iPhones/mobiles

// Scale factor
const scale = width / baseWidth;

// Function to normalize font sizes with dynamic scale factor adjustment
const normalize = (size: number) => {
  const scaleFactor = isTablet ? 1.15 : 1; // Reduced scale factor for tablets
  return PixelRatio.roundToNearestPixel(size * scale * scaleFactor);
};

// Global font sizes
export const fonts = {
  font9: normalize(9),
  font10: normalize(10),
  font11: normalize(11),
  font12: normalize(12),
  font13: normalize(13),
  font14: normalize(14),
  font15: normalize(15),
  font16: normalize(16),
  font17: normalize(17),
  font18: normalize(18),
  font19: normalize(19),
  font20: normalize(isTablet ? 22 : 20),
  font22: normalize(isTablet ? 24 : 22),
  font24: normalize(isTablet ? 26 : 24),
  font30: normalize(isTablet ? 28 : 26), // Updated font30 to normalize(isTablet ? 28 : 26)
  font32: normalize(isTablet ? 30 : 28),
  font36: normalize(isTablet ? 32 : 30), // Updated
};

export const fontRegular = 'Poppins-Regular';
export const fontMedium = 'Poppins-Medium';
export const fontSemiBold = 'Poppins-SemiBold';
export const fontLight = 'Poppins-Light';
export const fontBold = 'Poppins-Bold';
export const fontExtraBold = 'Poppins-ExtraBold';
