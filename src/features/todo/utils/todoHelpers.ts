// src/features/todo/utils/todoHelpers.ts
import { Todo, FilterType, SortType, SortDirection, TodoStats } from '../types';

// Yeni todo oluşturma yardımcısı
export const createTodo = (input: {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
}): Todo => {
  const now = new Date();
  
  return {
    id: generateId(),
    title: input.title,
    description: input.description,
    completed: false,
    createdAt: now,
    updatedAt: now,
    dueDate: input.dueDate,
    priority: input.priority || 'medium',
    tags: input.tags || [],
  };
};





// ID oluşturma
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Todo'ları filtreleme
export const filterTodos = (todos: Todo[], filter: FilterType): Todo[] => {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    case 'all':
    default:
      return todos;
  }
};

// Todo'ları sıralama
export const sortTodos = (
  todos: Todo[],
  sortBy: SortType,
  direction: SortDirection = 'asc'
): Todo[] => {
  const sorted = [...todos];
  
  sorted.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'createdAt':
        comparison = a.createdAt.getTime() - b.createdAt.getTime();
        break;
      case 'dueDate':
        const dateA = a.dueDate ? a.dueDate.getTime() : Infinity;
        const dateB = b.dueDate ? b.dueDate.getTime() : Infinity;
        comparison = dateA - dateB;
        break;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
    }
    
    return direction === 'asc' ? comparison : -comparison;
  });
  
  return sorted;
};

// İstatistikleri hesaplama
export const calculateStats = (todos: Todo[]): TodoStats => {
  const now = new Date();
  
  return {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
    overdue: todos.filter(t => 
      !t.completed && 
      t.dueDate && 
      t.dueDate < now
    ).length,
    byPriority: {
      low: todos.filter(t => t.priority === 'low').length,
      medium: todos.filter(t => t.priority === 'medium').length,
      high: todos.filter(t => t.priority === 'high').length,
    },
  };
};

// Todo'yu formatlı şekilde göster
export const formatTodoDate = (date: Date): string => {
  return date.toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Priority renkleri
export const getPriorityColor = (priority: 'low' | 'medium' | 'high'): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
  }
};