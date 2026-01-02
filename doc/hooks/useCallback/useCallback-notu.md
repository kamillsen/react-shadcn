
# 🎯 useCallback ve Matematik Fonksiyonu Benzetmesi

Bu not, `useCallback` kavramını **matematik fonksiyonu** benzetmesiyle akılda kalıcı şekilde özetlemek için hazırlandı.

---

## 🧠 Temel Fikir

> **Amaç:** Fonksiyonun *ne yaptığını* değiştirmek değil,  
> **fonksiyonun kendisinin (referansının)** her render'da değişmesini engellemek.

- Input (parametreler) → her çağrıda değişebilir, bu NORMAL.
- `useCallback` → fonksiyonun **referansını** sabit tutar.
- Kazanç: Child component'larda **gereksiz render**'ları engellemek, özellikle `React.memo`, `useEffect` dependency'leri ve `useMemo` gibi durumlarda kritik.

---

## 📐 Matematik Fonksiyonu Benzetmesi

### 🔹 Normal Fonksiyon (`useCallback` OLMADAN)

```javascript
// Matematikte: f(x) = x + 5
// Programlamada:
const addTodo = (input) => {
  const newTodo = createTodo(input);
  setState(prev => ({ ...prev, todos: [newTodo, ...prev.todos] }));
};

// Her render'da:
// f(x) = x + 5   (AMA YENİDEN YAZILMIŞ)
// Tekrar: f(x) = x + 5  (YENİDEN YAZILMIŞ)
// Yine: f(x) = x + 5    (YENİDEN YAZILMIŞ)
```

👉 **Her seferinde AYNI formül, ama KAĞIT YENİDEN YAZILIYOR!**

---

### 🔹 `useCallback` ile

```javascript
// Matematikte: f(x) = x + 5  (BİR KERE YAZILDI)
// Kağıda yazdık, duvara astık
const addTodo = useCallback((input) => {
  const newTodo = createTodo(input);
  setState(prev => ({ ...prev, todos: [newTodo, ...prev.todos] }));
}, []);

// Her render'da:
// "Ah, şu duvardaki f(x) = x + 5 formülünü kullanalım"
// AYNI KAĞIT, AYNI FORMÜL!
```

👉 Formül SABİT, sadece içine koyduğun **x (input)** değişiyor.

---

## 🧬 Gerçek Kod Karşılaştırması

### 1️⃣ `useCallback` OLMADAN

```javascript
function TodoProvider() {
  // ⚠️ Her render'da YENİ fonksiyon!
  const addTodo = (input) => {
    const newTodo = createTodo(input);
    setState(prev => ({ ...prev, todos: [newTodo, ...prev.todos] }));
  };

  // Render 1: addTodo → #REF123 (yeni fonksiyon)
  // Render 2: addTodo → #REF456 (yeni fonksiyon)
  // Render 3: addTodo → #REF789 (yeni fonksiyon)
  // ❌ Hepsi FARKLI referans!
}
```

### 2️⃣ `useCallback` İLE

```javascript
function TodoProvider() {
  const addTodo = useCallback((input) => {
    const newTodo = createTodo(input);
    setState(prev => ({ ...prev, todos: [newTodo, ...prev.todos] }));
  }, []);

  // Render 1: addTodo → #REF123 (oluşturuldu)
  // Render 2: addTodo → #REF123 (AYNI!)
  // Render 3: addTodo → #REF123 (AYNI!)
  // ✅ Hepsi AYNI referans!
}
```

> **Özet:** Input değişebilir, ama **fonksiyonun kendisi** değişmemeli.

---

## 🧱 Makine – Ham Madde Benzetmesi

- **FONKSİYON = MAKİNE**
- **INPUT = MAKİNENİN ALDIĞI HAM MADDE**

### `useCallback` OLMADAN

1. Ham madde geliyor (`input`) → **YENİ makine yap** → işle  
2. Başka ham madde → **YENİDEN makine yap** → işle  
3. Başka ham madde → **YENİDEN makine yap** → işle  

### `useCallback` İLE

1. Makineyi **bir kere yap** (`useCallback`)  
2. Ham madde geliyor → **AYNI makinede** işle  
3. Başka ham madde → **AYNI makinede** işle  
4. Başka ham madde → **AYNI makinede** işle  

---

## 🔍 Dependency Array ve "Dış Değişken" Meselesi

`useCallback`'in dependency array'i şunu kontrol eder:

> “Bu fonksiyonun içinde kullanılan **DIŞ DEĞİŞKENLER** değişti mi?”

Yani fonksiyonun içindeki **kapanım (closure)**'ı takip eder.

### ✅ Senin Örneğin

