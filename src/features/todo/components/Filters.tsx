// src/features/todo/components/Filters.tsx
'use client';

import { useTodos } from '../context/TodoContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterType, SortType, SortDirection } from '../types';
import { Search, Filter, ArrowUpDown, Trash2 } from 'lucide-react';

export default function Filters() {
  const { 
    state, 
    setFilter, 
    setSort, 
    setSearchQuery,
    clearCompleted 
  } = useTodos();

  const { filter, sortBy, sortDirection, searchQuery } = state;

  const filterOptions: { value: FilterType; label: string; }[] = [
    { value: 'all', label: 'Tümü' },
    { value: 'active', label: 'Aktif' },
    { value: 'completed', label: 'Tamamlanan' },
  ];

  const sortOptions: { value: SortType; label: string; }[] = [
    { value: 'createdAt', label: 'Oluşturulma Tarihi' },
    { value: 'dueDate', label: 'Son Tarih' },
    { value: 'priority', label: 'Öncelik' },
    { value: 'title', label: 'Başlık' },
  ];

  const handleSortChange = (value: SortType) => {
    setSort(value, sortDirection);
  };

  const toggleSortDirection = () => {
    setSort(sortBy, sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Arama */}
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Görevlerde ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Filtre */}
      <Select value={filter} onValueChange={(value: FilterType) => setFilter(value)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Filtrele" />
        </SelectTrigger>
        <SelectContent>
          {filterOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sıralama */}
      <div className="flex gap-2">
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sırala" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleSortDirection}
          title={sortDirection === 'asc' ? 'Artan' : 'Azalan'}
        >
          {sortDirection === 'asc' ? '↑' : '↓'}
        </Button>
      </div>

      {/* Temizle */}
      <Button
        variant="outline"
        onClick={clearCompleted}
        className="whitespace-nowrap"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Tamamlananları Temizle
      </Button>
    </div>
  );
}