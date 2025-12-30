// src/app/(learn)/learn/hooks/context/layout.tsx
'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/features/learn/hooks/context/theme/ThemeProvider';
import { Toaster } from '@/components/ui/sonner'; // 5. Toaster'ı import et

export default function ContextLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <div className="container mx-auto py-8 px-4">
        {children}
      </div>
      {/* 6. Toaster'ı ekle (tüm sayfada toast'ları gösterir) */}
      <Toaster 
        position="bottom-right"
        expand={false}
        richColors
        closeButton
      />
    </ThemeProvider>
  );
}