// src/app/(learn)/learn/hooks/context/page.tsx
'use client';

import { ThemeToggle } from '@/features/learn/hooks/context/theme/ThemeToggle';
import { useTheme } from '@/features/learn/hooks/context/theme/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Copy } from 'lucide-react';
import { toast } from 'sonner'; // 1. Sonner toast import et

export default function ContextPage() {
  const { theme } = useTheme();

  // 2. Kod kopyalama fonksiyonu (sonner toast ile)
  const handleCopyCode = () => {
    const code = `// 📘 useContext - Tema Context Örneği
// 1. Context'i oluştur (TypeScript ile)
import { createContext } from 'react';

type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

// 2. Provider ile uygulamayı sar
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Bileşenlerde kullan
function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}`;

    navigator.clipboard.writeText(code);
    
    // 3. Shadcn/ui style toast göster
    toast.success('Kod panoya kopyalandı!', {
      description: 'useContext tema örneği başarıyla kopyalandı.',
      duration: 3000,
      icon: <Copy className="h-4 w-4" />,
      className: theme === 'dark' ? 'bg-gray-800 text-white' : '',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Başlık */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">useContext - Tema Örneği</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Shadcn/ui + Sonner toast ile gelişmiş bildirimler
        </p>
      </div>

      {/* Ana Demo */}
      <div className="space-y-6">
        <ThemeToggle />
        
        {/* Kod Örneği */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                <h3 className="font-semibold">useContext Yapısı:</h3>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCopyCode}
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                Kodu Kopyala
              </Button>
            </div>
            
            <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
{`// 📘 useContext - Tema Sistemi
// 1. Context oluştur (TypeScript)
const ThemeContext = createContext();

// 2. Provider ile uygulamayı sar
<ThemeContext.Provider value={{ theme, toggleTheme }}>
  <App />
</ThemeContext.Provider>

// 3. Her bileşenden kullan
const { theme, toggleTheme } = useContext(ThemeContext);`}
            </pre>
            
            {/* 4. Toast test butonları */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button 
                variant="default"
                onClick={() => toast('📢 Basit Bildirim', {
                  description: 'Bu shadcn/ui toast bileşeni',
                })}
              >
                Basit Toast
              </Button>
              
              <Button 
                variant="secondary"
                onClick={() => toast.success('✅ Başarılı!', {
                  description: 'İşlem başarıyla tamamlandı',
                  duration: 2000,
                })}
              >
                Başarı Toast
              </Button>
              
              <Button 
                variant="destructive"
                onClick={() => toast.error('❌ Hata!', {
                  description: 'Bir hata oluştu',
                })}
              >
                Hata Toast
              </Button>
            </div>
            
            <div className="mt-4">
              <Button 
                variant={theme === 'dark' ? "secondary" : "default"}
                onClick={() => window.open('/learn/hooks', '_self')}
                className="w-full"
              >
                Hook'lara Dön
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}