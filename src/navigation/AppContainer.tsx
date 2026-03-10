import React, {useEffect, useState} from 'react';
import AuthNavigationContainer from './AuthNavigationContainer';
import Splash from '../screens/Splash';

const AppContainer = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simple splash delay to show the logo briefly on startup
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  // For now we always start in the auth stack; login/reset/otp/update flows are hardcoded
  return <AuthNavigationContainer showOnboarding={false} />;
};

export default AppContainer;
