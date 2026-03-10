

// CustomAlert component for displaying modal alerts with customizable actions
import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  fontBold,
  fontRegular,
  fonts,
  fontSemiBold,
  horizontalScale,
  verticalScale,
} from '../../constants/fonts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../../utils/themeProvider';
import {strings} from '../../constants/strings';

// Props interface for the CustomAlert component
interface CustomAlertProps {
  visible: boolean; // Controls the visibility of the alert
  title: string; // The title text to display
  description?: string; // The description text to display
  message: string; // The main message content
  onConfirm: () => void; // Callback function when confirm button is pressed
  onCancel?: () => void; // Optional callback function when cancel button is pressed
  confirmText?: string; // Optional custom text for the confirm button (defaults to 'Yes')
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  description,
  message,
  confirmText,
  onConfirm,
  onCancel,
}) => {
  // Get theme colors from the theme provider
  const {colors} = useTheme();

  // Handle backdrop press to dismiss the alert
  const handleBackdropPress = () => {
    onCancel?.();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onCancel}>
      {/* SafeAreaView ensures content is displayed within safe area boundaries */}
      <SafeAreaView style={styles.modalBackdrop} edges={['top', 'bottom']}>
        {/* Touchable backdrop that allows dismissal by tapping outside */}
        <TouchableOpacity
          style={styles.backdrop}
          onPress={handleBackdropPress}
          activeOpacity={1}
        />
        {/* Main alert content container */}
        <View style={[styles.modalContent, {backgroundColor: colors.white}]}>
          <Text style={[styles.title, {color: colors.text}]}>{title}</Text>

          <Text style={[styles.message, {color: colors.text}]}>{message}</Text>
          {description && (
            <Text style={[styles.description, {color: colors.text}]}>
              {description.split(',').map((part, index) =>
                index % 2 === 1 ? (
                  <Text
                    key={index}
                    style={[styles.boldText, {color: colors.text}]}>
                    , {part}
                  </Text>
                ) : (
                  part
                ),
              )}
            </Text>
          )}

          {/* Button row container */}
          <View style={styles.buttonRow}>
            {/* Render cancel button only if onCancel prop is provided */}
            {onCancel && (
              <TouchableOpacity
                style={[
                  styles.cancelButton,
                  {backgroundColor: colors.lightGray},
                ]}
                onPress={onCancel}>
                <Text style={[styles.buttonText, {color: colors.black}]}>
                  {strings.common.no}
                </Text>
              </TouchableOpacity>
            )}
            {/* Confirm button */}
            <TouchableOpacity
              style={[styles.confirmButton, {backgroundColor: colors.primary}]}
              onPress={onConfirm}>
              <Text style={[styles.buttonText, {color: colors.white}]}>
                {confirmText || strings.common.yes}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default CustomAlert;

// Styles for the CustomAlert component
const styles = StyleSheet.create({
  // Semi-transparent backdrop that covers the entire screen
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Full-screen touchable area for backdrop press
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  // Main alert content container
  modalContent: {
    padding: horizontalScale(20),
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
    // alignItems: 'center',
  },
  // Title text styling
  title: {
    fontSize: fonts.font18,
    fontFamily: fontSemiBold,
    marginBottom: verticalScale(10),
  },
  // Description text styling
  description: {
    fontSize: fonts.font14,
    fontFamily: fontRegular,
    textAlign: 'center',
    marginBottom: verticalScale(15),
  },
  // Bold text styling for description
  boldText: {
    fontFamily: fontBold,
  },
  // Message text styling
  message: {
    fontSize: fonts.font14,
    fontFamily: fontRegular,
    marginBottom: verticalScale(15),
   
  },
  // Button text styling
  buttonText: {
    fontSize: fonts.font14,
    fontFamily: fontBold,
  },
  // Container for action buttons
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: verticalScale(10),
  },
  // Cancel button styling
  cancelButton: {
    flex: 1,
    paddingVertical: verticalScale(10),
    marginRight: horizontalScale(10),
    borderRadius: 8,
    alignItems: 'center',
  },
  // Confirm button styling
  confirmButton: {
    flex: 1,
    paddingVertical: verticalScale(10),
    marginLeft: horizontalScale(10),
    borderRadius: 8,
    alignItems: 'center',
  },
});
