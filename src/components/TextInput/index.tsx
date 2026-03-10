

import React, { useState } from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { sharedShadow } from '../../constants/commonStyles';
import {
  fontMedium,
  fontRegular,
  fonts,
  fontSemiBold,
  horizontalScale,
  verticalScale,
} from '../../constants/fonts';
import Images from '../../constants/images';
import { useTheme } from '../../utils/themeProvider';

// Props interface for the CustomInput component
interface CustomInputProps {
  label?: string; // Optional label text
  value: string; // Input value
  onChangeText: (text: string) => void; // Callback when text changes
  placeholder?: string; // Optional placeholder text
  secureTextEntry?: boolean; // If true, input is obscured (password)
  containerStyle?: StyleProp<ViewStyle>; // Optional custom styles for the container
  inputContainerStyle?: StyleProp<ViewStyle>; // Optional styles for the input border box
  inputStyle?: StyleProp<TextStyle>; // Optional custom styles for the input
  labelStyle?: StyleProp<TextStyle>; // Optional custom styles for the label
  editable?: boolean; // If false, input is disabled
  cancelIcon?: boolean; // If true, show cancel/clear icon
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'; // Keyboard type
  errorMessage?: string; // Optional error message to display
  leftIcon?: React.ReactNode; // Optional custom left icon/component
  shadow?: boolean; // Optional: apply shadow style
  maxLength?: number;
  rightPillLabel?: string;
  children?: React.ReactNode;
  mandatory?: boolean;
  rightIcon?: React.ReactNode; // Optional custom right icon/component
}

// Main CustomInput component
const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  labelStyle,
  cancelIcon = false,
  editable = true,
  keyboardType = 'default',
  errorMessage,
  leftIcon,
  maxLength,
  shadow = false,
  rightPillLabel,
  children,
  mandatory = false,
  rightIcon,
}) => {
  // State to toggle password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {colors} = useTheme();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  // Clear the input text
  const clearText = () => {
    onChangeText('');
  };

  return (
    // Container for the input and label
    <View style={[styles.container, containerStyle]}>
      {/* Render label if provided */}
      {label && (
        <Text
          style={[
            styles.label,
            editable ? {color: colors.text} : {color: colors.text},
            labelStyle,
          ]}>
          {label}
          {mandatory && (
            <Text style={[styles.mandatoryIndicator, {color: colors.error}]}>
              *
            </Text>
          )}
        </Text>
      )}
      {/* Input container with border and background logic */}
      <View
        style={[
          styles.inputContainer,
          editable
            ? {backgroundColor: colors.white}
            : {backgroundColor: colors.backgroundGray},
          {
            borderColor: errorMessage ? colors.error : colors.border,
          },
          shadow ? sharedShadow : null,
          inputContainerStyle,
        ]}>
        {/* Render leftIcon if provided */}
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        {/* Main TextInput field */}
        <TextInput
          style={[
            styles.input,
            editable ? {color: colors.text} : {color: colors.text},
            inputStyle,
            rightPillLabel ? {paddingRight: 70} : {},
          ]}
          value={value}
          onChangeText={text => {
            // Prevent leading space
            if (text.startsWith(' ')) return;
            onChangeText(text);
          }}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          placeholderTextColor={colors.gray}
          underlineColorAndroid="transparent"
          editable={editable}
          maxLength={maxLength}
        />
        {/* Render rightIcon if provided (placed before default right controls) */}
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
        {rightPillLabel && (
          <View
            style={[
              styles.rightPillContainer,
              {backgroundColor: colors.backgroundGray},
            ]}>
            <Text style={[styles.rightPillText, {color: colors.text}]}>
              {rightPillLabel}
            </Text>
          </View>
        )}
        {/* Password visibility toggle icon */}
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.iconContainer}>
            <Image
              source={isPasswordVisible ? Images.eye_open : Images.eye_close}
              style={styles.passwordIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {/* Cancel/clear icon if enabled and input has value */}
        {value.length > 0 && cancelIcon && (
          <TouchableOpacity onPress={clearText} style={styles.iconContainer}>
            <Ionicons name="close-circle" size={22} color={colors.gray} />
          </TouchableOpacity>
        )}
      </View>

      {/* Error message display */}
      {errorMessage && (
        <Text style={[styles.errorText, {color: colors.error}]}>
          {errorMessage}
        </Text>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: verticalScale(10),
  },
  label: {
    marginBottom: verticalScale(1.5),
    fontSize: fonts.font16,
    fontFamily: fontSemiBold,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(10),
  },
  input: {
    flex: 1,
    fontSize: fonts.font14,
    fontFamily: fontRegular,
    paddingVertical: verticalScale(0),
  },
  iconContainer: {
    marginLeft: horizontalScale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: fonts.font12,
    marginTop: verticalScale(5),
    fontFamily: fontRegular,
  },
  mandatoryIndicator: {
    // color will be applied inline from colors.error
  },
  leftIconContainer: {
    marginRight: 8,
  },
  rightPillContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  rightPillText: {
    fontFamily: fontMedium,
    fontSize: fonts.font14,
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 40,
  },
  passwordIcon: {
    width: 21,
    height: 21,
  },
  clearIcon: {
    width: 14,
    height: 14,
  },
});

export default CustomInput;
