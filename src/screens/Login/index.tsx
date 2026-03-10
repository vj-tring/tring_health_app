import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../assets/images/logo.svg';
import { CustomButton } from '../../components';
import CountryFlag from '../../components/CountryFlag';
import {horizontalScale, verticalScale} from '../../constants/fonts';
import SCREEN from '../../navigation/screenNames';
import {showToast} from '../../utils/toastConfig';
// Import styles and custom components
import CustomKeyboardAwareScreen from '../../components/CustomKeyboardView';
import { ButtonLoader } from '../../components/CustomLoader';
import CustomModal from '../../components/CustomModal';
import CustomInput from '../../components/TextInput';
import { strings } from '../../constants/strings';
import countryCodes from '../../data/countryCodes.json';
import { useTheme } from '../../utils/themeProvider';
import AuthBackground from '../../components/AuthBackground';
import CountryPickerModal from './CountryPickerModal';
import createStyles from './styles';

type LoginScreenProps = {
  onLoginSuccess?: () => void;
};

const LoginScreen: React.FC<LoginScreenProps> = ({onLoginSuccess}) => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  // State management for form inputs and loading state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loginWithPhone, setLoginWithPhone] = useState(false);
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(
    countryCodes.find(c => c.isoCode === 'IN'),
  );
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');

  const navigation = useNavigation<any>();

  // In hardcoded mode, subscription loading is always false
  const subscriptionLoading = false;

  // Handler for reset password navigation
  const handleResetPassword = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      navigation.navigate(SCREEN.RESET_PASSWORD);
    }, 100);
  };

  // Effect to update loading state based on subscription status
  useEffect(() => {
    subscriptionLoading ? setLoading(true) : setLoading(false);
  }, [subscriptionLoading]);

  // Keyboard visibility effect
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // Main login handler function
  const handleLogin = async () => {
    Keyboard.dismiss();
    setLoading(true);

    // HARD-CODED LOGIN FLOW (no API)
    const hasBasicInput = loginWithPhone
      ? phone.trim().length > 0 && password.trim().length > 0
      : email.trim().length > 0 && password.trim().length > 0;

    if (!hasBasicInput) {
      setLoading(false);
      showToast({message: 'Please enter required credentials', position: 'top'});
      return;
    }

    // Simulate async login delay
    setTimeout(() => {
      setLoading(false);
      // Let the parent AppContainer switch to the Home navigator
      onLoginSuccess?.();
    }, 800);
  };

  // Determine if login button should be disabled
  const isButtonDisabled =
    loading ||
    subscriptionLoading ||
    !password ||
    (loginWithPhone ? !phone : !email);

  const blueGradient = [colors.primary, '#6366f1'];
  const filteredCountries = countryCodes.filter(
    c =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.dialCode.includes(countrySearch),
  );

  return (
      <>
      <AuthBackground />
    <CustomKeyboardAwareScreen backgroundColor="transparent">
      <View style={styles.mainView}>
        <ScrollView
          style={styles.screenWrap}
          contentContainerStyle={{flexGrow: 1, paddingBottom: verticalScale(24)}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* Logo and header text on background (outside card) */}
          <View
            style={[
              styles.headerOverCard,
              !isKeyboardVisible && {paddingTop: verticalScale(48)},
            ]}>
            <View style={styles.text_logo}>
              <Logo width={72} height={72} />
            </View>
            <Text style={styles.cardTitle}>Welcome to Tring Health</Text>
            <Text style={styles.cardSubtitle}>
              Sign in to your account to continue
            </Text>
          </View>

          {/* White content card */}
          <View style={styles.contentCard}>
            <View style={styles.formContainerInCard}>
              {loginWithPhone ? (
                <>
                  <CustomInput
                    label={strings.login.phone_number_label}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    inputContainerStyle={styles.inputContainerStyle}
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
                </>
              ) : (
                <CustomInput
                  label={strings.login.email}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  inputContainerStyle={styles.inputContainerStyle}
                />
              )}

              <CustomInput
                label={strings.login.password}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                inputContainerStyle={styles.inputContainerStyle}
              />

              <Text
                style={[styles.forgotTxt, {alignSelf: 'flex-end'}]}
                onPress={handleResetPassword}>
                {strings.login.forgot_password}
              </Text>
            </View>

            <View style={styles.buttonContainerInCard}>
              {loading || subscriptionLoading ? (
                <ButtonLoader size="small" />
              ) : (
                <CustomButton
                title={strings.login.sign_in}
                onPress={handleLogin}
                disabled={isButtonDisabled}
              />
              )}

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>
                  {strings.login.alternative_access}
                </Text>
                <View style={styles.dividerLine} />
              </View>

              <CustomButton
                title={
                  loginWithPhone
                    ? strings.login.continue_email
                    : strings.login.continue_phone
                }
                onPress={() => setLoginWithPhone(prev => !prev)}
                buttonStyle={[styles.buttonPhone, styles.secondaryButtonStyle]}
                textStyle={styles.phonetxt}
              />

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>
                  {strings.login.dont_have_account}{' '}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(SCREEN.SIGN_UP as never)
                  }
                  activeOpacity={0.7}>
                  <Text style={styles.signupLink}>
                    {strings.login.sign_up}
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

export default LoginScreen;
