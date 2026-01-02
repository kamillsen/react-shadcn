// src/features/todo/components/TodoItem.tsx
'use client';

import { useState } from 'react';
import { Todo } from '../types';
import { useTodos } from '../context/TodoContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { EditDialog } from './EditDialog';
import { getPriorityColor, formatTodoDate } from '../utils/todoHelpers';
import {
  CheckCircle2,
  Circle,
  MoreVertical,
  Trash2,
  Edit,
  Calendar,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // Silme dialogu gösteren
  const [showEditDialog, setShowEditDialog] = useState(false); // Düzenleme dialogu gösteren

  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className={cn(
        "group flex items-center gap-4 p-4 border rounded-lg transition-all hover:bg-accent/50",
        todo.completed && "opacity-60 bg-muted/30"
      )}>
        {/* Checkbox */}
        <div className="flex-shrink-0">
          <button
            onClick={handleToggle}
            className={cn(
              "flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors",
              todo.completed
                ? "bg-primary border-primary text-primary-foreground"
                : "border-muted-foreground/30 hover:border-primary"
            )}
          >
            {todo.completed ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <Circle className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* İçerik */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={cn(
              "font-medium text-lg truncate",
              todo.completed && "line-through text-muted-foreground"
            )}>
              {todo.title}
            </h3>
            
            {/* Priority badge */}
            <Badge 
              variant="secondary" 
              className={cn(
                "text-xs",
                getPriorityColor(todo.priority)
              )}
            >
              {todo.priority === 'high' && '🔥 '}
              {todo.priority === 'medium' && '⚡ '}
              {todo.priority === 'low' && '🌱 '}
              {todo.priority === 'high' ? 'Yüksek' : 
               todo.priority === 'medium' ? 'Orta' : 'Düşük'}
            </Badge>

            {/* Overdue badge */}
            {isOverdue && (
              <Badge variant="destructive" className="text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                Son tarih geçti
              </Badge>
            )}
          </div>

          {todo.description && (
            <p className={cn(
              "text-sm text-muted-foreground mb-2",
              todo.completed && "line-through"
            )}>
              {todo.description}
            </p>
          )}

          {/* Meta bilgiler */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {todo.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> 
                <span className={isOverdue ? "text-destructive font-medium" : ""}>
                  {formatTodoDate(todo.dueDate)}
                </span>
              </div>
            )}

            {todo.tags && todo.tags.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                <Tag className="h-3 w-3" />
                {todo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div>
              Oluşturulma: {formatTodoDate(todo.createdAt)}
            </div>
          </div>
        </div>

        {/* Action menu */}
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Düzenle
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Görevi silmek istiyor musun?</AlertDialogTitle>
            <AlertDialogDescription>
              "{todo.title}" görevi silinecek. Bu işlem geri alınamaz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Dialog */}
      <EditDialog
        todo={todo}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSave={(updates) => updateTodo(todo.id, updates)}
      />
    </>
  );
}