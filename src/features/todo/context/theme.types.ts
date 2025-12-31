// Tema tiplerini tanımlar (kullanılabilecek tema değerleri)
export type Theme = 'light' | 'dark' | 'system';

// Tema context yapısını tanımlar
export interface ThemeContextType {
    theme: Theme;                 // Şu anki tema değeri
    setTheme: (theme: Theme) => void; // Temayı değiştiren fonksiyon
    isDark: boolean;              // Tema dark mı? (true/false)
}
