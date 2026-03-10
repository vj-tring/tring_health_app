import React from 'react';
import {Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomEmptyState from '../CustomEmptyState';
import {useTheme} from '../../utils/themeProvider';
import {strings} from '../../constants/strings';

interface CustomErrorStateProps {
  error: any;
  onRetry?: () => void;
}

const CustomErrorState: React.FC<CustomErrorStateProps> = ({
  error,
  onRetry,
}) => {
  const {colors} = useTheme();
  const errorString = String(error || '');
  const statusCodeMatch = errorString.match(/status code (\d+)/i);
  const iconProps = {size: 60, color: colors.gray};

  if (statusCodeMatch) {
    const statusCode = parseInt(statusCodeMatch[1]);
    if (statusCode >= 500) {
      return (
        <CustomEmptyState
          icon={<Ionicons name="server-outline" {...iconProps} />}
          title={strings.emptyState.server_error}
          description={strings.emptyState.server_error_desc}
          style={{marginVertical: 50}}
          onRetry={onRetry}
        />
      );
    }
    if (statusCode >= 400 && statusCode < 500) {
      return (
        <CustomEmptyState
          icon={<Ionicons name="alert-circle-outline" {...iconProps} />}
          title={strings.emptyState.fetch_error}
          style={{marginVertical: 50}}
          onRetry={onRetry}
        />
      );
    }
  }

  if (
    errorString.toLowerCase().includes('network') ||
    errorString.toLowerCase().includes('connection') ||
    errorString.toLowerCase().includes('timeout') ||
    errorString.toLowerCase().includes('fetch')
  ) {
    return (
      <CustomEmptyState
        icon={<Ionicons name="cloud-offline-outline" {...iconProps} />}
        title={strings.emptyState.network_error}
        description={strings.emptyState.network_error_desc}
        style={{marginVertical: 50}}
        onRetry={onRetry}
      />
    );
  }

  return (
    <CustomEmptyState
      icon={<Ionicons name="alert-circle-outline" {...iconProps} />}
      description={errorString || strings.emptyState.load_failed}
      onRetry={onRetry}
    />
  );
};

export default CustomErrorState;
