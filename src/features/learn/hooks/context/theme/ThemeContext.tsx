// src/features/learn/hooks/context/theme/ThemeContext.tsx
'use client';

import { createContext, useContext } from 'react';

// 1. Tema tipini tanımla
type Theme = 'light' | 'dark';

// 2. Context'in tipini tanımla
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// 3. Context'i oluştur (default değerlerle)
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

// 4. Kullanımı kolaylaştırmak için custom hook
export function useTheme() {
  return useContext(ThemeContext);
}

