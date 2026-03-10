

import type {ComponentType} from 'react';
import SCREEN from '../screenNames';
import * as Screens from '../../screens';

export type StackScreenConfig = {
  name: string;
  component: ComponentType<any>;
};

// Bottom Tab Screens - Main navigation (appears in bottom tabs)
export const BottomTabStack: StackScreenConfig[] = [
  {name: SCREEN.HOME_SCREEN, component: Screens.HomeScreen},
  {name: SCREEN.STEPS_SCREEN, component: Screens.StepsScreen},
  {name: SCREEN.WATER_SCREEN, component: Screens.WaterScreen},
  {name: SCREEN.MEALS_SCREEN, component: Screens.MealsScreen},
  {name: SCREEN.RANKS_SCREEN, component: Screens.RanksScreen},
];

// Drawer Screens - Only these appear in drawer menu
export const DrawerStack: StackScreenConfig[] = [
  // {name: SCREEN.ACCOUNT_INFO, component: Screens.AccountInfoScreen},
];

// Stack-only Screens - All other screens that are not in BottomTabStack or DrawerStack
export const StackStack: StackScreenConfig[] = [

];

// Legacy export for backward compatibility
const HomeScreenStack = BottomTabStack;
export default HomeScreenStack;
