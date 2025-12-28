# 🧭 Next.js (App Router) — Render & Klasörleme Kuralları (Notlar)

> Bu not, **“hangi dosya ne zaman render edilir?”**, **“yeni sayfa nasıl eklenir?”**, **“page.tsx neden özel?”**, **“layout zinciri nasıl çalışır?”** sorularının hızlı ve görsel cevabıdır.

---

## İçindekiler
- [1) Zihinsel Model](#1-zihinsel-model)
- [2) Altın Kurallar](#2-altın-kurallar)
- [3) Route (URL) nasıl oluşur?](#3-route-url-nasıl-oluşur)
- [4) `page.tsx` ve `layout.tsx` render sırası](#4-pagetsx-ve-layouttsx-render-sırası)
- [5) Route Group `(learn)` nedir?](#5-route-group-learn-nedir)
- [6) “Yeni sayfayı bağımsız render etmek”](#6-yeni-sayfayı-bağımsız-render-etmek)
- [7) Component yazdım: Nereye koyacağım?](#7-component-yazdım-nereye-koyacağım)
- [8) `export default` ne işe yarar?](#8-export-default-ne-işe-yarar)
- [9) Ne zaman `'use client'` gerekir?](#9-ne-zaman-use-client-gerekir)
- [10) shadcn/ui Sidebar hatası (senin yaşadığın)](#10-shadcnui-sidebar-hatası-senin-yaşadığın)
- [11) Mini kontrol listesi](#11-mini-kontrol-listesi)

---

## 1) Zihinsel Model

### ✅ App Router’da **Next.js karar verir**
- **React** ekrana render eder.
- **Next.js** ise şunu belirler:
  - Hangi URL’de hangi klasör/segment var?
  - O segmentin sayfası hangi **`page.tsx`** dosyası?
  - Hangi **`layout.tsx`** dosyaları bu sayfayı saracak?

> Yani “React sadece `page.tsx`’i render ediyor” değil;  
> **Next.js URL’ye göre doğru `page.tsx`’i seçip React’e render ettiriyor.**

---

## 2) Altın Kurallar

### 🥇 Kural #1 — **Route = `app/` altındaki klasör yolu**
`src/app/` altındaki klasörler URL segmentlerine denk gelir.

### 🥇 Kural #2 — **Sayfa olmak için dosya adı: `page.tsx`**
Bir route’un “sayfası” olmak için dosyanın adı **`page.tsx`** olmalıdır.

### 🥇 Kural #3 — **Layout’lar sayfayı “wrap” eder**
Her `layout.tsx` kendi altındaki segmentleri sarar (`children`).

### 🥇 Kural #4 — `(group)` klasörleri URL’e girmez
Parantezli klasörler sadece **organizasyon** içindir, URL’e eklenmez.

---

## 3) Route (URL) nasıl oluşur?

### Örnek
```
src/app/(learn)/learn/components/page.tsx
```

- `(learn)` → **route group** (URL’de görünmez)
- `learn` → URL segmenti
- `components` → URL segmenti
- `page.tsx` → o segmentin sayfası

✅ URL:
```
/learn/components
```

---

## 4) `page.tsx` ve `layout.tsx` render sırası

### Örnek zincir (senin senaryon)
`/learn/components` açılınca tipik olarak:

1. `src/app/layout.tsx` → **Root Layout**
2. `src/app/(learn)/learn/layout.tsx` → **Learn Layout**
3. `src/app/(learn)/learn/components/page.tsx` → **Sayfanın içeriği**

> Layout’lar “katman” gibidir: dıştan içe doğru giydirilir.

---

## 5) Route Group `(learn)` nedir?

Route group, klasör ismini paranteze alarak oluşturulur:

```
(app)/ (learn)/ ...
```

✅ Ne işe yarar?
- Rotaları **kategoriye göre** düzenlersin (dashboard, learn, marketing vs.)
- Ama URL’e **fazladan segment eklemezsin**

⚠️ Dikkat: İki farklı route group içinde aynı URL segmenti oluşturursan çakışır.

---

## 6) Yeni sayfayı bağımsız render etmek

### Senin cümlenle:
> “Ben bir sayfa daha yazdım ve `page.tsx`’den bağımsız bir sayfada render etmek istiyorum.”

✅ Çözüm:
- Yeni bir klasör aç
- İçine **`page.tsx`** koy

Örnek:
```
src/app/(learn)/learn/components/props-demo/page.tsx
```

➡️ URL:
```
/learn/components/props-demo
```

> Burada mevcut `components/page.tsx` içine “tanımlamak” zorunda değilsin.  
> Yeni route’un kendi `page.tsx`’i var, Next.js onu bulur.

---

## 7) Component yazdım: Nereye koyacağım?

### ✅ Eğer yeni URL istemiyorsan (sadece UI parçası)
Component’i istediğin isimle yazarsın; **route olmaz**, ama sayfa içinde kullanılır:

Örnek:
```
src/components/learn/DemoCard.tsx
```

Ve sayfada:
```tsx
import DemoCard from "@/components/learn/DemoCard"

export default function Page() {
  return <DemoCard />
}
```

### ✅ Eğer yeni URL istiyorsan
Component değil, **sayfa** yazıyorsun demektir → `app/.../page.tsx`

---

## 8) `export default` ne işe yarar?

### JavaScript tarafı
`export default` bir dosyanın “ana çıktısını” dışarı verir.

### Next.js tarafı (kritik)
- `page.tsx` → **default export edilen component** o route’ta render edilir
- `layout.tsx` → **default export edilen component** alt segmentleri `children` ile sarar

Örnek:
```tsx
export default function Page() {
  return <div>Sayfa</div>
}
```

---

## 9) Ne zaman `'use client'` gerekir?

App Router’da dosyalar varsayılan olarak “server” taraflı davranır.

Aşağıdakiler varsa **Client Component** gerekir:
- `useState`, `useEffect` gibi hook’lar
- `onClick` gibi event handler’lar
- `window`, `document` gibi browser API’leri

O zaman dosyanın en üstüne:
```tsx
"use client"
```

> **Sadece gerektiği yerde** kullanmak iyi pratiktir.

---

## 10) shadcn/ui Sidebar hatası (senin yaşadığın)

### Hata:
```
useSidebar must be used within a SidebarProvider.
```

### Neden?
shadcn/ui Sidebar, **Context** ile çalışır.  
`SidebarTrigger` veya `useSidebar` kullanan her şeyin üstünde:

✅ `SidebarProvider` olmalı.

### Çözüm (mantık)
Senin `/learn` layout’unda sidebar/trigger vardı ama provider yoktu.

Bu yüzden:
- sayfa render olurken crash etti (500)
- **kartlar görünemedi** (çünkü sayfa daha çizilmeden patlıyordu)

✅ Düzeltilmiş layout iskeleti:
```tsx
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* Sidebar + Header trigger gibi şeyler burada güvenle çalışır */}
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
```

> Özet: “Kart bozuk değildi.”  
> “Sayfa provider yüzünden render olamıyordu.”

---

## 11) Mini kontrol listesi ✅

### “Yeni bir şey yazacağım” derken kendine sor:
- [ ] **Yeni bir URL istiyor muyum?**  
  - Evet → `app/.../yeni-segment/page.tsx`
  - Hayır → normal component dosyası + bir `page.tsx` içinde import
- [ ] **Bu sayfa interaktif mi?** (state, onClick, useEffect)  
  - Evet → `'use client'`
- [ ] **Bu sayfayı hangi layout’lar saracak?**  
  - Root `app/layout.tsx` + segment layout’ları
- [ ] **Route group mu kullanıyorum?** `(learn)`  
  - URL’e girmez, sadece düzen
- [ ] **shadcn sidebar var mı?**  
  - Provider olmadan trigger/hook patlar

---

## Bonus: Senin yapı için hızlı örnekler

### `/learn`
```
src/app/(learn)/learn/page.tsx
```

### `/learn/components`
```
src/app/(learn)/learn/components/page.tsx
```

### `/learn/components/deneme`
```
src/app/(learn)/learn/components/deneme/page.tsx
```

---

✨ Bu notu projende `doc/nextjs-render-notes.md` gibi bir yere koyup sürekli referans olarak kullanabilirsin.
