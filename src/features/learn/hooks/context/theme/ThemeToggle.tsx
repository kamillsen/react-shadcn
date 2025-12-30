// src/features/learn/hooks/context/theme/ThemeToggle.tsx
'use client';

import { useTheme } from './ThemeContext'; // 9. Custom hook'u import et
import { Switch } from '@/components/ui/switch'; // shadcn/ui Switch
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  // 10. Context'ten tema bilgilerini al
  const { theme, toggleTheme } = useTheme();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* 11. Tema ikonu göster */}
            <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
              {theme === 'dark' ? (
                <Moon className="h-5 w-5 text-yellow-300" />
              ) : (
                <Sun className="h-5 w-5 text-orange-500" />
              )}
            </div>
            <div>
              {/* 12. Mevcut temayı göster */}
              <Label className="text-lg font-semibold">
                {theme === 'dark' ? '🌙 Koyu Tema' : '☀️ Açık Tema'}
              </Label>
              <p className="text-sm text-gray-500">
                useContext ile yönetiliyor
              </p>
            </div>
          </div>
          {/* 13. Switch ile tema değiştir */}
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
            aria-label="Tema değiştir"
          />
        </div>
        
        {/* 14. useContext açıklaması */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold mb-2">📌 useContext Kullanıldı:</h3>
          <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
            <li>• <code>ThemeContext</code> ile tema state'i oluşturuldu</li>
            <li>• <code>ThemeProvider</code> ile tüm uygulamaya sağlandı</li>
            <li>• <code>useTheme()</code> hook'u ile her bileşenden erişilebilir</li>
            <li>• Tema değişince tüm UI otomatik güncellenir</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}