import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {CustomButton} from '../../components';
import AuthBackground from '../../components/AuthBackground';
import CustomKeyboardAwareScreen from '../../components/CustomKeyboardView';
import CustomInput from '../../components/TextInput';
import {ButtonLoader} from '../../components/CustomLoader';
import {verticalScale} from '../../constants/fonts';
import SCREEN from '../../navigation/screenNames';
import {strings} from '../../constants/strings';
import {showCustomToast} from '../../utils/toastConfig';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {resetPasswordSchema} from '../../utils/validation';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../utils/themeProvider';
import createStyles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ResetPassword = () => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {email: ''},
  });

  const onSubmit = async ({email}: {email: string}) => {
    setLoading(true);
    setIsDisabled(true);
    setTimeout(() => {
      setLoading(false);
      showCustomToast({
        message: 'OTP sent successfully to your email address.',
        position: 'top',
      });
      setIsDisabled(false);
      navigation.navigate(SCREEN.VERIFY_OTP, {email});
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
               <Ionicons name="arrow-back-outline" color="#ff0000" size={20} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Forgot Password</Text>
              <View style={styles.headerSpacer} />
            </View>

            <View style={styles.contentWrapper}>
            <View style={styles.contentCard}>
              <Text style={styles.instructionText}>
                {
                  strings.reset_password
                    .enter_your_account_email_address_we_will_send_an_otp_to_reset_your_password
                }
              </Text>

              <Controller
                control={control}
                name="email"
                render={({field: {onChange, value}}) => (
                  <CustomInput
                    label={strings.reset_password.email}
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    inputContainerStyle={styles.inputContainerStyle}
                    errorMessage={errors.email?.message}
                  />
                )}
              />

              <View style={styles.buttonContainerInCard}>
                {loading ? (
                  <ButtonLoader size="small" />
                ) : (
                  <CustomButton
                    title={strings.reset_password.get_otp}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isDisabled || !isValid || loading}
                  />
                )}
                <TouchableOpacity
                  style={styles.linkContainer}
                  onPress={() => navigation.navigate(SCREEN.LOGIN_SCREEN)}>
                  <Text style={styles.linkText}>
                    {strings.reset_password.return_to_sign_in}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            </View>
          </ScrollView>
        </View>
      </CustomKeyboardAwareScreen>
    </>
  );
};

export default ResetPassword;
