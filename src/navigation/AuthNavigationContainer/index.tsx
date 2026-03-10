

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SCREEN from '../screenNames';
import {navigationRef} from '../utils';
import AuthScreenStack from './screenStack';

type AuthNavigationStackProps = {
  showOnboarding?: boolean;
  onLoginSuccess?: () => void;
};

const AuthNavigationStack: React.FC<AuthNavigationStackProps> = ({
  showOnboarding,
  onLoginSuccess,
}) => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={state => {}}
      onReady={() => {}}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={SCREEN.LOGIN_SCREEN}>
        {AuthScreenStack.map((screen, index) => {
          const ScreenComponent = screen.component as React.ComponentType<any>;
          return (
            <Stack.Screen
              name={screen.name}
              key={index}
              options={{
                gestureEnabled: true,
              }}>
              {props => (
                <ScreenComponent {...props} onLoginSuccess={onLoginSuccess} />
              )}
            </Stack.Screen>
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigationStack;
