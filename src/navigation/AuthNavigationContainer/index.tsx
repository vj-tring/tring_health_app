

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SCREEN from '../screenNames';
import { navigationRef } from '../utils';
import AuthScreenStack from './screenStack';

type AuthNavigationStackProps = {
  showOnboarding?: boolean;
};

const AuthNavigationStack: React.FC<AuthNavigationStackProps> = ({
  showOnboarding,
}) => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={state => {}}
      onReady={() => {}}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={
          SCREEN.LOGIN_SCREEN
        }>
        {AuthScreenStack.map((screen, index) => {
          return (
            <Stack.Screen
              name={screen.name}
              component={screen.component}
              key={index}
              options={{
                gestureEnabled: true,
              }}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigationStack;
