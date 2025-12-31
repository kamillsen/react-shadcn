// src/features/todo/components/TodoList.tsx
'use client';

import { useEffect } from 'react';
import { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Inbox, CheckCircle } from 'lucide-react';

export default function TodoList() {
  const { state } = useTodos();
  const { todos, isLoading, filter } = state;

  // Scroll to top when todos change
  useEffect(() => {
    if (todos.length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [todos]);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <Alert className="border-dashed">
        <Inbox className="h-4 w-4" />
        <AlertTitle>Görev bulunamadı</AlertTitle>
        <AlertDescription>
          {filter === 'all' 
            ? 'Henüz görev eklemedin. Hadi ilk görevini ekle!' 
            : filter === 'active'
            ? 'Tamamlanmamış görev yok. Tüm görevler tamamlandı! 🎉'
            : 'Tamamlanmış görev yok. Hadi biraz çalışalım! 💪'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      
      <div className="text-center text-sm text-muted-foreground pt-4">
        <CheckCircle className="h-4 w-4 inline-block mr-2" />
        Toplam {todos.length} görev listeleniyor
      </div>
    </div>
  );
}