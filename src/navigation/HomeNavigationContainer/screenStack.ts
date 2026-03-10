

import SCREEN from '../screenNames';
import * as Screens from '../../screens';

// Bottom Tab Screens - Main navigation (appears in bottom tabs)
export const BottomTabStack = [
  // {
  //   name: SCREEN.HOME_SCREEN,
  //   component: Screens.HomeScreen,
  // },
];

// Drawer Screens - Only these appear in drawer menu
export const DrawerStack = [
  // {name: SCREEN.ACCOUNT_INFO, component: Screens.AccountInfoScreen},
  // {
  //   name: SCREEN.PROFILE_SCREEN,
  //   component: Screens.ProfileScreen,
  // },
];

// Stack-only Screens - All other screens that are not in BottomTabStack or DrawerStack
export const StackStack = [

];

// Legacy export for backward compatibility
const HomeScreenStack = BottomTabStack;
export default HomeScreenStack;
