

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { AppColors } from '../../constants/colors';
import {
  fontMedium,
  fonts,
  verticalScale,
} from '../../constants/fonts';
import {CustomDrawerContent} from '../../components';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import * as Screens from '../../screens';
import { useTheme } from '../../utils/themeProvider';
import SCREEN from '../screenNames';
import { navigationRef } from '../utils';
import { BottomTabStack, DrawerStack, StackStack } from './screenStack';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export let previousRouteName: string | undefined = undefined;
export let currentRouteName: string | undefined = undefined;

export const setPreviousRouteName = (routeName: string | undefined) => {
  previousRouteName = routeName;
};
export const setCurrentRouteName = (routeName: string | undefined) => {
  currentRouteName = routeName;
};

// Call this in NavigationContainer's onStateChange
export function onNavigationStateChange() {
  if (!navigationRef.isReady()) return;

  const route = navigationRef.getCurrentRoute();
  const newRouteName = route?.name;

  if (newRouteName && newRouteName !== currentRouteName) {
    setPreviousRouteName(currentRouteName); // ✅ store old current
    setCurrentRouteName(newRouteName); // ✅ store new current
  }
}

const HomeNavigationContainer = () => {

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        onNavigationStateChange();
      }}
      onReady={() => {}}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={'HomeDrawerNavigator'}
          component={HomeDrawerNavigator}
          key={0}
        />
        {/* Stack screens - NO NETWORK HANDLING */}
        {StackStack.map((screen, index) => (
          <Stack.Screen
            key={index}
            name={screen.name}
            component={screen.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        swipeEnabled: true,
        drawerStyle: {
          width: '100%',
        },
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      {/* Drawer screens - NO NETWORK HANDLING */}
      {DrawerStack.map((screen, index) => (
        <Drawer.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={{headerShown: false}}
        />
      ))}
    </Drawer.Navigator>
  );
};

const {width} = Dimensions.get('window');

const getTabStyles = (colors: AppColors, insets: any) =>
  StyleSheet.create({
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    tabIcon: {
      resizeMode: 'contain',
    },
    activeIconShadow: {
      shadowColor: colors.primary,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.18,
      shadowRadius: 4,
      elevation: 6,
    },
    tabLabel: {
      fontSize: width < 380 ? fonts.font9 : fonts.font11, // smaller on small devices
      fontFamily: fontMedium,
      marginTop: verticalScale(4),
      textAlign: 'center',
      color: colors.normalGray,
      letterSpacing: 0.2,
      flexWrap: 'wrap', // ✅ allow breaking into 2 lines
    },

    tabBar: {
      height: Platform.OS === 'ios' ? 60 + insets.bottom : 80 + insets.bottom,
      paddingBottom: verticalScale(10),
      paddingTop: verticalScale(5),
      borderTopWidth: 0.5,
      borderTopColor: '#E5E5E5',
      backgroundColor: '#fff',
      overflow: 'visible',
    },
    tabBarItem: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
      flex: 1, // ✅ This ensures even space across all tab items
    },
  });

const BottomTabNavigator = () => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getTabStyles(colors, insets);
  const {refreshNetworkStatus} = useNetworkStatus();

  // stable handleRetry so memoization/render-prop usage doesn't change identity unnecessarily
  const handleRetry = React.useCallback(async () => {
    try {
      await refreshNetworkStatus();
    } catch (error) {
      console.warn('Error during retry:', error);
    }
  }, [refreshNetworkStatus]);

  const getIconName = (routeName: string): string => {
    if (routeName === SCREEN.HOME_SCREEN) return 'home';
    if (routeName === SCREEN.WORK_ORDER_SCREEN) return 'document-text';
    if (routeName === SCREEN.PARTS_SCREEN) return 'cube';
    if (routeName === SCREEN.ASSETS_SCREEN) return 'business';
    if (routeName === SCREEN.MORE_DETAILS) return 'ellipsis-horizontal';
    return 'home';
  };

  const renderIcon = (
    routeName: string,
    isActive: boolean,
    size: number,
    color: string,
  ) => {
    const iconColor = isActive ? colors.primary : colors.normalGray;
    return (
      <View style={styles.iconContainer}>
        <Ionicons
          name={getIconName(routeName) as any}
          size={size || 24}
          color={iconColor}
        />
      </View>
    );
  };

  return (
    <>
      <Tab.Navigator
        detachInactiveScreens={false}
        screenListeners={{
          state: e => {
            const tabRoutes = e.data.state.routes;
            const activeTabIndex = e.data.state.index;
            const newRouteName = tabRoutes[activeTabIndex]?.name;
            if (newRouteName !== currentRouteName) {
              setPreviousRouteName(currentRouteName);
              setCurrentRouteName(newRouteName);
            }
          },
        }}
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.normalGray,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabBarItem,
          tabBarLabelPosition: 'below-icon',
          tabBarIcon: ({focused, size, color}) =>
            renderIcon(route.name, focused, size, color),
        })}>
        {BottomTabStack.map((screen, index) => (
          <Tab.Screen
            key={index}
            name={screen.name}
            options={{}}>
            {props => <screen.component {...props} key={index} />}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    </>
  );
};

export default HomeNavigationContainer;
