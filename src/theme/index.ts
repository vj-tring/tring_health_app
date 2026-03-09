import {useColorScheme} from 'react-native';

import {darkColors, lightColors, type ColorPalette} from './colors';

export type ColorScheme = 'light' | 'dark';

export interface Theme {
  colors: ColorPalette;
  isDark: boolean;
  scheme: ColorScheme;
}

export function getTheme(scheme: ColorScheme | null | undefined): Theme {
  const isDark = scheme === 'dark';
  return {
    colors: isDark ? darkColors : lightColors,
    isDark,
    scheme: isDark ? 'dark' : 'light',
  };
}

export function useTheme(): Theme {
  const scheme = useColorScheme();
  return getTheme(scheme);
}

export {lightColors, darkColors};
export type {ColorPalette} from './colors';
