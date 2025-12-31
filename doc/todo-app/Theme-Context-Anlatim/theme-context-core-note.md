
# ThemeProvider — Context — useContext — useTheme  
## Bağlantı Mantığı, Kullanım Akışı ve Kısa Notlar

Bu not, sadece **Context – Provider – Consumer (useTheme)** ilişkisini açıklamak için hazırlanmıştır.  
Amaç: “Değer nerede üretiliyor, nasıl paylaşılıyor ve bileşenler bunu nasıl kullanıyor?” sorularını netleştirmek.

---

## 🟡 1️⃣ ThemeProvider İçinde Oluşan Değerler

```ts
const [theme, setTheme] = useState(defaultTheme);
const [isDark, setIsDark] = useState(false);
```

Bu değişkenler tamamen **ThemeProvider fonksiyonunun içinde** oluşturulan normal React state’lerdir:

- `theme` → seçili tema
- `setTheme` → temayı değiştiren fonksiyon
- `isDark` → ekran gerçekten dark mı bilgisi

Bu noktada henüz **context ile bağlantı yoktur**.

---

## 🟡 2️⃣ value Nesnesi Nerede Oluşturuluyor?

```ts
const value = {
  theme,
  setTheme,
  isDark,
};
```

Bu satırda:

- `value` adında bir **JS objesi** oluşturulur
- içine **hangi alanların konulacağına biz karar veririz**
- bu, `object shorthand` sözdizimidir ve aslında şuna eşittir:

```ts
const value = {
  theme: theme,
  setTheme: setTheme,
  isDark: isDark
};
```

Yani:  
➡ value içeriği **tam olarak burada tanımlanır**, başka yerde otomatik oluşmaz.

---

## 🟡 3️⃣ Değer Context’e Nasıl Paylaşılır? (Bağın Kurulduğu Yer)

```tsx
<ThemeContext.Provider value={value}>
  {children}
</ThemeContext.Provider>
```

Bu satır şunu yapar:

1. `value` objesi **Context kanalına verilir**
2. Provider’ın **altındaki tüm bileşenler**
3. `useContext(ThemeContext)` dediğinde
4. **aynı value nesnesini geri alır**

> ThemeProvider = “değeri üretir ve global olarak yayınlar”.

---

## 🟣 4️⃣ useTheme & useContext Bu Değeri Nasıl Okur?

```ts
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
```

`useContext(ThemeContext)`:

- en yakın `ThemeContext.Provider`’ı bulur  
- oradaki `value` prop’unu **olduğu gibi döner**

Sonuç:

```ts
context = { theme, setTheme, isDark }
```

Burada sihir yok — **Provider’da verdiğimiz obje geri geliyor.**

---

## 🟢 5️⃣ ThemeToggle İçinde Kullanımı

```ts
const { theme, setTheme } = useTheme();
```

Bu, aşağıdaki işlemin kısa yazımıdır:

```ts
const ctx = useTheme();
const theme = ctx.theme;
const setTheme = ctx.setTheme;
```

Bu tamamen **JavaScript object destructuring**tir.

- React eşleştirme yapmaz
- sadece **nesnenin alanları parçalanır**

---

## 🟢 6️⃣ Bağlantı Akışı (Zincir Olarak)

```
ThemeProvider
   theme / setTheme / isDark (state burada)
        │
        ▼
 value = { theme, setTheme, isDark }
        │
        ▼
ThemeContext.Provider  (value yayınlanır)
        │
        ▼
useContext(ThemeContext)
        │
        ▼
useTheme()
        │
        ▼
ThemeToggle
  const { theme, setTheme } = useTheme()
        │
        ▼
setTheme() → ThemeProvider içindeki state'i değiştirir
```

👉 ThemeToggle, ThemeProvider ile **doğrudan değil**,  
**Context üzerinden** iletişim kurar.

---

## 🟢 7️⃣ Kısa Kullanım Notları

✔ ThemeProvider, uygulamanın üst katmanına yerleştirilmelidir  
✔ Tüm alt bileşenler `useTheme()` ile aynı değeri paylaşır  
✔ `setTheme()` çağrısı ThemeProvider içindeki state’i günceller  
✔ Güncellenmiş value otomatik olarak tüm tüketicilere yayılır

---

## 🟢 Özet

- **value** nesnesi ThemeProvider içinde oluşturulur  
- **Provider**, bu nesneyi global olarak paylaşır  
- **useContext / useTheme**, aynı nesneyi geri alır  
- **destructuring**, sadece bu nesnenin alanlarını parçalar  

> Yani bağın kurulduğu yer:  
> `ThemeContext.Provider value={value}` satırıdır.

---
