// src/features/todo/types/index.ts

// 1. TEMEL TODO TİPİ
// Uygulamadaki tek bir todo öğesinin tam veri modelini temsil eder.
export interface Todo {
  id: string;
  title: string;
  description?: string; // Opsiyonel alan
  // Açıklama metni, doldurulması zorunlu olmayan ekstra bilgi alanıdır.
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date; // Son tarih (opsiyonel)
  // Görevin tamamlanması için hedeflenen isteğe bağlı bitiş tarihini tutar.
  priority: 'low' | 'medium' | 'high';
  tags?: string[]; // Etiketler (opsiyonel)
  // Todo öğesini kategorize etmek için isteğe bağlı etiket listesini saklar.
}

// 2. YENİ TODO OLUŞTURMAK İÇİN (description hariç)
// Yeni bir todo oluştururken formdan/istemciden beklenen alanları tanımlar.
export type CreateTodoInput = Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'> & {
  completed?: boolean; // Varsayılan false olacak
  // Yeni todo eklerken tamamlanma durumunu isteğe bağlı olarak belirlemeye izin verir.
};

// 3. TODO GÜNCELLEME İÇİN (sadece değişecek alanlar)
// Mevcut bir todo üzerinde kısmi (patch) güncelleme yapılmasını sağlayan girdi tipidir.
export type UpdateTodoInput = Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>;

// 4. FİLTRELEME TİPLERİ
// Liste ekranında görevleri filtrelerken ve sıralarken kullanılacak değerleri tip güvenli yapar.
export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'createdAt' | 'dueDate' | 'priority' | 'title';
export type SortDirection = 'asc' | 'desc';

// 5. TODO İSTATİSTİKLERİ
// Todo listesinden türetilen özet verileri (istatistikleri) temsil eder.
export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  overdue: number; // Son tarihi geçmiş
  // Vadesi geçtiği halde tamamlanmamış görevlerin toplam sayısını gösterir.
  byPriority: {
    low: number;
    medium: number;
    high: number;
  };
}

// 6. TODO CONTEXT STATE'İ
// Uygulama genelinde paylaşılan todo durumunun (state) yapısını tanımlar.
export interface TodoState {
  todos: Todo[];
  filter: FilterType;
  sortBy: SortType;
  sortDirection: SortDirection;
  searchQuery: string;
  isLoading: boolean;
}

// 7. TODO ACTIONS (useReducer için - opsiyonel)
// Todo state'ini yönetmek için kullanılabilecek tüm reducer aksiyonlarını tek bir tipte toplar.
export type TodoAction =
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'UPDATE_TODO'; payload: { id: string; updates: UpdateTodoInput } }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'SET_SORT'; payload: { sortBy: SortType; direction?: SortDirection } }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

// 8. TODO CONTEXT TYPE
// State’i ve todo üzerinde işlem yapan fonksiyonları dışarı sağlayan context arayüzünü tanımlar.
export interface TodoContextType {
  state: TodoState;
  addTodo: (todo: CreateTodoInput) => void;
  updateTodo: (id: string, updates: UpdateTodoInput) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setFilter: (filter: FilterType) => void;
  setSort: (sortBy: SortType, direction?: SortDirection) => void;
  setSearchQuery: (query: string) => void;
  clearCompleted: () => void;
  getStats: () => TodoStats;
}
