import React, {useEffect, useState, useRef, RefObject} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {CustomButton} from '../../components';
import AuthBackground from '../../components/AuthBackground';
import CustomKeyboardAwareScreen from '../../components/CustomKeyboardView';
import {ButtonLoader} from '../../components/CustomLoader';
import {useNavigation, useRoute} from '@react-navigation/native';
import SCREEN from '../../navigation/screenNames';
import {showCustomToast} from '../../utils/toastConfig';
import {strings} from '../../constants/strings';
import {useTheme} from '../../utils/themeProvider';
import {verticalScale} from '../../constants/fonts';
import createStyles from './styles';

const VerifyOtp = () => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation<any>();
  const route = useRoute();
  const {email} = route.params as {email: string};

  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState<string | null>(null);

  const otpInputs: RefObject<TextInput | null>[] = [
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
  ];

  const handleOtpChange = (text: string, idx: number) => {
    if (idx === 0 && text.length > 1) {
      const newOtp = text.split('').slice(0, 6);
      setOtpDigits(newOtp.concat(Array(6 - newOtp.length).fill('')));
      if (newOtp.length < 6) {
        otpInputs[newOtp.length]?.current?.focus();
      } else {
        otpInputs[5]?.current?.blur();
      }
    } else {
      const newOtp = [...otpDigits];
      newOtp[idx] = text;
      setOtpDigits(newOtp);
      if (text && idx < 5) {
        otpInputs[idx + 1].current?.focus();
      }
    }
  };

  const handleOtpKeyPress = (e: any, idx: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otpDigits[idx] === '') {
        if (idx > 0) {
          otpInputs[idx - 1].current?.focus();
          const newOtp = [...otpDigits];
          newOtp[idx - 1] = '';
          setOtpDigits(newOtp);
        }
      } else {
        const newOtp = [...otpDigits];
        newOtp[idx] = '';
        setOtpDigits(newOtp);
      }
    }
  };

  const combinedOtp = otpDigits.join('');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval!);
  }, [timer]);

  const handleResend = async () => {
    setLoading(true);
    setIsDisabled(true);
    setTimeout(() => {
      setLoading(false);
      setTimer(60);
      setCanResend(false);
      showCustomToast({message: 'OTP resent successfully', position: 'top'});
      setIsDisabled(false);
    }, 800);
  };

  const onSubmit = async () => {
    if (combinedOtp.length !== 6 || otpDigits.some(d => d === '')) {
      setOtpError('OTP is required');
      return;
    }
    setOtpError(null);
    setLoading(true);
    setIsDisabled(true);
    setTimeout(() => {
      setLoading(false);
      setOtpVerified(true);
      showCustomToast({message: 'OTP verified successfully.', position: 'top'});
      setIsDisabled(false);
      navigation.navigate(SCREEN.UPDATE_PASSWORD, {mail: email});
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
              <Text style={styles.headerTitle}>Verify OTP</Text>
              <View style={styles.headerSpacer} />
            </View>

            <View style={styles.contentWrapper}>
            <View style={styles.contentCard}>
              <Text style={styles.instructionText}>
                {strings.verify_otp.verify_email}
              </Text>
              <Text style={styles.emailText}>{email}</Text>

              <View style={styles.otpRow}>
                {otpDigits.map((digit, idx) => (
                  <TextInput
                    key={idx}
                    ref={otpInputs[idx]}
                    value={digit}
                    autoCapitalize="none"
                    onChangeText={text => handleOtpChange(text, idx)}
                    maxLength={idx === 0 ? 6 : 1}
                    style={
                      otpError
                        ? [styles.otpBox, styles.otpBoxError]
                        : styles.otpBox
                    }
                    returnKeyType={idx === 5 ? 'done' : 'next'}
                    onFocus={() => {
                      if (digit) {
                        otpInputs[idx].current?.setNativeProps({
                          selection: {start: 0, end: 1},
                        });
                      }
                    }}
                    onKeyPress={e => handleOtpKeyPress(e, idx)}
                  />
                ))}
              </View>
              {otpError && (
                <Text style={styles.otpErrorText}>{otpError}</Text>
              )}

              <View style={styles.resendContainer}>
                {otpVerified ? (
                  <Text style={[styles.successIcon, {color: colors.primary}]}>
                    ✓
                  </Text>
                ) : (
                  <>
                    {canResend ? (
                      <TouchableOpacity onPress={handleResend}>
                        <Text style={styles.resendLink}>
                          {strings.verify_otp.resend_otp}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.timerRow}>
                        <Text style={styles.timerText}>
                          {strings.verify_otp.resend_in}
                        </Text>
                        <Text style={styles.timerCount}>
                          00:{timer < 10 ? `0${timer}` : timer}
                        </Text>
                      </View>
                    )}
                  </>
                )}
              </View>

              {!otpVerified && (
                <View style={styles.buttonContainer}>
                  {loading ? (
                    <ButtonLoader size="small" />
                  ) : (
                    <CustomButton
                      title={strings.verify_otp.verify}
                      onPress={onSubmit}
                      disabled={
                        loading ||
                        isDisabled ||
                        otpDigits.some(d => d === '')
                      }
                    />
                  )}
                </View>
              )}
            </View>
            </View>
          </ScrollView>
        </View>
      </CustomKeyboardAwareScreen>
    </>
  );
};

export default VerifyOtp;
