import axios, {AxiosError} from 'axios';
import {AUTH_SERVICE, BASE_URL} from './apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ASYNC_STORAGE_KEY} from '../AsyncStorage/keys';
import {showCustomToast} from '../../utils/toastConfig';
import NetInfo from '@react-native-community/netinfo';

export const DEFAULT_HEADERS = {
  Accept: 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  Authorization: '',
  Connection: 'keep-alive',
  'Content-Type': 'application/json',
  Origin: '',
  Referer: '',
};

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: DEFAULT_HEADERS,
});

// Request interceptor
client.interceptors.request.use(
  async function (config) {
    if (config.headers.Authorization === '') {
      const authToken = await AsyncStorage.getItem(
        ASYNC_STORAGE_KEY.AUTH_TOKEN,
      );

      if (authToken) {
        config.headers.Authorization = 'Bearer ' + authToken;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  response => response,
  async function (error) {
    const err = error as AxiosError<{message: string}>;

    // Validate error object structure
    if (!err || typeof err !== 'object') {
      return Promise.reject(error);
    }

    const requestUrl = err.config?.url || '';
    
    const authEndpoints = Object.values(AUTH_SERVICE);
    const isAuthRequest = authEndpoints.some(endpoint =>
      requestUrl.includes(endpoint as string),
    );


    // IMPORTANT: Any HTTP response (even 4xx, 5xx) means the server is reachable
    // Only check domain health for pure network errors (no server response)
    if (err.response?.status) {
      return Promise.reject(err);
    }

    // For network errors (no response), check network status first
    if (!err.response) {
      // Check network connectivity first
      const netInfo = await NetInfo.fetch();
      const isConnected = netInfo.isConnected;
      const isInternetReachable = netInfo.isInternetReachable;

      // If network is not available, don't show service unavailable screen
      if (!isConnected || !isInternetReachable) {
        return Promise.reject(err);
      }
    }

    // Similar handling for server errors
    if (err.response?.status === 500 && isAuthRequest) {
      showCustomToast({
        message: 'Something went wrong. Please try again later.',
        position: 'top',
      });
      return Promise.reject({
        handled: true,
        message: 'Server Error',
        isServerError: true,
      });
    }

    // For all other errors, pass them on unhandled
    return Promise.reject(err);
  },
);

export default client;
