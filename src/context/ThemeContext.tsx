
import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(
    typeof window !== 'undefined' 
      ? document.documentElement.classList.contains('dark') 
      : false
  );

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('closet-keeper-theme', 
        document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      );
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
