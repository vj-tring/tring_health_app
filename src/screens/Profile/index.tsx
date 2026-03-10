import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../utils/themeProvider';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { setUserInfo } from '../../store/features/auth/auth';
import AuthBackground from '../../components/AuthBackground';
import CustomKeyboardAwareScreen from '../../components/CustomKeyboardView';
import { TextInput as CustomInput, CustomButton } from '../../components';
import { verticalScale } from '../../constants/fonts';
import { showToast } from '../../utils/toastConfig';
import createStyles from './styles';

const ProfileScreen = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors);
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(state => state.auth.userInfo || {});

  const [firstName, setFirstName] = useState(userInfo.firstName || '');
  const [lastName, setLastName] = useState(userInfo.lastName || '');

  useEffect(() => {
    setFirstName(userInfo.firstName || '');
    setLastName(userInfo.lastName || '');
  }, [userInfo.firstName, userInfo.lastName]);

  const trimmedFirst = firstName.trim();
  const trimmedLast = lastName.trim();
  const fullName =
    trimmedFirst || trimmedLast
      ? [trimmedFirst, trimmedLast].filter(Boolean).join(' ')
      : [userInfo.firstName, userInfo.lastName].filter(Boolean).join(' ');
  const firstInitial =
    (trimmedFirst || userInfo.firstName || '').trim().charAt(0) || 'U';
  const lastInitial =
    (trimmedLast || userInfo.lastName || '').trim().charAt(0) || '';
  const initials = `${firstInitial}${lastInitial}`.toUpperCase();

  const handleUpdate = () => {
    Keyboard.dismiss();
    if (!trimmedFirst || !trimmedLast) {
      showToast({
        message: 'First name and last name are required',
        position: 'top',
      });
      return;
    }
    dispatch(
      setUserInfo({
        userInfo: {
          ...userInfo,
          firstName: trimmedFirst,
          lastName: trimmedLast,
          email: userInfo.email || '',
          phone: userInfo.phone || '',
        },
      }),
    );
    showToast({ message: 'Profile updated', position: 'top' });
    navigation.goBack();
  };

  return (
    <>
      <AuthBackground />
      <CustomKeyboardAwareScreen backgroundColor="transparent">
        <View style={styles.mainView}>
          <View style={[styles.headerArea]}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons
                name="arrow-back-outline"
                color={colors.text}
                size={24}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            <View style={styles.headerRightSpacer} />
          </View>

          <ScrollView
            style={styles.screenWrap}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: verticalScale(24),
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.contentCard}>
              <View style={styles.avatarSection}>
                <View
                  style={[
                    styles.avatarCircle,
                    { backgroundColor: colors.white },
                  ]}
                >
                  <Text
                    style={[styles.avatarInitials, { color: colors.primary }]}
                  >
                    {initials}
                  </Text>
                </View>
                {fullName ? (
                  <Text style={styles.avatarName}>{fullName}</Text>
                ) : null}
              </View>

              <View style={styles.formContainerInCard}>
                <CustomInput
                  label="First Name"
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Enter first name"
                  inputContainerStyle={styles.inputContainerStyle}
                />
                <CustomInput
                  label="Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Enter last name"
                  inputContainerStyle={styles.inputContainerStyle}
                />
                <CustomInput
                  label="Email"
                  value={userInfo.email || ''}
                  onChangeText={() => {}}
                  editable={false}
                  inputContainerStyle={styles.inputContainerStyle}
                />
                <CustomInput
                  label="Phone"
                  value={userInfo.phone || ''}
                  onChangeText={() => {}}
                  editable={false}
                  inputContainerStyle={styles.inputContainerStyle}
                />
              </View>

              <View style={styles.updateButtonContainer}>
                <CustomButton title="Update" onPress={handleUpdate} />
              </View>
            </View>
          </ScrollView>
        </View>
      </CustomKeyboardAwareScreen>
    </>
  );
};

export default ProfileScreen;
