/**
 * Copyright (C) 2025 Factana Computing Pvt Ltd.
 * All Rights Reserved.
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import {Platform, StyleSheet} from 'react-native';
import {AppColors} from '../../constants';

export const createNoInternetScreenStyles = (colors: AppColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    imageContainer: {
      marginBottom: 32,
      alignItems: 'center',
    },
    whoopsImage: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
    },
    title: {
      textAlign: 'center',
      marginBottom: 16,
    },
    message: {
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 40,
      paddingHorizontal: 20,
    },
    buttonContainer: {
      width: Platform.OS === 'ios' ? '90%' : '100%',
      marginHorizontal: 16,
      gap: 16,
    },
    retryButton: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 12,
    },
    retryButtonText: {
      color: colors.white,
    },
    backButton: {
      backgroundColor: 'transparent',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    backButtonText: {
      color: colors.text,
    },
  });
