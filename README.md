
# React ShadCN Dashboard Projesi

Bu proje **Next.js 16.1.1**, **React 19**, **TypeScript** ve **ShadCN UI** kullanılarak oluşturulmuş, öğrenme odaklı ve modern bir **dashboard + eğitim (learn)** uygulamasıdır.  
Hem gerçek bir dashboard arayüzü hem de React/Next.js konularını adım adım öğrenebileceğiniz sayfalar içerir.

## 🚀 Özellikler

- **Next.js 16.1.1** – App Router ile modern dosya tabanlı routing
- **React 19** – En güncel React sürümü
- **TypeScript** – Tip güvenliği ve daha güvenli refactor süreçleri
- **Tailwind CSS v4** – Yardımcı sınıf tabanlı modern stil altyapısı
- **ShadCN UI** – Radix UI temelli, erişilebilir ve tutarlı UI bileşenleri
- **Recharts** – Etkileşimli grafikler ve veri görselleştirme
- **TanStack Table** – Gelişmiş veri tabloları, filtreleme ve sıralama
- **Tabler Icons** – Temiz ve tutarlı ikon seti
- **Öğrenme Modülü (Learn)** – Hooks, props, state ve context için gerçek örnek sayfaları

---

## 📁 Proje Yapısı (Özet)

Projenin tam yapısı `doc/project-structure.md` içinde daha ayrıntılı anlatılmaktadır.  
Burada sık kullanılan klasörlerin özetini bulabilirsiniz.

```bash
react-shadcn-me/
├── doc/                      # Proje dokümantasyonları
├── public/                   # Statik dosyalar (ikonlar, görseller)
└── src/
    ├── app/                  # Next.js App Router sayfaları
    │   ├── (dashboard)/      # Dashboard route grubu
    │   ├── (learn)/          # Öğrenme (Learn) route grubu
    │   ├── globals.css       # Global stiller
    │   ├── layout.tsx        # Ana layout
    │   └── page.tsx          # Ana sayfa
    ├── components/           # React bileşenleri
    │   ├── shared/           # Paylaşılan, projeye özgü bileşenler
    │   └── ui/               # ShadCN UI temel bileşenleri
    ├── config/               # Yapılandırma dosyaları (örn. navigation)
    ├── features/             # Özellik (feature) tabanlı modüller
    ├── hooks/                # Özel React hook'ları
    ├── lib/                  # Yardımcı fonksiyonlar
    └── types/                # TypeScript tip tanımları
```

### `src/app/` – App Router ve Sayfalar

Next.js App Router yapısına uygun şekilde, route'lar dosya/klasör yapısı üzerinden tanımlanır.

- **`src/app/layout.tsx`** – Uygulamanın ana layout'u  
  Global stiller, tema sağlayıcıları ve genel iskelet burada tanımlanır.
- **`src/app/page.tsx`** – Ana sayfa (`/`)  
  Kullanıcıyı dashboard veya learn modülüne yönlendiren giriş noktası olabilir.

#### Dashboard Route Grubu – `(dashboard)/`

- **`src/app/(dashboard)/layout.tsx`**  
  Dashboard sayfaları için özel layout (sidebar, header vb.).
- **`src/app/(dashboard)/dashboard/page.tsx`**  
  Kartlar, grafikler ve tablolar içeren ana dashboard sayfası.

#### Learn Route Grubu – `(learn)/learn`

Öğrenme (learn) modülü React temel kavramlarını küçük, odaklı sayfalarla anlatır.

- **`src/app/(learn)/learn/layout.tsx`** – Learn modülü layout'u
- **`src/app/(learn)/learn/page.tsx`** – Learn ana sayfası

Alt konular:

- **Components**  
  `src/app/(learn)/learn/components/page.tsx`  
  Basit bileşen örnekleri.

- **Hooks**  
  `src/app/(learn)/learn/hook/page.tsx` – Hook’lara genel giriş  
  - `context/` – `useContext` örnekleri  
    - `layout.tsx` – ThemeProvider ile sarılı layout  
    - `page.tsx` – Tema bağlamını kullanan ana demo sayfası
  - `effect/` – `useEffect` örnekleri  
    - `page.tsx` – useEffect giriş sayfası  
    - `basic/page.tsx` – Temel useEffect kullanımı  
    - `cleanup/page.tsx` – Cleanup fonksiyonu örnekleri  
    - `fetch/page.tsx` – useEffect ile veri çekme örneği

- **Props**  
  `src/app/(learn)/learn/props` altında:
  - `layout.tsx` – Props modülü layout'u  
  - `page.tsx` – Props ana sayfası  
  - `basic/page.tsx` – Temel props kullanımı  
  - `callback/page.tsx` – Callback props örnekleri  
  - `children/page.tsx` – `children` props kullanımı

- **State**  
  `src/app/(learn)/learn/state` altında:
  - `layout.tsx` – State modülü layout'u  
  - `page.tsx` – State ana sayfası  
  - `basic/page.tsx` – Temel state kullanımı  
  - `lifting/page.tsx` – Lifting state up örneği  
  - `objects-arrays/page.tsx` – Nesne ve dizi state yönetimi

### `src/components/` – Bileşenler

