import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import CustomButton from '../CustomButton';
import {fontRegular, fonts, verticalScale} from '../../constants/fonts';
import {strings} from '../../constants/strings';
import {useTheme} from '../../utils/themeProvider';
import {AppColors} from '../../constants/colors';

interface NetworkErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const NetworkErrorMessage: React.FC<NetworkErrorMessageProps> = ({
  message,
  onRetry,
}) => {
  const [disabled, setDisabled] = useState(false);
  const {colors} = useTheme();
  const styles = createStyles(colors);

  const handleRetry = async () => {
    const netState = await NetInfo.fetch();

    if (!netState.isConnected) {
      setDisabled(true); // Disable immediately if no connection
      setTimeout(() => {
        setDisabled(false); // Re-enable after 2 seconds
      }, 1000);
      return;
    }

    // If connected, proceed with retry logic
    onRetry();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <CustomButton
        title={strings.network_error.retry}
        onPress={handleRetry}
        buttonStyle={[
          styles.button,
          disabled && {
            backgroundColor: colors.mildOrange,
          },
        ]}
        disabled={disabled}
      />
    </View>
  );
};

export default NetworkErrorMessage;

const createStyles = (colors: AppColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.lightOrange,
      borderRadius: 14,
      padding: verticalScale(12),
      borderWidth: 1,
      borderColor: colors.primary,
    },
    message: {
      color: colors.primary,
      fontSize: fonts.font14,
      fontFamily: fontRegular,
      lineHeight: verticalScale(24),
      marginBottom: verticalScale(12),
    },
    button: {
      backgroundColor: colors.primary,
    },
  });
