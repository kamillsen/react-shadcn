// src/features/todo/components/EditDialog.tsx
'use client';

import { useState, useEffect } from 'react';
import { Todo, UpdateTodoInput } from '../types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
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
import { Switch } from '@/components/ui/switch';

interface EditDialogProps {
  todo: Todo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updates: UpdateTodoInput) => void;
}

export function EditDialog({ todo, open, onOpenChange, onSave }: EditDialogProps) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [priority, setPriority] = useState(todo.priority);
  const [completed, setCompleted] = useState(todo.completed);

  // Form açıldığında mevcut değerleri yükle
  useEffect(() => {
    if (open) {
      setTitle(todo.title);
      setDescription(todo.description || '');
      setPriority(todo.priority);
      setCompleted(todo.completed);
    }
  }, [open, todo]);

  const handleSave = () => {
    const updates: UpdateTodoInput = {
      title: title !== todo.title ? title : undefined,
      description: description !== todo.description ? description : undefined,
      priority: priority !== todo.priority ? priority : undefined,
      completed: completed !== todo.completed ? completed : undefined,
    };

    // Sadece değişen alanları gönder
    const hasChanges = Object.values(updates).some(value => value !== undefined);
    if (hasChanges) {
      onSave(updates);
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Görevi Düzenle</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Başlık</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Açıklama</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-priority">Öncelik</Label>
            <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Öncelik seç" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Düşük</SelectItem>
                <SelectItem value="medium">Orta</SelectItem>
                <SelectItem value="high">Yüksek</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="edit-completed">Tamamlandı</Label>
            <Switch
              id="edit-completed"
              checked={completed}
              onCheckedChange={setCompleted}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button onClick={handleSave}>
            Kaydet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}