- **`shared/`** – Uygulama geneline yayılmış paylaşılan bileşenler  
  Örnekler:
  - `app-sidebar.tsx` – Ana sidebar
  - `site-header.tsx` – Sayfa üst bölüm bileşeni
  - `section-cards.tsx` – Dashboard metrik kartları
  - `data-table.tsx` – TanStack Table tablosu
  - `chart-area-interactive.tsx` – Recharts ile etkileşimli grafik
- **`ui/`** – ShadCN tarafından üretilen temel UI bileşenleri  
  (`button.tsx`, `card.tsx`, `input.tsx`, `tabs.tsx`, `tooltip.tsx` vb.)  
  Yeni bir UI bileşeni eklemek için:
  ```bash
  npx shadcn@latest add button
  ```

### `src/features/` – Özellik Bazlı Modüller

- **`features/dashboard/`**
  - `data.json` – Dashboard için örnek veri seti
  - `api/` – Dashboard ile ilgili API / mock servisler
  - `components/` – Dashboard’a özgü bileşenler
  - `hooks/` – Dashboard’a özgü hook’lar

- **`features/learn/`**
  - `hooks/effect/example/` – `useEffectBasic`, `useEffectCleanup`, `useEffectFetch`
  - `hooks/context/theme/` – Tema için `ThemeContext`, `ThemeProvider`, `ThemeToggle`
  - `props/examples/` – `BasicPropsExample`, `CallbackExample`, `ChildrenExample`
  - `state/examples/` – `BasicStateExample`, `LiftingExample`, `ObjectsArraysExample`

### Diğer Önemli Klasörler

- **`src/hooks/`**
  - `use-mobile.ts` – Ekran boyutuna göre mobil davranışları yöneten özel hook.

- **`src/lib/`**
  - `utils.ts` – Yardımcı fonksiyonlar (`cn()` vb.).

- **`src/types/`**
  - `index.ts` – Ortak TypeScript tipleri.

- **`public/`**
  - `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` gibi statik ikon dosyaları.

- **`doc/`**
  - `project-structure.md` – Bu yapıyı daha detaylı anlatan doküman
  - `react-nextjs-roadmap.md` – Öğrenme yol haritası
  - `props/*` – Props konusuna dair ek notlar

---

## 🛠️ Başlarken

### Gereksinimler

- **Node.js 18+**
- Paket yöneticisi olarak **npm**, **yarn** veya **pnpm**

### Kurulum

1. Bağımlılıkları yükleyin:

   ```bash
   npm install
   # veya
   yarn install
   # veya
   pnpm install
   ```

2. Geliştirme sunucusunu başlatın:

   ```bash
   npm run dev
   # veya
   yarn dev
   # veya
   pnpm dev
   ```

3. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı görüntüleyin.

---

## 📊 Dashboard Özellikleri

- **İnteraktif Grafikler** – Recharts ile responsive grafikler
- **Veri Tabloları** – TanStack Table ile filtrelenebilir ve sıralanabilir tablolar
- **Responsive Tasarım** – Mobil ve masaüstü için uyumlu layout
- **Koyu/Açık Tema** – Context tabanlı tema yönetimi (Learn modülü context örnekleriyle desteklenir)
- **Erişilebilirlik** – ShadCN UI + Radix UI sayesinde erişilebilir bileşenler

---

## 🧠 Öğrenme Modülü (Learn)

`(learn)/learn` route grubu, React kavramlarını gerçek kod örnekleriyle öğretmek için tasarlanmıştır:

- **Hooks**: `useEffect`, `useContext` senaryoları
- **Props**: Temel props, callback props, `children` kullanımı
- **State**: Basit state, lifting state up, nesne/dizi state yönetimi
- **Tema Sistemi**: Context + Provider ile tema yönetimi ve tema toggle bileşeni

Bu sayfalar, hem proje içinde rehber hem de kendi başına bir eğitim materyali olarak kullanılabilir.

---

## 🏗️ Geliştirme

### Kullanılan Teknolojiler

- **Frontend Framework**: Next.js 16.1.1
- **UI Kütüphanesi**: ShadCN UI (Radix UI temelli)
- **Styling**: Tailwind CSS v4
- **İkonlar**: Tabler Icons
- **Grafikler**: Recharts
- **Tablolar**: TanStack Table
- **Tip Güvenliği**: TypeScript
- **Linting**: ESLint (`eslint.config.mjs`)

### Komutlar

- `npm run dev` – Geliştirme sunucusunu başlat
- `npm run build` – Üretim için derle
- `npm run start` – Üretim sunucusunu başlat
- `npm run lint` – Kod kalitesi kontrolü

---

## 📚 Daha Fazla Bilgi

**Next.js** için:

- [Next.js Dokümantasyonu](https://nextjs.org/docs) – Özellikler ve API'ler
- [Next.js Öğren](https://nextjs.org/learn) – İnteraktif Next.js eğitimi

**ShadCN UI** için:

- [ShadCN UI Dokümantasyonu](https://ui.shadcn.com/) – Bileşenler ve kullanım kılavuzu

---

## 🚀 Dağıtım

Bu uygulamayı dağıtmanın en kolay yolu **Vercel** platformunu kullanmaktır.

Daha fazla bilgi için:

- [Next.js Deploy Dokümantasyonu](https://nextjs.org/docs/app/building-your-application/deploying)

---

## 📝 Lisans

Bu proje **MIT** lisansı ile lisanslanmıştır.
