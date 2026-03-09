import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useTheme} from '../../theme';

type Props = TextInputProps & {
  label?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  /** When true, shows an eye icon to toggle password visibility */
  showPasswordToggle?: boolean;
};

export const Input: React.FC<Props> = ({
  label,
  containerStyle,
  style,
  showPasswordToggle = false,
  secureTextEntry,
  ...rest
}) => {
  const {colors} = useTheme();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isSecure = showPasswordToggle ? !passwordVisible : secureTextEntry;

  const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
      marginBottom: 8,
    },
    inputWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.inputBorder,
      borderRadius: 12,
      backgroundColor: colors.inputBackground,
    },
    input: {
      flex: 1,
      paddingVertical: 14,
      paddingHorizontal: 16,
      fontSize: 16,
      color: colors.text,
      backgroundColor: 'transparent',
    },
    eyeButton: {
      paddingHorizontal: 12,
      paddingVertical: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.inputWrap}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={isSecure}
          {...rest}
        />
        {showPasswordToggle ? (
          <Pressable
            style={styles.eyeButton}
            onPress={() => setPasswordVisible(prev => !prev)}
            accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
            accessibilityRole="button">
            {/* Eye open = show password (when masked); Eye off = hide password (when visible) */}
            <Icon
              name={passwordVisible ? 'visibility-off' : 'visibility'}
              size={24}
              color={colors.textSecondary}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};
