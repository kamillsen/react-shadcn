# Type vs Interface --- TypeScript Notları

## Özet

-   **interface**: Nesne biçimleri ve genişletilebilir yapılar için
    idealdir.
-   **type**: Union, tuple, primitive alias ve utility‑based türetilmiş
    tipler için daha esnektir.

------------------------------------------------------------------------

## interface Ne Zaman Kullanılır?

-   Domain modelleri (ör: `Todo`, `User`)
-   React component props
-   Genişletilmesi gereken yapılar
-   Declaration merging gerektiğinde

### Örnek

``` ts
interface Todo {
  id: string;
  title: string;
}

interface Todo {
  completed: boolean;
}
```

Birleşmiş sonuç:

``` ts
const todo: Todo = { id: "1", title: "Test", completed: false };
```

------------------------------------------------------------------------

## type Ne Zaman Kullanılır?

-   Union tipleri
-   Utility types (`Partial`, `Omit`, `Pick`)
-   Tuple ve primitive alias'lar
-   Türetilmiş tipler

### Örnek

``` ts
type Filter = "all" | "active" | "completed";
type CreateTodoInput = Omit<Todo, "id" | "createdAt">;
```

------------------------------------------------------------------------

## Ortak Noktalar

-   Her ikisi de obje şekillerini tanımlayabilir.
-   Çoğu durumda işlevsel fark yoktur --- **önemli olan tutarlılık**tır.

------------------------------------------------------------------------

## Pratik Kural

-   **Model / obje / props → `interface`**
-   **Derived / union / utility‑based tip → `type`**
