

import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import {
  fontRegular,
  fonts,
  horizontalScale,
  verticalScale,
} from '../constants/fonts';

// Toast configuration object for different toast types
export const toastConfig = {
  // Success toast style
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: '#d4edda', // very light green background
        borderLeftColor: '#28a745', // dark green accent
        borderRadius: 12,
        minHeight: verticalScale(70),
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 2},
        width: '90%', // Set width to 90% of screen
        alignSelf: 'center', // Center the toast
      }}
      contentContainerStyle={{
        paddingHorizontal: horizontalScale(16),
        paddingVertical: verticalScale(12),
        width: '100%',
      }}
      text1Style={{
        fontSize: fonts.font16,
        fontFamily: fontRegular,
        color: '#155724', // darker green text
        numberOfLines: 0, // Allow unlimited lines
        textAlign: 'left',
      }}
      text2Style={{
        fontSize: fonts.font14,
        fontFamily: fontRegular,
        color: '#155724',
        numberOfLines: 0, // Allow unlimited lines
        textAlign: 'left',
      }}
      text1NumberOfLines={0} // Allow unlimited lines for text1
      text2NumberOfLines={0} // Allow unlimited lines for text2
    />
  ),

  // Error toast style
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: '#f5c2c7',
        borderLeftColor: '#b02a37',
        borderRadius: 12,
        minHeight: verticalScale(70),
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: {width: 0, height: 3},
        width: '90%', // Set width to 90% of screen
        alignSelf: 'center', // Center the toast
      }}
      contentContainerStyle={{
        paddingHorizontal: horizontalScale(16),
        paddingVertical: verticalScale(12),
        width: '100%',
      }}
      text1Style={{
        fontSize: fonts.font16,
        fontFamily: fontRegular,
        color: 'black',
        numberOfLines: 0, // Allow unlimited lines
        textAlign: 'left',
      }}
      text2Style={{
        fontSize: fonts.font14,
        fontFamily: fontRegular,
        color: 'black',
        numberOfLines: 0, // Allow unlimited lines
        textAlign: 'left',
      }}
      text1NumberOfLines={0} // Allow unlimited lines for text1
      text2NumberOfLines={0} // Allow unlimited lines for text2
    />
  ),
  // Message toast style
  message: (props: any) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: '#ff9800',
        borderLeftColor: '#e68900',
        borderRadius: 12,
        minHeight: verticalScale(70),
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: {width: 0, height: 3},
        width: '90%', // Set width to 90% of screen
        alignSelf: 'center', // Center the toast
      }}
      contentContainerStyle={{
        paddingHorizontal: horizontalScale(16),
        paddingVertical: verticalScale(12),
        width: '100%',
      }}
      text1Style={{
        fontSize: fonts.font16,
        fontFamily: fontRegular,
        color: 'white',
        numberOfLines: 0, // Allow unlimited lines
        textAlign: 'left',
      }}
      text1NumberOfLines={0} // Allow unlimited lines for text1
    />
  ),
  // Custom toast using a custom component

  customToast: (props: any) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: '#d4edda', // very light green background
        borderLeftColor: '#28a745', // dark green accent
        borderRadius: 12,
        minHeight: verticalScale(70),
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 2},
        width: '90%', // Set width to 90% of screen
        alignSelf: 'center', // Center the toast
      }}
      contentContainerStyle={{
        paddingHorizontal: horizontalScale(16),
        paddingVertical: verticalScale(12),
        width: '100%',
      }}
      text1Style={{
        fontSize: fonts.font16,
        fontFamily: fontRegular,
        color: '#155724', // darker green text
        numberOfLines: 0, // Allow unlimited lines
        textAlign: 'left',
      }}
      text2Style={{
        fontSize: fonts.font14,
        fontFamily: fontRegular,
        color: '#155724',
        numberOfLines: 0, // Allow unlimited lines
        textAlign: 'left',
      }}
      text1NumberOfLines={0} // Allow unlimited lines for text1
      text2NumberOfLines={0} // Allow unlimited lines for text2
    />
  ),
};

// Toast configuration model for function parameters
interface ToastConfigModel {
  message: string;
  subMessage?: string;
  onHide?: () => void;
  visibilityTime?: number;
  position?: 'top' | 'bottom';
}

// Show a default error toast
export const showToast = ({
  message,
  subMessage,
  onHide = () => {},
  visibilityTime = 4000,
}: ToastConfigModel) => {
  Toast.show({
    type: 'error', // Default error toast type, can be customized
    text1: message,
    text2: subMessage,
    onHide,
    visibilityTime,
    topOffset: 60,
  });
};

// Show a success toast
export const showToastSuccess = ({
  message,
  onHide = () => {},
  visibilityTime = 4000,
}: ToastConfigModel) => {
  Toast.show({
    type: 'success',
    text1: message,
    onHide,
    visibilityTime,
    topOffset: 60,
  });
};

// Show a message toast
export const showToastMsg = ({
  message,
  onHide = () => {},
  visibilityTime = 4000,
}: ToastConfigModel) => {
  Toast.show({
    type: 'message',
    text1: message,
    onHide,
    visibilityTime,
    topOffset: 60,
  });
};

// Show a custom toast using the customToast type
export const showCustomToast = ({
  message,
  onHide = () => {},
  visibilityTime = 4000,
  position = 'top',
}: ToastConfigModel) => {
  Toast.show({
    type: 'customToast', // Ensure this type matches the one in the toastConfig
    text1: message,
    position: position,
    onHide,
    visibilityTime,
    topOffset: 60,
  });
};
