import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Logo from '../../assets/images/logo.svg';
import AuthBackground from '../../components/AuthBackground';
import {CustomButton} from '../../components';
import CountryFlag from '../../components/CountryFlag';
import CustomKeyboardAwareScreen from '../../components/CustomKeyboardView';
import CustomModal from '../../components/CustomModal';
import CustomInput from '../../components/TextInput';
import {verticalScale} from '../../constants/fonts';
import SCREEN from '../../navigation/screenNames';
import {strings} from '../../constants/strings';
import countryCodes from '../../data/countryCodes.json';
import {useTheme} from '../../utils/themeProvider';
import {showToast} from '../../utils/toastConfig';
import {signupValidationSchema} from '../../utils/validation';
import {useAppDispatch} from '../../hooks/reduxHooks';
import {setUserInfo} from '../../store/features/auth/auth';
import CountryPickerModal from '../Login/CountryPickerModal';
import createStyles from './styles';

const SignupScreen = () => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(
    countryCodes.find(c => c.isoCode === 'IN'),
  );
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredCountries = countryCodes.filter(
    c =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.dialCode.includes(countrySearch),
  );

  const validate = (): boolean => {
    const phoneDigits = phone.replace(/\D/g, '');
    try {
      signupValidationSchema.validateSync(
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phoneDigits,
          password,
          confirmPassword,
        },
        {abortEarly: false},
      );
      setErrors({});
      return true;
    } catch (err: any) {
      const next: Record<string, string> = {};
      if (err.inner) {
        err.inner.forEach((e: {path: string; message: string}) => {
          next[e.path] = e.message;
        });
      }
      setErrors(next);
      return false;
    }
  };

  const handleSignUp = () => {
    Keyboard.dismiss();
    if (!validate()) {
      const firstError = Object.values(errors)[0];
      if (firstError) showToast({message: firstError, position: 'top'});
      return;
    }

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();

    dispatch(
      setUserInfo({
        userInfo: {
          firstName: trimmedFirst,
          lastName: trimmedLast,
          email: email.trim(),
          phone: phone.replace(/\D/g, ''),
        },
      }),
    );

    showToast({message: 'Account created successfully', position: 'top'});
    navigation.navigate(SCREEN.LOGIN_SCREEN as never);
  };

  const isButtonDisabled =
    !firstName.trim() ||
    !lastName.trim() ||
    !email.trim() ||
    !phone.trim() ||
    !password ||
    !confirmPassword;

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
            <View style={[styles.headerOverCard,]}>
              <View style={styles.text_logo}>
                <Logo width={72} height={72} />
              </View>
              <Text style={styles.cardTitle}>{strings.signup.title}</Text>
            </View>

            <View style={styles.contentCard}>
              <View style={styles.formContainerInCard}>
                <CustomInput
                  label={strings.signup.first_name}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder={strings.signup.enter_first_name}
                  inputContainerStyle={styles.inputContainerStyle}
                  errorMessage={errors.firstName}
                />
                <CustomInput
                  label={strings.signup.last_name}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder={strings.signup.enter_last_name}
                  inputContainerStyle={styles.inputContainerStyle}
                  errorMessage={errors.lastName}
                />
                <CustomInput
                  label={strings.signup.email}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholder={strings.signup.enter_email}
                  inputContainerStyle={styles.inputContainerStyle}
                  errorMessage={errors.email}
                />
                <CustomInput
                  label={strings.signup.phone_number}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  placeholder={strings.signup.enter_phone}
                  inputContainerStyle={styles.inputContainerStyle}
                  errorMessage={errors.phone}
                  leftIcon={
                    selectedCountry ? (
                      <TouchableOpacity
                        onPress={() => setCountryModalVisible(true)}
                        style={styles.countryFlagContainer}>
                        <CountryFlag
                          isoCode={selectedCountry.isoCode}
                          size={19}
                          style={styles.countryFlagMargin}
                        />
                        <Text style={[styles.inputText, styles.chevronDown]}>
                          ▼
                        </Text>
                        <Text style={styles.inputText}>
                          {selectedCountry.dialCode}
                        </Text>
                      </TouchableOpacity>
                    ) : null
                  }
                />
                <CustomModal
                  visible={countryModalVisible}
                  onRequestClose={() => setCountryModalVisible(false)}>
                  <CountryPickerModal
                    visible={countryModalVisible}
                    countries={filteredCountries}
                    searchValue={countrySearch}
                    onSearch={setCountrySearch}
                    onSelect={item => {
                      setSelectedCountry(item);
                      setCountryModalVisible(false);
                    }}
                    onRequestClose={() => setCountryModalVisible(false)}
                  />
                </CustomModal>
                <CustomInput
                  label={strings.signup.password}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholder={strings.signup.enter_password}
                  inputContainerStyle={styles.inputContainerStyle}
                  errorMessage={errors.password}
                />
                <CustomInput
                  label={strings.signup.confirm_password}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  placeholder={strings.signup.enter_confirm_password}
                  inputContainerStyle={styles.inputContainerStyle}
                  errorMessage={errors.confirmPassword}
                />
              </View>

              <View style={styles.buttonContainerInCard}>
                <CustomButton
                  title={strings.signup.sign_up}
                  onPress={handleSignUp}
                  disabled={isButtonDisabled}
                />

                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>
                    {strings.signup.already_have_account}{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(SCREEN.LOGIN_SCREEN as never)
                    }
                    activeOpacity={0.7}>
                    <Text style={styles.signupLink}>
                      {strings.signup.sign_in}
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

export default SignupScreen;