```javascript
const addTodo = useCallback((input) => {
  const newTodo = createTodo(input); // 👈 createTodo DAİMA AYNI
  setState(prev => ({ ...prev, todos: [newTodo, ...prev.todos] }));
  // 👈 setState DAİMA AYNI (React'tan geliyor)
  // 👈 prev DAİMA AYNI (callback parametresi)
}, []); // 👈 Dependency yok çünkü DIŞ değişken yok
```

- `input` → fonksiyon parametresi (dependency array'e yazılmaz)
- `prev` → fonksiyon içi parametre (dependency array'e yazılmaz)
- `createTodo`, `setState` → sabit referans → dependency gerekmez

### Eğer DIŞ Değişken KULLANSAYDIN

```javascript
const [user, setUser] = useState('Ahmet');

// ❌ YANLIŞ:
const addTodo = useCallback((input) => {
  console.log(user); // 👈 DIŞ değişken kullanıyor!
  const newTodo = createTodo(input);
  setState(prev => ({ ...prev, todos: [newTodo, ...prev.todos] }));
}, []); // 👈 user değişirse, fonksiyon ESKİ user'ı kullanır!

// ✅ DOĞRU:
const addTodo = useCallback((input) => {
  console.log(user);
  const newTodo = createTodo(input);
  setState(prev => ({ ...prev, todos: [newTodo, ...prev.todos] }));
}, [user]); // 👈 user değişirse, YENİ fonksiyon oluştur
```

---

## 🎮 Pratik Örnek: Hesap Makinesi

### `useCallback` OLMADAN

```javascript
function Calculator() {
  // Her butona basınca component yeniden render olur
  const add = (a, b) => a + b; // ⚠️ Her render'da YENİ fonksiyon!

  return <Button onClick={() => add(5, 3)}>Hesapla</Button>;
  // ❌ Button her render'da YENİ onClick alır
  // ❌ Button gereksiz yeniden render olur
}
```

### `useCallback` İLE

```javascript
function Calculator() {
  const add = useCallback((a, b) => a + b, []);
  // ✅ Sadece 1 kere oluşur

  return <Button onClick={() => add(5, 3)}>Hesapla</Button>;
  // ✅ Button hep AYNI onClick'i alır
  // ✅ Button optimize edilmiş
}
```

---

## 📊 TodoItem Örneği: performans neden önemli?

```tsx
function TodoItem({ todo }) {
  const { toggleTodo } = useTodos();

  return (
    <div>
      {todo.title}
      <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
    </div>
  );
}
```

**React şöyle düşünür:**

> “Bu butonun `onClick` prop'u değişti mi? Değiştiyse, bileşeni yeniden render edeyim.”

- `useCallback` OLMADAN:  
  - `toggleTodo` her render'da **yeni fonksiyon**  
  - `onClick` prop'u değişmiş sayılır  
  - `TodoItem` yeniden render olur → **gereksiz iş**

- `useCallback` İLE:  
  - `toggleTodo` hep **AYNI referans**  
  - `onClick` değişmemiş sayılır  
  - `TodoItem` render atlar → **performans kazanırsın**

---

## 🧪 Kendin Test Et

```javascript
// 1. useCallback SİL:
const addTodo = (input) => { ... }; // useCallback yok

// 2. TodoForm'a console.log ekle:
function TodoForm() {
  console.log('TodoForm RENDER OLDU!');
  const { addTodo } = useTodos();
  // ...
}

// 3. Her tuş vuruşunda TodoForm RENDER OLACAK!
// Çünkü addTodo her state değişiminde YENİLENİR

// 4. useCallback EKLE:
const addTodo = useCallback((input) => { ... }, []);

// 5. TodoForm SADECE gerektiğinde render olacak!
```

---

## 🧾 Büyük Özet (Cheat Sheet)

1. **`useCallback`, fonksiyonun _KENDİSİNİ_ cache'ler**, parametreleri değil.
2. **Input'lar** (`input`, `prev` vs.) her çağrıda değişebilir, bu sorun değil.
3. Asıl amaç: Fonksiyonun **referansını** sabit tutmak.
4. Bunun getirisi:
   - `React.memo` ile sarılmış child'larda gereksiz render'lar azalır.
   - `useEffect` dependency'lerinde “sonsuz loop” riskleri azalır.
   - `useMemo`, context value'ları vs. daha stabil çalışır.
5. Matematikteki karşılığı:
   - `f(x) = x + 5` formülünü **bir kere yaz**,  
     sonra sadece `x`'e farklı değerler ver.

> **Kafanda şöyle dursun:**
>
> `addTodo(input)` = Sabit bir **MAKİNE**  
> Her çağrıda farklı `input` = Makineye verdiğin farklı **HAM MADDE**  
> Ama makine **HEP AYNI makine**!

