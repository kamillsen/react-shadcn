# 📘 Next.js App Router — Felsefesi ve Çalışma Mantığı

> **Kısa fikir:**  
> App Router = *Dosya sistemi tabanlı router* + *Server Components* + *İçiçe layout yapısı*

---

## 📚 İçindekiler

1. Dosya Sistemi = Router Paradigması
2. Özel Dosya İsimleri (Conventions)
3. Render Süreci ve Route Çözümleme
4. Layout Hiyerarşisi
5. Server vs Client Components
6. Projedeki Akıllı Kullanımlar
7. Streaming, Suspense ve Partial Rendering
8. Caching Mantığı
9. Senin Projenin Düşünce Yapısı
10. Eski Router vs App Router Zihniyeti
11. Özet

---

## 🧠 Dosya Sistemi = Router Paradigması

### Eski (Pages Router)

```tsx
// URL: /about
pages/about.js
```

### Yeni (App Router)

```tsx
// URL: /about
app/about/page.js
```

> **Fark:**  
> `app/` klasörü içindeki **özel isimli dosyalar** (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`...) route’un davranışını otomatik belirler.

---

## 🧩 Özel Dosya İsimleri (Conventions)

Her dosyanın App Router'da özel bir anlamı vardır:

| Dosya              | Amaç               | Otomatik Davranış                       |
|--------------------|--------------------|------------------------------------------|
| `page.js/tsx`      | Sayfa bileşeni     | URL’de görünen ana içerik               |
| `layout.js/tsx`    | Layout bileşeni    | Child route’ları saran yapı             |
| `loading.js/tsx`   | Loading UI         | Suspense boundary + iskelet UI          |
| `error.js/tsx`     | Hata UI            | Error boundary oluşturur                |
| `not-found.js/tsx` | 404 sayfası        | Özel not-found UI                       |
| `route.js/ts`      | API route          | GET/POST gibi HTTP endpoint’leri        |

---

## ⚙️ Render Süreci ve Route Çözümleme

### 1. URL Çözümleme

```txt
URL: /learn/hook/effect/fetch

Next.js şunları arar:

1. app/learn/hook/effect/fetch/page.tsx
2. Yoksa: en yakın segmentteki `page.tsx`
3. Segment segment eşleştirme
```

Her klasör = bir **route segmenti**  
Her `page.tsx` = o segmentin **sayfası**

---

## 🧱 Layout Hiyerarşisi

Her segment kendi layout’una sahip olabilir:

```txt
app/
 ├─ layout.tsx                     (Root layout)
 ├─ (learn)/
 │   ├─ layout.tsx                 (Learn grubu layout’u)
 │   └─ learn/
 │       ├─ layout.tsx             (/learn layout’u)
 │       ├─ page.tsx               (/learn)
 │       └─ hook/
 │           ├─ layout.tsx         (/learn/hook layout’u)
 │           ├─ page.tsx           (/learn/hook)
 │           └─ effect/
 │               └─ page.tsx       (/learn/hook/effect)
```

Her layout, child’larını şu şekilde sarar:

```tsx
export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      <main>{children}</main> {/* Child route buraya akar */}
    </div>
  );
}
```

---

## 🔄 Server vs Client Components

### Varsayılan: **Server Component**

```tsx
// app/learn/page.tsx
export default async function LearnPage() {
  const data = await fetch("https://...");
  return <div>{data.title}</div>;
}
```

- Kod **server’da** çalışır
- Direkt `async` component yazabilirsin
- Browser’a daha az JS gider

---

### Client Component’e Geçmek için

```tsx
"use client"; // 👈 Dosyanın en üstüne

import { useState } from "react";

export default function HookPage() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      {count}
    </button>
  );
}
```

- `useState`, `useEffect` vb. hook’lar için **zorunlu**
- Bu component client bundle’a dahil olur

---

## 🎯 Projedeki Akıllı Kullanımlar

### 1️⃣ Route Groups `(folder)`

```txt
app/
 ├─ (dashboard)/...
 └─ (learn)/...
