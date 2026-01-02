// src/features/todo/context/TodoContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Todo, TodoContextType, TodoState, FilterType, SortType, SortDirection } from '../types';
import { createTodo, filterTodos, sortTodos, calculateStats } from '../utils/todoHelpers';

// Başlangıç state'i
const initialState: TodoState = {
  todos: [],
  filter: 'all',
  sortBy: 'createdAt',
  sortDirection: 'desc',
  searchQuery: '',
  isLoading: false,
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: React.ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [state, setState] = useState<TodoState>(initialState);

  // Uygulama ilk yüklendiğinde LocalStorage'dan kayıtlı todo'ları çeker ve state'e set eder.
  useEffect(() => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        const todos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
        }));
        setState(prev => ({ ...prev, todos, isLoading: false }));
      }
    } catch (error) {
      console.error('Todo yükleme hatası:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Todo listesinde herhangi bir değişiklik olduğunda listeyi LocalStorage'a kalıcı olarak kaydeder.
  useEffect(() => {
    if (state.todos.length > 0 || state.todos.length === 0) {
      localStorage.setItem('todos', JSON.stringify(state.todos));
    }
  }, [state.todos]);

  // Yeni bir todo oluşturur ve mevcut listenin en başına ekler.
  const addTodo = useCallback((input: { 
    title: string; 
    description?: string; 
    dueDate?: Date; 
    priority?: 'low' | 'medium' | 'high';
    tags?: string[];
  }) => {
    const newTodo = createTodo(input);
    setState(prev => ({
      ...prev,
      todos: [newTodo, ...prev.todos],
    }));
  }, []);

  // ID'si verilen todo'nun bilgilerini (başlık, açıklama vb.) günceller ve güncelleme zamanını now() yapar.
  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setState(prev => ({
      ...prev,
      todos: prev.todos.map(todo =>
        todo.id === id 
          ? { ...todo, ...updates, updatedAt: new Date() }
          : todo
      ),
    }));
  }, []);

  // ID'si verilen todo'yu listeden tamamen siler.
  const deleteTodo = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      todos: prev.todos.filter(todo => todo.id !== id),
    }));
  }, []);

  // ID'si verilen todo'nun tamamlanma durumunu (completed) tersine çevirir (true ise false, false ise true).
  const toggleTodo = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      todos: prev.todos.map(todo =>
        todo.id === id 
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      ),
    }));
  }, []);

  // Todo listesinin uygulanacak filtre tipini (all, active, completed) günceller.
  const setFilter = useCallback((filter: FilterType) => {
    setState(prev => ({ ...prev, filter }));
  }, []);

  // Todo listesinin sıralama kriterini (tarih, öncelik vb.) ve sıralama yönünü günceller.
  const setSort = useCallback((sortBy: SortType, direction?: SortDirection) => {
    setState(prev => ({
      ...prev,
      sortBy,
      sortDirection: direction || prev.sortDirection,
    }));
  }, []);

  // Arama çubuğuna girilen metni state'e kaydeder.
  const setSearchQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  }, []);

  // İşaretlenmiş (completed) olan tüm todo'ları listeden kaldırır.
  const clearCompleted = useCallback(() => {
    setState(prev => ({
      ...prev,
      todos: prev.todos.filter(todo => !todo.completed),
    }));
  }, []);

  // useMemo: Filtrelenmiş ve sıralanmış todo'ları cache'le
  const filteredAndSortedTodos = useMemo(() => {
    console.log('Todo listesi yeniden hesaplanıyor...');
    console.log('Mevcut state:', state);
    console.log('Mevcut todo sayısı:', state.todos.length);
    console.log('Arama sorgusu:', state.searchQuery);
    console.log('Filtre:', state.filter);
    console.log('Sıralama:', state.sortBy, state.sortDirection);  
    
    
    // 1. Arama sorgusuna göre filtrele
    let filtered = state.todos;
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query) ||
        todo.description?.toLowerCase().includes(query) ||
        todo.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // 2. Duruma göre filtrele (all/active/completed)
    filtered = filterTodos(filtered, state.filter);
    
    // 3. Sırala
    filtered = sortTodos(filtered, state.sortBy, state.sortDirection);
    
    return filtered;
  }, [state.todos, state.filter, state.sortBy, state.sortDirection, state.searchQuery]);

  // useMemo: İstatistikleri cache'le
  // Toplam, aktif ve tamamlanmış todo sayılarını hesaplayıp döndürür.
  const getStats = useCallback(() => {
    return calculateStats(state.todos);
  }, [state.todos]);

  const value: TodoContextType = {
    state: {
      ...state,
      todos: filteredAndSortedTodos,
    },
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    setFilter,
    setSort,
    setSearchQuery,
    clearCompleted,
    getStats,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

// Custom hook: TodoContext'e erişimi sağlar ve context'in bu provider dışında kullanılmasını engeller.
export function useTodos() {
  const context = useContext(TodoContext);
  
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  
  return context;
}