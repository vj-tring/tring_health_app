

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Appearance} from 'react-native'; // <-- import Appearance API
import {AppColors, darkColors, lightColors} from '../constants/colors';

// Type for theme mode
type ThemeType = 'light' | 'dark';

// Context value type for theme
type ThemeContextType = {
  theme: ThemeType; // Current theme mode
  colors: AppColors; // Color palette for the theme
  setTheme: (theme: ThemeType) => void; // Set theme directly
  toggleTheme: () => void; // Toggle between light and dark
  barStyle: 'default' | 'light-content' | 'dark-content'; // Status bar style
};

// Create the ThemeContext
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the theme context
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

// ThemeProvider component to wrap the app and provide theme context
const ThemeProvider: React.FC<{
  children: React.ReactNode;
  initialTheme?: ThemeType;
}> = ({children, initialTheme}) => {
  // Use device color scheme as default if no initialTheme provided
  const getSystemTheme = () =>
    Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';

  // State to hold the current theme
  const [theme, setTheme] = useState<ThemeType>(
    initialTheme ?? getSystemTheme(),
  );

  // Listen for system theme changes and update theme accordingly
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme === 'dark' ? 'dark' : 'light');
    });
    return () => subscription.remove();
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  // Memoize colors based on current theme
  const colors = useMemo(
    () => (theme === 'dark' ? darkColors : lightColors),
    [theme],
  );

  // Memoize context value to avoid unnecessary re-renders
  const value = useMemo(
    () => ({
      theme,
      colors,
      setTheme,
      toggleTheme,
      barStyle: (theme === 'dark' ? 'light-content' : 'dark-content') as
        | 'default'
        | 'light-content'
        | 'dark-content',
    }),
    [theme, colors],
  );

  // Provide the theme context to children
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
