// src/app/(todo-app)/todo-app/page.tsx
'use client';

import { useState } from 'react';
import { useTheme } from '@/features/learn/hooks/context/theme/ThemeContext';
import TodoForm from '@/features/todo/components/TodoForm';
import TodoList from '@/features/todo/components/TodoList';
import TodoStats from '@/features/todo/components/TodoStats';
import Filters from '@/features/todo/components/Filters';
import ThemeToggle from '@/features/todo/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sun, Moon } from 'lucide-react';

export default function TodoAppPage() {
  const { theme, toggleTheme } = useTheme();
  const [showForm, setShowForm] = useState(true);

  return (
    <div className="space-y-6">
      {/* Başlık ve Tema */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Todo Uygulaması</h1>
          <p className="text-muted-foreground">
            React hook'larını öğrendiğin todo uygulaması. 
            {theme === 'dark' ? ' 🌙 Karanlık mod aktif' : ' ☀️ Aydınlık mod aktif'}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            title="Temayı değiştir"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Formu Gizle' : 'Formu Göster'}
          </Button>
        </div>
      </div>

      <Separator />

      {/* İstatistikler */}
      <TodoStats />

      {/* Filtreler */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
        <Filters />
      </div>

      {/* Todo Formu */}
      {showForm && (
        <>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Yeni Görev Ekle</h2>
            <TodoForm />
          </div>
          <Separator />
        </>
      )}

      {/* Todo Listesi */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Görevlerim</h2>
        <TodoList />
      </div>

      {/* Hook Bilgilendirmesi */}
      <div className="mt-8 p-4 border rounded-lg bg-muted/30">
        <h3 className="font-semibold mb-2">📚 Kullanılan React Hook'ları:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          <div className="p-2 bg-background rounded">useState - Form state'i</div>
          <div className="p-2 bg-background rounded">useEffect - LocalStorage</div>
          <div className="p-2 bg-background rounded">useContext - Tema & Todo state</div>
          <div className="p-2 bg-background rounded">useCallback - Fonksiyon cache</div>
          <div className="p-2 bg-background rounded">useMemo - Filtreleme cache</div>
          <div className="p-2 bg-background rounded">useReducer - Complex state</div>
        </div>
      </div>
    </div>
  );
}