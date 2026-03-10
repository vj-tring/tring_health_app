

import React, {createContext, useContext, useState} from 'react';

// Define the available theme types
type Theme = 'light' | 'dark';

// Define the shape of the theme context
type ThemeContextType = {
  theme: Theme; // Current theme
  setTheme: (theme: Theme) => void; // Function to set theme directly
  toggleTheme: () => void; // Function to toggle between themes
};

// Create the theme context with undefined as initial value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the theme context
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  // Throw error if hook is used outside of ThemeProvider
  if (!ctx)
    throw new Error('useTheme must be used within a CustomThemeProvider');
  return ctx;
};

// Main CustomThemeProvider component
const CustomThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  // State to manage the current theme
  const [theme, setTheme] = useState<Theme>('light');

  // Function to toggle between light and dark themes
  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  // Provide theme context to children
  return (
    <ThemeContext.Provider value={{theme, setTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
