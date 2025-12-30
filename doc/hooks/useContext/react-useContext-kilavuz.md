# 📘 React `useContext()` — TAM KILAVUZ (Tema Örneği Üzerinden)

> **Bir kere veriyi paylaş, herkes kullansın.**  
> `useContext`, React'te prop zinciri (props drilling) olmadan veriyi çoklu bileşenlere aktarmayı sağlar.

---

## 🎯 `useContext` Nedir?

`useContext`, bir veriyi **global gibi** birçok bileşenle paylaşmamızı sağlayan bir React Hook’udur.  
Bunu bir **WhatsApp grubu** gibi düşünebilirsin:

- `createContext()` → Grup kur
- `Provider` → Mesaj gönder
- `useContext()` → Mesajı oku

---

## ❌ Problem: Props Drilling

```jsx
<App theme="dark">            // Anne
  <Header theme="dark">       // → Çocuk
    <Navbar theme="dark">     // → Torun
      <Button theme="dark" /> // → En alttaki BİLEŞEN kullanır
    </Navbar>
  </Header>
</App>
```

🔻 Sorunlar

- Ara bileşenler **veriyi kullanmaz, sadece iletir**
- Kod karmaşıklaşır
- Bakımı zorlaşır

---

## ✅ Çözüm: `useContext`

```jsx
<ThemeProvider theme="dark">
  <App>
    <Header />   // Direkt erişir
    <Navbar />   // Direkt erişir
    <Button />   // Direkt erişir
  </App>
</ThemeProvider>
```

🎯 **Artık veri herkese doğrudan gider — aracı yok!**

---

# 🏗️ Yapının 3 Temel Parçası

## 1️⃣ `ThemeContext.tsx` — **Grubu Oluştur**

```ts
import { createContext } from "react";

export const ThemeContext = createContext(null);
```

> “Bu context’te tema bilgisi konuşulacak” demek gibi.

---

## 2️⃣ `ThemeProvider.tsx` — **Mesajı Yöneten Yer**

```ts
import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme(t => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

> Burada veriyi **saklar ve paylaştırırız.**

---

## 3️⃣ `ThemeToggle.tsx` — **Mesajı Okuyan Bileşen**

```ts
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Tema: {theme}
    </button>
  );
}
```

> Kullanıcı butona tıklar → theme değişir → **tüm bileşenler güncellenir**

---

# 🔄 Çalışma Akışı (Adım Adım)

```txt
1) Kullanıcı butona tıklar
2) ThemeToggle → toggleTheme() çağırır
3) ThemeProvider → state değişir
4) Context değerleri güncellenir
5) Tüm abone bileşenler yeniden render olur
```

---

# ⚡ Custom Hook — `useTheme()`

```ts
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export function useTheme() {
  return useContext(ThemeContext);
}
```

### Kullanım

```ts
const { theme } = useTheme();  // ✅ Temiz ve kısa
```

> Hem okunabilirliği artırır hem TypeScript uyumunu güçlendirir.

---

# 🎯 Gerçek Dünya Benzetmeleri

| Durum | `createContext` | `Provider` | `useContext` |
|------|-----------------|-----------|--------------|
| WhatsApp Grubu | Grup kur | Mesaj at | Mesajı oku |
| Buzdolabı Notu | Buzdolabı | Not yaz | Notu oku |
| Okul Anonsu | Hoparlör sistemi | Anons yap | Anonsu duy |

---

# 📊 useContext vs Props

| Özellik | Props | useContext |
|--------|------|-----------|
| Veri paylaşımı | Parent → Child zinciri | Tüm bileşenlere doğrudan |
| Orta bileşen yükü | Fazla | Yok |
| Kod okunabilirliği | Zorlaşır | Basitleşir |
| Performans | İyi | Değişince tüm aboneler render olur |

---

# ✅ Ne Zaman Kullanılır?

### 👍 Kullan

- Tema (dark / light)
- Kullanıcı bilgisi
- Dil seçimi
- Sepet verisi
- Global ayarlar

---

### 👎 Kullanma

- Sadece 2 bileşen arasında veri geçişi
- Form state
- Çok sık değişen veriler

> Bu durumlarda `useState` veya props daha uygundur.

---

# 💎 Özet — Mantığı Kısaca

```txt
createContext()  → Ortak veri alanı oluştur
Provider         → Veriyi sağla
useContext()     → Veriyi oku
```

👉 Basit kural:

> “Bir veri **birçok bileşen tarafından** kullanılacaksa,  
> herkese tek tek props geçme — **context’e koy**.”

---

# 🚀 Son Söz

**useContext = React'in WhatsApp grubu**  
Bir kere yaz, bütün üyeler görsün.

> Global state için hafif, temiz ve anlaşılır bir çözümdür. 🎯
