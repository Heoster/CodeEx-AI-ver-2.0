'use client';

import {createContext, useContext, useEffect} from 'react';
import {useLocalStorage} from './use-local-storage';

type Theme =
  | 'zinc'
  | 'slate'
  | 'stone'
  | 'gray'
  | 'neutral'
  | 'red'
  | 'rose'
  | 'orange'
  | 'green'
  | 'blue'
  | 'violet';

const themes: Theme[] = [
  'zinc',
  'slate',
  'stone',
  'gray',
  'neutral',
  'red',
  'rose',
  'orange',
  'green',
  'blue',
  'violet',
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function CustomThemeProvider({children}: {children: React.ReactNode}) {
  const [theme, setTheme] = useLocalStorage<Theme>('color-theme', 'zinc');

  useEffect(() => {
    // Remove all theme classes
    themes.forEach(t => {
      document.documentElement.classList.remove(`theme-${t}`);
    });
    // Add the current theme class
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{theme, setTheme, themes}}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a CustomThemeProvider');
  }
  return context;
};