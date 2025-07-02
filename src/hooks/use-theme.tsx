'use client';

// This custom theme provider is no longer needed.
// Theme management is now handled by the `next-themes` package,
// configured in `src/app/layout.tsx` and `src/components/theme-provider.tsx`.
// You can safely delete this file.

import {createContext, useContext} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function CustomThemeProvider({children}: {children: React.ReactNode}) {
  // This is a placeholder now. `next-themes` handles the state.
  const value: ThemeContextType = {
    theme: 'dark',
    setTheme: () => {},
    themes: ['light', 'dark'],
  };
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider from next-themes');
  }
  return context;
};
