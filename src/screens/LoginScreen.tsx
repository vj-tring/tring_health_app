import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Input, PrimaryButton, ScreenContainer} from '../components';
import {useTheme} from '../theme';

export function LoginScreen() {
  const {colors} = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: wire to auth
  };

  const handleSignUp = () => {
    // TODO: navigate to sign up
  };

  const styles = StyleSheet.create({
    scroll: {
      flex: 1,
    },
    inner: {
      paddingTop: 32,
      paddingBottom: 40,
      paddingHorizontal: 24,
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 40,
      textAlign: 'center',
    },
    form: {
      width: '100%',
      maxWidth: 400,
    },
    button: {
      marginTop: 12,
      width: '100%',
    },
    footer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 24,
      gap: 4,
    },
    footerText: {
      fontSize: 15,
      color: colors.text,
    },
    signUpLink: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.primary,
      textDecorationLine: 'underline',
    },
  });

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.scroll}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.inner}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to your HealthTrack account
          </Text>

          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              showPasswordToggle
            />

            <PrimaryButton
              label="Sign In"
              onPress={handleLogin}
              style={styles.button}
            />
          </View>

          <Pressable onPress={handleSignUp} style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Text style={styles.signUpLink}>Sign up</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
