Harika! Todo-app eklemek için mükemmel bir fikir. Mevcut proje yapınıza uygun şekilde nasıl organize edeceğimizi planlayalım. Önce mevcut yapınızı analiz ediyorum:

## 📊 **Mevcut Yapı Analizi**

Projenizde şu pattern'lar var:
1. **Route Groups**: `(dashboard)`, `(learn)`, `(todo-app)` 
2. **Feature-based yapı**: `features/` klasörü altında modüller
3. **Shared components**: `components/shared/`
4. **UI components**: `components/ui/` (ShadCN)
5. **Hooks/Examples**: `features/learn/hooks/examples/`

## 🎯 **Todo-app Yapı Planı**

### 1. **Route Yapısı** (`src/app/`)
```bash
src/app/
└── (todo-app)/
    └── todo-app/
        ├── layout.tsx           # Todo-app için özel layout
        ├── page.tsx             # Ana todo sayfası
        ├── settings/            # Ayarlar sayfası (isteğe bağlı)
        │   └── page.tsx
        └── analytics/           # İstatistikler (isteğe bağlı)
            └── page.tsx
```

### 2. **Feature Modülü** (`src/features/todo/`)
```bash
src/features/todo/
├── types/
│   └── index.ts                # Todo ile ilgili TypeScript tipleri
├── data/
│   └── mock-todos.ts           # Mock todo verileri (örnekler için)
├── hooks/
│   ├── useTodos.ts             # Todo state yönetimi için custom hook
│   ├── useTodoActions.ts       # CRUD işlemleri için hook
│   └── useTodoFilters.ts       # Filtreleme ve sıralama için hook
├── components/
│   ├── TodoList.tsx            # Ana todo listesi bileşeni
│   ├── TodoItem.tsx            # Tekil todo item bileşeni
│   ├── TodoForm.tsx            # Yeni todo ekleme formu
│   ├── TodoFilters.tsx         # Filtreleme bileşeni
│   ├── TodoStats.tsx           # İstatistikler bileşeni
│   └── TodoThemeToggle.tsx     # Tema değiştirici (todo özel)
├── context/
│   ├── TodoContext.tsx         # Todo state için Context
│   └── ThemeContext.tsx        # Tema için Context (mevcut context'i extend edebilir)
└── utils/
    ├── todoHelpers.ts          # Yardımcı fonksiyonlar
    └── localStorage.ts         # LocalStorage işlemleri
```

### 3. **Shared Components** (`src/components/shared/`)
```bash
src/components/shared/
├── todo-header.tsx             # Todo sayfası header'ı (isteğe bağlı)
└── todo-sidebar.tsx            # Todo sayfası sidebar'ı (isteğe bağlı)
```

### 4. **UI Components** (ShadCN'den eklemeler)
Todo-app için gerekli ShadCN bileşenleri:
```bash
# Eksik olabilecek ShadCN bileşenlerini ekleyelim:
npx shadcn@latest add dialog     # Detaylar için
npx shadcn@latest add switch     # Toggle için
npx shadcn@latest add textarea   # Açıklama için
npx shadcn@latest add toast      # Bildirimler için
npx shadcn@latest add form       # Form yönetimi için
npx shadcn@latest add popover    # Filtreler için
```

### 5. **Types** (`src/types/`)
```ts
// src/types/todo.ts (veya features/todo/types/index.ts)
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  tags?: string[];
}

export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'date' | 'priority' | 'title';
```

### 6. **Hooks Yapısı** (Öğrendiğiniz hook'ları kullanarak)
```bash
src/features/todo/hooks/
├── useTodos.ts                 # useState + useEffect (localStorage)
├── useTodoActions.ts           # useCallback + useReducer
├── useTodoFilters.ts           # useMemo + useState
├── useTheme.ts                 # useContext (ThemeContext)
└── useTodoContext.ts           # useContext (TodoContext)
```

## 🏗️ **Kurulum Adımları Sırası**

### **Aşama 1: Route ve Temel Dosyalar**
1. `src/app/(todo-app)/todo-app/layout.tsx` - Layout oluştur
2. `src/app/(todo-app)/todo-app/page.tsx` - Ana sayfa

### **Aşama 2: TypeScript Tipleri**
1. `src/features/todo/types/index.ts` - Todo tiplerini tanımla

### **Aşama 3: Context'ler**
1. `src/features/todo/context/TodoContext.tsx` - Todo state context
2. `src/features/todo/context/ThemeContext.tsx` veya mevcut context'i extend et

### **Aşama 4: Custom Hooks**
1. `src/features/todo/hooks/useTodos.ts` - Temel state yönetimi
2. `src/features/todo/hooks/useTodoActions.ts` - CRUD işlemleri

### **Aşama 5: Bileşenler**
1. `src/features/todo/components/TodoForm.tsx` - Form bileşeni
2. `src/features/todo/components/TodoItem.tsx` - Item bileşeni
3. `src/features/todo/components/TodoList.tsx` - List bileşeni

### **Aşama 6: UI Bileşenleri (ShadCN)**
1. Eksik ShadCN bileşenlerini ekle
2. `src/components/ui/` altında güncelle

### **Aşama 7: Yardımcı Fonksiyonlar**
1. `src/features/todo/utils/todoHelpers.ts`
2. `src/features/todo/utils/localStorage.ts`

### **Aşama 8: Stil ve Tema**
1. `globals.css` güncellemeleri
2. Tema değişimi için toggle bileşeni

## 🔄 **Hook'ların Kullanım Yerleri**

Öğrendiğiniz hook'ları şu şekilde kullanabiliriz:

1. **useState**: Todo listesi, filtreler, form state
2. **useEffect**: LocalStorage sync, ilk yükleme
3. **useContext**: Tema yönetimi, todo context
4. **useReducer**: Kompleks state yönetimi (opsiyonel)
5. **useCallback**: Event handler'lar için
6. **useMemo**: Filtrelenmiş listeler için

## 🎨 **Tema Sistemi Entegrasyonu**

Mevcut `features/learn/hooks/context/theme/` yapısını extend edebiliriz veya yeni bir tema context'i oluşturabiliriz.

## 📱 **Responsive Tasarım**

Mevcut `hooks/use-mobile.ts` hook'unu kullanarak responsive yapabiliriz.

## 💾 **Veri Kalıcılığı**

1. **LocalStorage**: Basit tutmak için
2. **IndexedDB**: Daha gelişmiş (opsiyonel)
3. **Mock API**: Öğrenme için (features/todo/api/)

## 🚀 **İleri Seviye Özellikler (Opsiyonel)**

1. **Drag & Drop**: Todo'ları sıralama
2. **Offline Support**: PWA özellikleri
3. **Backend Entegrasyonu**: Next.js API routes
4. **Real-time Updates**: WebSocket

## 📝 **Özet Yapı Haritası**

```bash
src/
├── app/(todo-app)/todo-app/        # Route
├── features/todo/                  # Todo modülü
├── components/shared/todo-*.tsx    # Paylaşılan bileşenler
├── components/ui/                  # ShadCN bileşenleri (güncellenecek)
├── types/todo.ts                   # Tipler
└── hooks/use-mobile.ts             # Mevcut hook (kullanılacak)
```

Bu planı onaylarsanız, istediğiniz herhangi bir dosyayı adım adım oluşturmaya başlayabiliriz. Hangi aşamadan başlamak istersiniz?
