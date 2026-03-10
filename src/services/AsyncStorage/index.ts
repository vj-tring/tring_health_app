

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ASYNC_STORAGE_KEY} from './keys';

export const storeAyncStorageData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // Store failed
  }
};

export const removeAyncStorageData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // Remove failed
  }
};

export const getAyncStorageData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

export const getAllAsyncStorageData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const stores = await AsyncStorage.multiGet(keys);
    const allData = stores.map(([key, value]) => ({
      key,
      value: JSON.parse(value ?? ''),
    }));
    return allData;
  } catch (e) {
    // Error reading values
    console.error('Error reading values from AsyncStorage', e);
    return [];
  }
};

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Failed to clear Async Storage:', error);
  }
};

export const clearUserData = async () => {
  try {
    // Get the onboarding completion status before clearing
    const onboardingCompleted = await AsyncStorage.getItem(
      ASYNC_STORAGE_KEY.ONBOARDING_COMPLETED,
    );

    // Clear all async storage
    await AsyncStorage.clear();

    // Restore the onboarding completion status
    if (onboardingCompleted) {
      await AsyncStorage.setItem(
        ASYNC_STORAGE_KEY.ONBOARDING_COMPLETED,
        onboardingCompleted,
      );
    }
  } catch (error) {
    console.error('Failed to clear user data:', error);
  }
};