```

- Parantezli klasörler **URL’de görünmez**
- Ama layout paylaşımını ve yapıyı düzenlemeyi sağlar

---

### 2️⃣ Nested Routing

```txt
learn/
 ├─ layout.tsx           → /learn için temel layout
 ├─ page.tsx             → /learn
 └─ hook/
     ├─ layout.tsx       → /learn/hook için alt layout
     └─ effect/
         └─ page.tsx     → /learn/hook/effect
```

Her segment:
- Kendi layout'una sahip olabilir
- Parent layout’tan **devralır**

---

### 3️⃣ Colocation (Yakın Yerleşim)

```txt
app/(learn)/learn/state/basic/page.tsx
features/learn/state/examples/BasicStateExample.tsx
```

- Route ile ilgili UI: `app/` altında
- Reusable / mantık odaklı parçalar: `features/` veya `components/` altında

---

## 🌊 Streaming, Suspense ve Partial Rendering

### `loading.tsx` ile Otomatik Suspense

```tsx
// app/learn/loading.tsx
export default function Loading() {
  return <div>Yükleniyor...</div>;
}
```

- Next.js, ilgili segment için otomatik `Suspense` sınırı koyar
- Veri beklerken `loading.tsx` gösterilir

---

### Nested Suspense Boundaries

```tsx
<Layout>
  <Sidebar /> {/* Hızlı yüklenir */}
  <Suspense fallback={<PageSkeleton />}>
    <PageContent /> {/* Yavaş veri */}
  </Suspense>
</Layout>
```

- Farklı parçalar **farklı hızlarda** yüklenebilir
- Kullanıcıya daha akıcı bir deneyim sağlar

---

### Partial Rendering (Kısmi Render)

- Route segmentlerinden **sadece değişen kısım** tekrar render olur
- Layout’lar **korunur**, böylece:
  - Scroll pozisyonu
  - İç layout içindeki local state
  - Animasyonlar  
  kaybolmaz.

---

## 🧠 Caching Mantığı

```tsx
// Varsayılan: cache’li
fetch("https://api.example.com/posts", { cache: "force-cache" });

// Her istekte taze veri:
fetch("https://api.example.com/posts", { cache: "no-store" });
```

- App Router + Server Components ile **fetch neredeyse her yerde** kullanılabiliyor
- Data fetching ve caching, router seviyesinde düşünülüyor

---

## 🧩 Senin Projendeki Düşünce Yapısı

- `app/(learn)/learn/layout.tsx`  
  → `/learn` ve altındaki tüm route’lar için ortak çerçeve

- `app/(learn)/learn/hook/layout.tsx`  
  → `/learn/hook` altındaki sayfalar için daha spesifik layout

- `app/(learn)/learn/hook/effect/page.tsx`  
  → `/learn/hook/effect` sayfası (örneğin useEffect ders sayfası)

Her `page.tsx`:
- Parent layout’tan **görsel iskeleti devralır**
- Sadece kendi içeriğine odaklanır

---

## 🧠 Eski Router vs App Router Zihniyeti

| Eski Düşünce (Pages Router)   | Yeni Düşünce (App Router)                 |
|-------------------------------|-------------------------------------------|
| “Sayfa yapıyorum”             | “Segment + layout hiyerarşisi kuruyorum” |
| `useEffect` ile data fetching | Server component içinde `async/await`    |
| Manuel loading state          | `loading.tsx` ile otomatik loading       |
| Tek büyük layout              | İçiçe, segment bazlı layout’lar          |

---

## 🧾 Özet

- **App Router felsefesi:**  
  - Dosya sistemi ile router tanımla  
  - Layout’ları segment bazlı düşün  
  - Data fetching’i server tarafına kaydır  
  - Streaming ve Suspense ile kullanıcı deneyimini iyileştir

- **Kısa cümle:**  
  > “App Router; dosya sistemini router olarak kullanıp,
  > server component’ler ve iç içe layout’larla  
  > hem performansı hem kod organizasyonunu iyileştiren yeni Next.js yaklaşımıdır.”
