// src/features/learn/hooks/context/theme/ThemeProvider.tsx
'use client';

import { useState, useEffect, ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // 5. State'i başlat (localStorage'dan oku veya 'light' olarak başla)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  // 6. Tema değişince localStorage'a kaydet ve HTML class'ını güncelle
  useEffect(() => {
    // Tema tercihini kaydet
    localStorage.setItem('theme', theme);
    
    // HTML'e class ekle/çıkar (shadcn/ui dark mode için)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]); // theme değişince çalış

  // 7. Tema değiştirme fonksiyonu
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // 8. Context değerini sağla
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}