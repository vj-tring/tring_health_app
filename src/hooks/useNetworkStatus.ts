

import {useState, useEffect, useCallback} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

interface UseNetworkStatusReturn {
  isConnected: boolean | null;
  connectionType: string | null;
  isInternetReachable: boolean | null;
  refreshNetworkStatus: () => Promise<void>;
}

export const useNetworkStatus = (): UseNetworkStatusReturn => {
  const [networkState, setNetworkState] = useState<NetInfoState | null>(null);

  const refreshNetworkStatus = useCallback(async () => {
    try {
      const state = await NetInfo.fetch();
      setNetworkState(state);
    } catch (error) {
      console.warn('Error refreshing network status:', error);
    }
  }, []);

  useEffect(() => {
    // Get initial network state
    const getInitialState = async () => {
      const state = await NetInfo.fetch();
      setNetworkState(state);
    };

    getInitialState();

    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkState(state);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    isConnected: networkState?.isConnected ?? null,
    connectionType: networkState?.type ?? null,
    isInternetReachable: networkState?.isInternetReachable ?? null,
    refreshNetworkStatus,
  };
};
