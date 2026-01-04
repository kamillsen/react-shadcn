// src/features/todo/components/TodoForm.tsx
'use client';

import { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Plus, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function TodoForm() {
  // Todo eklemek için context'ten addTodo fonksiyonunu alıyoruz
  const { addTodo } = useTodos();
  // Görev başlığı için state
  const [title, setTitle] = useState('');
  // Görev açıklaması için state
  const [description, setDescription] = useState('');
  // Öncelik seviyesi için state (düşük, orta, yüksek)
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  // Son tarih için state
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  // Eklenen etiketlerin listesi için state
  const [tags, setTags] = useState<string[]>([]);
  // Etiket input alanındaki geçici değer için state
  const [tagInput, setTagInput] = useState('');

  // Form gönderildiğinde çalışan fonksiyon
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Başlık boşsa işlemi durdur
    if (!title.trim()) return;

    // Yeni görevi ekle
    addTodo({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      dueDate,
      tags: tags.length > 0 ? tags : undefined,
    });

    // Formu temizle
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate(undefined);
    setTags([]);
    setTagInput('');
  };

  // Etiket ekleme fonksiyonu
  const handleAddTag = () => {
    // Etiket boş değilse ve daha önce eklenmemişse ekle
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  // Etiket silme fonksiyonu
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Klavye tuşlarına basıldığında çalışan fonksiyon (Enter ile etiket ekleme)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    // Ana form container'ı
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg bg-card">
      {/* Görev başlığı input alanı */}
      <div className="space-y-2">
        <Label htmlFor="title">Görev Başlığı *</Label>
        <Input
          id="title"
          placeholder="Ne yapmak istiyorsun?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg"
        />
      </div>

      {/* Görev açıklaması textarea alanı */}
      <div className="space-y-2">
        <Label htmlFor="description">Açıklama (İsteğe Bağlı)</Label>
        <Textarea
          id="description"
          placeholder="Detayları buraya yaz..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      {/* Öncelik ve son tarih alanları (yan yana) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Öncelik seçimi dropdown'ı */}
        <div className="space-y-2">
          <Label>Öncelik</Label>
          <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Öncelik seç" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Düşük 🟢</SelectItem>
              <SelectItem value="medium">Orta 🟡</SelectItem>
              <SelectItem value="high">Yüksek 🔴</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Son tarih seçimi (takvim popover'ı) */}
        <div className="space-y-2">
          <Label>Son Tarih (İsteğe Bağlı)</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, "dd.MM.yyyy") : "Tarih seç"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Etiketler bölümü */}
      <div className="space-y-2">
        <Label>Etiketler (İsteğe Bağlı)</Label>
        {/* Etiket ekleme input ve buton */}
        <div className="flex gap-2">
          <Input
            placeholder="Etiket ekle (Enter'a bas)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button type="button" onClick={handleAddTag} variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Eklenen etiketlerin gösterildiği alan */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
              >
                {tag}
                {/* Etiket silme butonu */}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form gönderme butonu */}
      <Button type="submit" className="w-full" size="lg">
        <Plus className="mr-2 h-4 w-4" />
        Görev Ekle
      </Button>
    </form>
  );
}