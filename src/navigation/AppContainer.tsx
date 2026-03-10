import React, {useEffect, useState} from 'react';
import AuthNavigationContainer from './AuthNavigationContainer';
import HomeNavigationContainer from './HomeNavigationContainer';
import Splash from '../screens/Splash';
import {
  getAyncStorageData,
  storeAyncStorageData,
} from '../services/AsyncStorage';
import {ASYNC_STORAGE_KEY} from '../services/AsyncStorage/keys';

const AppContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On app start, read login state from AsyncStorage
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const storedFlag = await getAyncStorageData(
          ASYNC_STORAGE_KEY.USER_LOGGED_IN,
        );
        setIsLoggedIn(storedFlag === 'true');
      } finally {
        setIsLoading(false);
      }
    };

    bootstrap();
  }, []);

  const handleLoginSuccess = async () => {
    try {
      await storeAyncStorageData(ASYNC_STORAGE_KEY.USER_LOGGED_IN, 'true');
      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(true);
    }
  };

  if (isLoading) {
    return <Splash />;
  }

  if (isLoggedIn) {
    return <HomeNavigationContainer />;
  }

  return (
    <AuthNavigationContainer
      showOnboarding={false}
      onLoginSuccess={handleLoginSuccess}
    />
  );
};

export default AppContainer;
