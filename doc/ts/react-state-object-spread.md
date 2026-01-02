# 🎯 React State Güncelleme ve Object Spread Mantığı

## 📌 **TEMEL KURAL: `{ ...prev, key: value }`**

### **1. Spread Operator (`...`) ile Kopyalama**
```javascript
const prev = { a: 1, b: 2, c: 3 };

// TÜM özellikleri kopyala:
const newObj = { ...prev };
// newObj = { a: 1, b: 2, c: 3 } ← TAM KOPYA
```

### **2. Güncelleme Mantığı: SONDAKİ KAZANIR!**
```javascript
const prev = { a: 1, b: 2, c: 3 };

{ ...prev, b: 99 }        // { a: 1, b: 99, c: 3 } ← b değişti
{ b: 99, ...prev }        // { a: 1, b: 2, c: 3 }  ← prev kazandı!
{ ...prev, b: 99, c: 100 } // { a: 1, b: 99, c: 100 } ← ikisi de değişti
```

**KURAL:** Sağdaki (son yazılan) değer, soldaki değeri **EZER**!

---

## 🔄 **REACT STATE GÜNCELLEME ÖRNEKLERİ**

### **Örnek 1: `setFilter` Fonksiyonu**
```typescript
const setFilter = useCallback((filter: FilterType) => {
  setState(prev => ({ ...prev, filter }));
}, []);
```

**Açılımı:**
```typescript
// setFilter('active') çağrılırsa:

// 1. Başlangıç state'i:
prev = {
  todos: [...],
  filter: 'all',      // ← Şu anki değer
  sortBy: 'createdAt',
  searchQuery: ''
};

// 2. setState işlemi:
setState(prev => ({
  ...prev,            // 👈 TÜM alanlar kopyalanır
  filter: 'active'    // 👈 filter DEĞİŞİR (son yazılan kazanır)
}));

// 3. Sonuç:
{
  todos: [...],       // 👈 AYNI (kopyalandı)
  filter: 'active',   // 👈 DEĞİŞTİ! (eski 'all' ezildi)
  sortBy: 'createdAt', // 👈 AYNI (kopyalandı)
  searchQuery: ''     // 👈 AYNI (kopyalandı)
}
```

### **Örnek 2: `setSort` Fonksiyonu**
```typescript
const setSort = useCallback((sortBy: SortType, direction?: SortDirection) => {
  setState(prev => ({
    ...prev,
    sortBy,
    sortDirection: direction || prev.sortDirection,
  }));
}, []);
```

**Açılımı:**
```typescript
// setSort('priority', 'desc') çağrılırsa:

// 1. Başlangıç:
prev = {
  sortBy: 'createdAt',
  sortDirection: 'asc'
};

// 2. setState:
setState(prev => ({
  ...prev,                    // TÜM alanlar
  sortBy: 'priority',         // sortBy DEĞİŞTİ
  sortDirection: 'desc'       // sortDirection DEĞİŞTİ
}));

// 3. Sonuç:
{
  sortBy: 'priority',     // 👈 DEĞİŞTİ
  sortDirection: 'desc'   // 👈 DEĞİŞTİ
}
```

---

## 🎯 **SHORTHAND PROPERTY (KISA YAZIM) MANTIĞI**

### **Normal vs Shorthand Karşılaştırması:**
```javascript
const filter = 'active';

// ❌ UZUN YAZIM (redundant - gereksiz tekrar):
{ filter: filter }
// key: value (ikisi de aynı kelime)

// ✅ KISA YAZIM (shorthand - JavaScript otomatik yapar):
{ filter }
// JavaScript: "filter değişkeni var, onu kullan"
// Otomatik çevirir: { filter: filter }
```

### **Shorthand ÇALIŞMA KOŞULLARI:**
```javascript
// ÇALIŞIR (isimler AYNI):
const filter = 'active';
{ filter }  // → { filter: 'active' }

// ÇALIŞMAZ (isimler FARKLI):
const query = 'react';
{ searchQuery }  // ❌ HATA: searchQuery değişkeni yok!
{ searchQuery: query }  // ✅ Doğrusu bu
```

---

## 🧩 **TODO CONTEXT'TEKİ FONKSİYONLAR**

### **Shorthand KULLANANLAR:**
```typescript
// 1. setFilter - parametre ve key AYNI isimde
const setFilter = useCallback((filter: FilterType) => {
  setState(prev => ({ ...prev, filter })); // ✅ shorthand
}, []);

// 2. setSort (kısmen) - sortBy AYNI
const setSort = useCallback((sortBy: SortType, direction?: SortDirection) => {
  setState(prev => ({
    ...prev,
    sortBy, // ✅ shorthand (sortBy: sortBy)
    sortDirection: direction || prev.sortDirection // ❌ normal
  }));
}, []);
```

