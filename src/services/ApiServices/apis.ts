import { DEFAULT_ENVIRONMENT } from '../../utils/constants';

//DEV CONFIG
const DEV_BASE_URL = '';

//PRODUCTION_BASE_URL CONFIG
const PRODUCTION_BASE_URL = '';

const DEMO_BASE_URL = '';


// Get default base URL based on environment
export const getDefaultBaseUrl = (): string => {
  return DEFAULT_ENVIRONMENT === 'dev'
    ? DEV_BASE_URL
    : DEFAULT_ENVIRONMENT === 'production'
      ? PRODUCTION_BASE_URL
      : DEFAULT_ENVIRONMENT === 'demo'
        ? DEMO_BASE_URL
        : PRODUCTION_BASE_URL;
};

// Static BASE_URL for backward compatibility (will use default)
export const BASE_URL =
  DEFAULT_ENVIRONMENT === 'dev'
    ? DEV_BASE_URL
    : DEFAULT_ENVIRONMENT === 'production'
      ? PRODUCTION_BASE_URL
      : DEFAULT_ENVIRONMENT === 'demo'
        ? DEMO_BASE_URL
        : PRODUCTION_BASE_URL;

export const AUTH_SERVICE = {

};
