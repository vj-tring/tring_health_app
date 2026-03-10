/**
 * Copyright (C) 2025 Factana Computing Pvt Ltd.
 * All Rights Reserved.
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { CustomButton } from '../../components';
import { createCommonStyles } from '../../constants/commonStyles';
import { strings } from '../../constants/strings';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { useTheme } from '../../utils/themeProvider';
import { showToast } from '../../utils/toastConfig';
import { createNoInternetScreenStyles } from './styles';

interface NoInternetScreenProps {
  onRetry?: () => void;
  onBack?: () => void;
}

const NoInternetScreen: React.FC<NoInternetScreenProps> = ({
  onRetry,
  onBack,
}) => {
  const {colors} = useTheme();
  const styles = createNoInternetScreenStyles(colors);
  const commonStyles = createCommonStyles(colors);
  const {isConnected, refreshNetworkStatus} = useNetworkStatus();


  const handleRetry = async () => {
    try {
      // Refresh network status
      await refreshNetworkStatus();

      // Check if network is still unavailable after refresh
      if (!isConnected) {
        showToast({
          message: 'Network Unavailable',
          subMessage: 'Please check your internet connection and try again.',
          visibilityTime: 3000,
        });
        return;
      }

      // If there's a custom retry function, call it
      if (onRetry) {
        onRetry();
      }
    } catch (error) {
      console.warn('Error during retry:', error);
      showToast({
        message: 'Network Error',
        subMessage: 'Unable to check network status. Please try again.',
        visibilityTime: 3000,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Image
          source={require('../../assets/images/whoops.png')}
          style={{width: 200, height: 200}}
          resizeMode="contain"
        /> */}
      </View>

      <Text style={[commonStyles.typography.titleLarge, styles.title]}>
        {strings.no_internet.whoops}
      </Text>

      <Text style={[commonStyles.typography.bodyTextLarge, styles.message]}>
        {strings.no_internet.message}
      </Text>

      <View style={styles.buttonContainer}>
        <CustomButton
          title={strings.common.try_again}
          onPress={handleRetry}
        />

        {onBack && (
          <CustomButton title={strings.common.go_back} onPress={onBack} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NoInternetScreen;