### **Shorthand KULLANAMAYANLAR:**
```typescript
// 1. setSearchQuery - parametre: query, key: searchQuery
const setSearchQuery = useCallback((query: string) => {
  setState(prev => ({ ...prev, searchQuery: query })); // ❌ normal
}, []);

// 2. addTodo - parametre kompleks obje
const addTodo = useCallback((input: { ... }) => {
  setState(prev => ({
    ...prev,
    todos: [newTodo, ...prev.todos] // ❌ input ≠ todos
  }));
}, []);
```

---

## 🔍 **`||` (OR OPERATÖRÜ) MANTIĞI**

### **`setSort` Fonksiyonundaki Kullanım:**
```typescript
sortDirection: direction || prev.sortDirection
```

### **Çalışma Mantığı:**
```javascript
// direction VERİLDİYSE (truthy):
'direction' || 'prev' → 'direction' kazanır

// direction VERİLMEDİYSE (falsy - undefined):
undefined || 'prev' → 'prev' kazanır
```

### **Örnek Senaryolar:**
```typescript
// Senaryo 1: Yön belirtilmiş
setSort('priority', 'desc');
// direction = 'desc' (truthy)
// 'desc' || 'asc' → 'desc' (sol taraf alınır)
// sortDirection: 'desc'

// Senaryo 2: Yön belirtilmemiş  
setSort('title');
// direction = undefined (falsy)
// undefined || 'asc' → 'asc' (sağ taraf alınır)
// sortDirection: 'asc' (önceki değer korunur)
```

---

## 🎮 **PRATİK BENZETMELER**

### **Benzetme 1: Excel Tablosu Güncelleme**
```
EXCEL TABLOSU (prev state):
| Alan          | Değer       |
|---------------|-------------|
| todos         | [...]       |
| filter        | 'all'       |
| sortBy        | 'createdAt' |
| sortDirection | 'asc'       |

GÜNCELLEME: setFilter('active')
Yeni satır: filter: 'active'

SONUÇ TABLO:
| Alan          | Değer       | İŞLEM        |
|---------------|-------------|--------------|
| todos         | [...]       | KOPYALANDI   |
| filter        | 'active'    | 👈 GÜNCELLENDİ! |
| sortBy        | 'createdAt' | KOPYALANDI   |
| sortDirection | 'asc'       | KOPYALANDI   |
```

### **Benzetme 2: Kıyafet Katlama**
```javascript
// Önceki state = Üzerindeki kıyafetler
const prevOutfit = {
  shirt: 'mavi',
  pants: 'siyah', 
  shoes: 'spor'
};

// Yeni state = Üstüne yeni kıyafetler giy
const newOutfit = {
  ...prevOutfit,      // 👈 Altındaki kıyafetler
  shirt: 'kırmızı',   // 👈 Üstüne yeni gömlek
  jacket: 'deri'      // 👈 Yeni ceket ekle
};

// Sonuç: Alt kıyafetler korundu, üsttekiler değişti/eklendi
```

---

## 📝 **ÖZET KURALLAR**

### **Kural 1: Spread ile Kopyalama**
```javascript
{ ...prev } // Tüm özellikleri kopyalar
```

### **Kural 2: Güncelleme Sırası**
```javascript
{ ...prev, key: newValue }
// Son yazılan DEĞER, öncekini EZER
```

### **Kural 3: Shorthand Property**
```javascript
const name = 'Ahmet';
{ name } = { name: name } // AYNI isimdeyse
```

### **Kural 4: OR Operatörü Default Değer**
```javascript
value || defaultValue
// value varsa onu kullan, yoksa default'u kullan
```

---

## ✅ **PRATİK ÖRNEK: TÜM KURALLAR BİR ARADA**

```typescript
// Başlangıç state'i:
const prev = {
  todos: [],
  filter: 'all',
  sortBy: 'createdAt',
  sortDirection: 'asc'
};

// Fonksiyon çağrısı:
setFilter('completed');

// İç işleyiş:
setState(prev => ({
  ...prev,                    // Kural 1: Tümünü kopyala
  filter: 'completed'         // Kural 2: filter'ı güncelle
}));

// Shorthand alternatifi (eğer parametre filter olsaydı):
setState(prev => ({ ...prev, filter })); // Kural 3

// Sonuç:
{
  todos: [],           // 👈 Kopyalandı (değişmedi)
  filter: 'completed', // 👈 Güncellendi (ezildi)
  sortBy: 'createdAt', // 👈 Kopyalandı (değişmedi)
  sortDirection: 'asc' // 👈 Kopyalandı (değişmedi)
}
```

---

## 🎯 **SON SÖZ**

**React state güncellemesinin mantığı:**
1. **Öncekini koru** (`...prev`)
2. **Değiştirmek istediğini yaz** (`key: newValue`)
3. **Son yazılan kazansın** (override)
4. **İsimler aynıysa kısayol kullan** (shorthand)

**Bu mantıkla:**
- State'in diğer kısımları KORUNUR
- Sadece değiştirmek istediğin kısım DEĞİŞİR
- Kod temiz ve okunabilir olur

**Artık `{ ...prev, filter }` yazdığında:**
- `...prev` = "diğer her şey aynı kalsın"
- `filter` = "sadece bunu değiştir (shorthand: filter: filter)"
