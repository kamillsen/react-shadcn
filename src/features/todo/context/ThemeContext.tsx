'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, ThemeContextType } from './theme.types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = 'system' }: ThemeProviderProps) {

  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [isDark, setIsDark] = useState(false);

  // Sistem temasını dinle
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDark(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
      mediaQuery.addEventListener('change', handler);

      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      setIsDark(theme === 'dark');
    }
  }, [theme]);


  // Temayı localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('todo-theme', theme);

    // HTML class'ını güncelle
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme, isDark]);


  // Sayfa yüklendiğinde temayı oku
  useEffect(() => {
    const savedTheme = localStorage.getItem('todo-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);



  
  const value: ThemeContextType = {
    theme,
    setTheme,
    isDark,
  };
              
          // value = theme, setTheme, isDark
  return (
    <ThemeContext.Provider value={value}>   
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook: useContext'i kolay kullanmak için
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}