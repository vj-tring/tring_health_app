

import React from 'react';
import {View, StyleSheet, ViewStyle, Platform} from 'react-native';
import Modal from 'react-native-modal';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  visible: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  backgroundColor?: string;
  style?: ViewStyle;
  height?: string;
  modalHeight?: ViewStyle['height'];
  modalFrom?: number;
  swipeDirection?: 'up' | 'down' | 'left' | 'right';
  swipeToCloseEnabled?: boolean;
  propagateSwipe?: boolean;
};

const CustomModal: React.FC<Props> = ({
  style,
  visible,
  onRequestClose,
  children,
  height,
  modalHeight,
  backgroundColor = 'rgba(0,0,0,0.5)',
  modalFrom,
  swipeDirection = 'down',
  swipeToCloseEnabled = true,
  propagateSwipe = true,
}) => {
  // Determine if full height and Android
  const isFullHeightAndroid = Platform.OS === 'android' && height === '100%';

  // Compose content style
  const contentStyle = [
    styles.content,
    isFullHeightAndroid && {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    style,
  ];

  const insets = useSafeAreaInsets();

  return (
    <Modal
      statusBarTranslucent
      isVisible={visible}
      onSwipeComplete={onRequestClose}
      swipeDirection={swipeToCloseEnabled ? swipeDirection : undefined}
      onBackdropPress={onRequestClose}
      backdropColor={backgroundColor}
      backdropOpacity={1}
      propagateSwipe={propagateSwipe}
      style={[
        styles.modal,
        {marginTop: Platform.OS === 'ios' ? insets.top : 0},
      ]}>
      {modalFrom == 1 ? (
        <>
          <View style={[styles.overlay, {backgroundColor}]}>
            <View style={styles.content}>{children}</View>
          </View>
        </>
      ) : Platform.OS === 'ios' ? (
        <SafeAreaView
          edges={['top', 'left', 'right']}
          style={{height: modalHeight || '95%'}}>
          <View style={contentStyle}>{children}</View>
        </SafeAreaView>
      ) : (
        <SafeAreaView
          edges={['top', 'left', 'right']}
          style={{height: modalHeight ?? '90%'}}>
          <View style={contentStyle}>{children}</View>
        </SafeAreaView>
      )}
    </Modal>
  );
};

export const CustomKeyboardModal: React.FC<Props> = ({
  style,
  visible,
  onRequestClose,
  children,
  height,
  backgroundColor = 'rgba(0,0,0,0.5)',
  modalFrom,
  swipeDirection = 'down',
  swipeToCloseEnabled = true,
  propagateSwipe = true,
}) => {
  // Determine if full height and Android
  const isFullHeightAndroid =
    Platform.OS === 'android' || (Platform.OS === 'ios' && height === '100%');

  // Compose content style
  const contentStyle = [
    styles.content,
    isFullHeightAndroid && {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    style,
  ];

  const insets = useSafeAreaInsets();

  return Platform.OS === 'ios' ? (
    <Modal
      statusBarTranslucent
      isVisible={visible}
      onSwipeComplete={onRequestClose}
      swipeDirection={swipeToCloseEnabled ? swipeDirection : undefined}
      onBackdropPress={onRequestClose}
      propagateSwipe={propagateSwipe}
      backdropColor={backgroundColor}
      backdropOpacity={1}
      style={[styles.modal]}>
      {children}
    </Modal>
  ) : (
    <Modal
      statusBarTranslucent
      isVisible={visible}
      onSwipeComplete={onRequestClose}
      swipeDirection={swipeToCloseEnabled ? swipeDirection : undefined}
      onBackdropPress={onRequestClose}
      backdropColor={backgroundColor}
      propagateSwipe={propagateSwipe}
      backdropOpacity={1}
      style={[styles.modal]}>
      <View style={[contentStyle]}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Overlay container styles
  overlay: {
    flex: 1,
    justifyContent: 'flex-end', // Push content to the bottom
    alignItems: 'center', // Center horizontally (optional)
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0, // Ensures modal takes full screen width
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    padding: 16,
    width: '100%',
  },
});

export default CustomModal;
