import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {CustomButton} from '../../components';
import AuthBackground from '../../components/AuthBackground';
import CustomKeyboardAwareScreen from '../../components/CustomKeyboardView';
import CustomInput from '../../components/TextInput';
import {ButtonLoader} from '../../components/CustomLoader';
import {useNavigation, useRoute} from '@react-navigation/native';
import SCREEN from '../../navigation/screenNames';
import {showCustomToast} from '../../utils/toastConfig';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {validationSchema} from '../../utils/validation';
import {strings} from '../../constants/strings';
import {verticalScale} from '../../constants/fonts';
import {useTheme} from '../../utils/themeProvider';
import createStyles from './styles';

const UpdatePassword = () => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const route = useRoute();
  const {mail} = route.params as {mail: string};
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: mail,
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async () => {
    setLoading(true);
    setIsDisabled(true);
    setTimeout(() => {
      showCustomToast({
        message: 'Password updated successfully.',
        position: 'top',
      });
      setIsDisabled(false);
      setLoading(false);
      navigation.navigate(SCREEN.UPDATE_SUCCESS);
    }, 800);
  };

  return (
    <>
      <AuthBackground />
      <CustomKeyboardAwareScreen backgroundColor="transparent">
        <View style={styles.mainView}>
          <ScrollView
            style={styles.screenWrap}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: verticalScale(24),
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.headerArea}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}>
                <Text style={styles.backButtonText}>←</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Create new password</Text>
              <View style={styles.headerSpacer} />
            </View>

            <View style={styles.contentWrapper}>
            <View style={styles.contentCard}>
              <Controller
                control={control}
                name="email"
                render={({field: {value}}) => (
                  <CustomInput
                    label={strings.update_password.email}
                    value={value}
                    onChangeText={() => {}}
                    placeholder={strings.update_password.enter_your_email}
                    keyboardType="email-address"
                    errorMessage={errors.email?.message}
                    editable={false}
                    inputContainerStyle={styles.inputContainerStyle}
                  />
                )}
              />

              <Controller
                control={control}
                name="newPassword"
                render={({field: {onChange, value}}) => (
                  <CustomInput
                    label={strings.update_password.password}
                    value={value}
                    onChangeText={onChange}
                    placeholder={strings.update_password.new_password}
                    secureTextEntry
                    errorMessage={errors.newPassword?.message}
                    inputContainerStyle={styles.inputContainerStyle}
                  />
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({field: {onChange, value}}) => (
                  <CustomInput
                    label={strings.update_password.confirm_password}
                    value={value}
                    onChangeText={onChange}
                    placeholder={strings.update_password.confirm_password}
                    secureTextEntry
                    errorMessage={errors.confirmPassword?.message}
                    inputContainerStyle={styles.inputContainerStyle}
                  />
                )}
              />

              <View style={styles.buttonContainerInCard}>
                {loading ? (
                  <ButtonLoader size="small" />
                ) : (
                  <CustomButton
                    title={strings.update_password.submit}
                    onPress={handleSubmit(onSubmit)}
                    disabled={!isValid || loading || isDisabled}
                  />
                )}
              </View>
            </View>
            </View>
          </ScrollView>
        </View>
      </CustomKeyboardAwareScreen>
    </>
  );
};

export default UpdatePassword;
