// permissions.ts
import {Alert, Linking} from 'react-native';

/** Open the app-level settings page (works on both iOS/Android) */
export const openAppSettings = async () => {
  try {
    await Linking.openSettings();
  } catch (err) {
    console.warn('Unable to open app settings', err);
  }
};

/** Prompt user to open app settings */
export const promptOpenSettings = async (title: string, message: string) =>
  new Promise<false>(resolve => {
    Alert.alert(title, message, [
      {text: 'Cancel', style: 'cancel', onPress: () => resolve(false)},
      {
        text: 'Open Settings',
        onPress: async () => {
          await openAppSettings();
          resolve(false);
        },
      },
    ]);
  });
