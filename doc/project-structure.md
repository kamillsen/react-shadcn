# Proje Yapısı Dokümantasyonu

Bu doküman, `react-shadcn-me` projesinin dosya yapısını detaylı bir şekilde açıklamaktadır. Proje, Next.js 16.1.1 ile geliştirilmiş, React 19, TypeScript ve ShadCN UI kullanan bir dashboard uygulamasıdır. Aşağıda, projenin genel yapısı ASCII çizimiyle gösterilmiştir. Ardından, her klasör ve dosyanın neyi ifade ettiği, ne barındırdığı ve içerdiği kodların işlevleri açıklanmıştır.

## Genel Dosya Yapısı

```
react-shadcn-me/
├── doc/
│   └── project-structure.md          # Bu doküman
├── src/
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx            # Dashboard sayfası için layout
│   │   │   └── page.tsx              # Dashboard ana sayfası
│   │   ├── layout.tsx                # Ana uygulama layout'u
│   │   └── page.tsx                  # Ana sayfa (home)
│   ├── components/
│   │   ├── shared/
│   │   │   ├── app-sidebar.tsx       # Ana sidebar bileşeni
│   │   │   ├── chart-area-interactive.tsx  # Etkileşimli grafik bileşeni
│   │   │   ├── data-table.tsx        # Veri tablosu bileşeni
│   │   │   ├── nav-documents.tsx     # Doküman navigasyonu
│   │   │   ├── nav-main.tsx          # Ana navigasyon
│   │   │   ├── nav-secondary.tsx     # İkincil navigasyon
│   │   │   ├── nav-user.tsx          # Kullanıcı navigasyonu
│   │   │   ├── section-cards.tsx     # Kartlar bölümü
│   │   │   └── site-header.tsx       # Site başlığı
│   │   └── ui/
│   │       ├── avatar.tsx            # Avatar bileşeni
│   │       ├── badge.tsx             # Rozet bileşeni
│   │       ├── breadcrumb.tsx        # Breadcrumb navigasyonu
│   │       ├── button.tsx            # Düğme bileşeni
│   │       ├── card.tsx              # Kart bileşeni
│   │       ├── chart.tsx             # Grafik bileşeni
│   │       ├── checkbox.tsx          # Onay kutusu
│   │       ├── drawer.tsx            # Çekmece bileşeni
│   │       ├── dropdown-menu.tsx     # Açılır menü
│   │       ├── input.tsx             # Giriş alanı
│   │       ├── label.tsx             # Etiket bileşeni
│   │       ├── select.tsx            # Seçim bileşeni
│   │       ├── separator.tsx         # Ayırıcı
│   │       ├── sheet.tsx             # Sayfa bileşeni
│   │       ├── sidebar.tsx           # Sidebar bileşeni
│   │       ├── skeleton.tsx          # İskelet yükleme
│   │       ├── sonner.tsx            # Bildirim bileşeni
│   │       ├── table.tsx             # Tablo bileşeni
│   │       ├── tabs.tsx              # Sekme bileşeni
│   │       ├── toggle-group.tsx      # Geçiş grubu
│   │       ├── toggle.tsx            # Geçiş düğmesi
│   │       └── tooltip.tsx           # İpucu bileşeni
│   ├── config/
│   │   └── navigation.ts             # Navigasyon yapılandırması
│   ├── features/
│   │   └── dashboard/
│   │       ├── components/           # Dashboard'a özel bileşenler (henüz boş)
│   │       ├── data.json             # Dashboard verileri
│   │       └── hooks/                # Dashboard'a özel hook'lar (henüz boş)
│   ├── hooks/
│   │   └── use-mobile.ts             # Mobil cihaz tespiti hook'u
│   ├── lib/
│   │   └── utils.ts                  # Yardımcı fonksiyonlar
│   └── types/
│       └── index.ts                  # Genel TypeScript tipleri
├── components.json                   # ShadCN UI yapılandırması
├── eslint.config.mjs                 # ESLint yapılandırması
├── next-env.d.ts                     # Next.js ortam tipleri
├── next.config.ts                    # Next.js yapılandırması
├── package.json                      # Proje bağımlılıkları ve script'ler
├── postcss.config.mjs                # PostCSS yapılandırması
├── README.md                         # Proje açıklaması
├── tsconfig.json                     # TypeScript yapılandırması
└── public/                           # Statik dosyalar (favicon, resimler vb.)
```

## Detaylı Açıklamalar

### Kök Düzey Dosyaları
Bu dosyalar, projenin genel yapılandırmasını ve bağımlılıklarını yönetir. Yeni özellik eklerken bu dosyaları nadiren değiştireceksiniz, ancak bağımlılık eklemek için `package.json`'a bakabilirsiniz.

- **`components.json`**: ShadCN UI kütüphanesinin yapılandırma dosyası. UI bileşenlerinin nerede kurulacağı, hangi stilleri kullanacağı gibi ayarları içerir.
- **`eslint.config.mjs`**: Kod kalitesi için ESLint kuralları. Kod yazarken hataları yakalar ve tutarlılığı sağlar.
- **`next-env.d.ts`**: Next.js'in TypeScript tiplerini tanımlar. Otomatik olarak oluşturulur, elle düzenlenmez.
- **`next.config.ts`**: Next.js uygulama ayarları (örneğin, derleme seçenekleri, yönlendirmeler). `src/` klasörü kullanımı için gerekli ayarlar burada yapılır.
- **`package.json`**: Proje bağımlılıkları, script'ler (örneğin, `npm run dev`) ve proje meta verileri. Yeni paket eklemek için burayı düzenleyin.
- **`postcss.config.mjs`**: CSS işleme için PostCSS ayarları. Tailwind CSS entegrasyonu burada yapılır.
- **`README.md`**: Proje açıklaması, kurulum talimatları ve kullanım rehberi. Dokümantasyon için başlangıç noktası.
- **`tsconfig.json`**: TypeScript derleyici ayarları. Yol alias'ları (`@/*`) burada tanımlanır, modül çözümlemesi için kritik.

### `src/` Klasörü
Kaynak kodların bulunduğu ana klasör. Tüm uygulama kodları burada yer alır. Bu yapı, Next.js'in `src/` dizini kullanımını destekler ve kodları düzenli tutar.

#### `src/app/`
Next.js App Router yapısı. Sayfa ve layout dosyaları burada bulunur. Her dosya bir route'a karşılık gelir.

- **`layout.tsx`**: Ana uygulama layout'u. Tüm sayfalar için ortak yapı (örneğin, HTML head, genel stiller). `SidebarProvider` ve genel bileşenleri içerir.
- **`page.tsx`**: Ana sayfa (home route). Basit bir karşılama sayfası veya yönlendirme yapabilir.
- **`(dashboard)/`**: Route grubu. Dashboard ile ilgili sayfaları gruplar.
  - **`layout.tsx`**: Dashboard sayfaları için özel layout. Sidebar ve header'ı içerir, dashboard'a özgü stiller uygular.
  - **`page.tsx`**: Dashboard ana sayfası. Kartlar, grafikler ve tabloları gösterir. Veri çekme ve bileşen render'ını yönetir.

#### `src/components/`
Yeniden kullanılabilir UI bileşenleri. İki alt klasöre ayrılır: `shared` ve `ui`.

- **`shared/`**: Uygulamaya özel, paylaşılan bileşenler. Dashboard ve genel kullanım için.
  - **`app-sidebar.tsx`**: Ana sidebar bileşeni. Navigasyon menülerini, kullanıcı bilgilerini ve hızlı eylemleri içerir. ShadCN Sidebar bileşenlerini kullanır.
  - **`chart-area-interactive.tsx`**: Etkileşimli grafik alanı. Recharts kütüphanesi ile veri görselleştirme yapar, filtreleme ve zaman aralığı seçimi sağlar.
  - **`data-table.tsx`**: Veri tablosu. TanStack Table ile sıralanabilir, filtrelenebilir tablolar oluşturur. Dashboard verilerini listeler.
  - **`nav-*.tsx`**: Navigasyon bileşenleri (main, secondary, user, documents). Menü öğelerini ve bağlantıları yönetir.
  - **`section-cards.tsx`**: Kartlar bölümü. Metrik kartlarını (gelir, müşteriler vb.) gösterir, badge'lar ve trend göstergeleri içerir.
  - **`site-header.tsx`**: Sayfa başlığı. Başlık metni, breadcrumb ve ek eylemler (örneğin, GitHub bağlantısı) barındırır.

- **`ui/`**: ShadCN UI bileşenleri. Radix UI üzerine inşa edilmiş, yeniden kullanılabilir temel bileşenler. Her dosya bir UI öğesi için (button, input vb.). Bu bileşenler, tasarım sistemi için temel oluşturur ve doğrudan ShadCN'den gelir. Yeni bileşen eklemek için `npx shadcn@latest add [component]` komutunu kullanın.

#### `src/config/`
Yapılandırma dosyaları. Uygulama ayarları ve sabit veriler burada.

- **`navigation.ts`**: Navigasyon menüsü verileri. Sidebar'daki menü öğeleri (Dashboard, Analytics vb.) burada tanımlanır. İkonlar, etiketler ve bağlantılar içerir.

#### `src/features/`
Özellik bazlı klasörleme. Uygulamayı özelliklere göre ayırır (örneğin, dashboard, auth). Gelecekte yeni özellikler (analytics, reports) için kolay genişletme sağlar.

- **`dashboard/`**: Dashboard özelliği için dosyalar.
  - **`components/`**: Dashboard'a özel bileşenler (henüz boş, gelecekte ekleme için hazır).
  - **`data.json`**: Dashboard verileri. Grafik ve tablo için örnek veri seti. Gerçek uygulamada API'den gelir.
  - **`hooks/`**: Dashboard'a özel hook'lar (henüz boş, veri çekme veya state yönetimi için).

#### `src/hooks/`
Özel React hook'ları. Yeniden kullanılabilir mantık parçaları.

- **`use-mobile.ts`**: Mobil cihaz tespiti. Ekran boyutuna göre mobil modunu belirler, responsive davranışlar için kullanılır.

#### `src/lib/`
Yardımcı fonksiyonlar ve araçlar. Genel utility'ler burada.

- **`utils.ts`**: Yardımcı fonksiyonlar. ShadCN için `cn()` fonksiyonu (className birleştirme) ve diğer genel araçlar.

#### `src/types/`
TypeScript tip tanımları. Uygulama genelinde kullanılan tipler.

- **`index.ts`**: Genel tipler. Veri modelleri, API yanıtları vb. için. Yeni özellik eklerken tipleri buraya ekleyin.

### `public/` Klasörü
Statik dosyalar. Tarayıcı tarafından doğrudan erişilebilir (örneğin, favicon, resimler). Yeni resim veya dosya eklemek için buraya koyun.

### `doc/` Klasörü
Dokümantasyon dosyaları. Bu doküman gibi MD dosyaları burada bulunur. Proje açıklamaları, API dokümantasyonları vb. için.

## Kullanım İpuçları
- **Yeni Sayfa Eklemek**: `src/app/` altına yeni klasör/dosya oluşturun (örneğin, `analytics/page.tsx`).
- **Yeni Bileşen Eklemek**: Paylaşılan ise `src/components/shared/`, UI ise `src/components/ui/` altına.
- **Yeni Özellik Eklemek**: `src/features/` altına yeni klasör oluşturun ve alt klasörleri (components, hooks, types) ekleyin.
- **Veri Yönetimi**: `src/features/[feature]/data.json` veya API entegrasyonu için hook'lar kullanın.
- **Stil ve Tema**: Tailwind CSS sınıfları ve ShadCN bileşenleriyle yönetin.

Bu yapı, ölçeklenebilir ve modüler bir yaklaşım sağlar. Kod eklerken ilgili klasörü bulun ve tutarlılığı koruyun!

---

## Klasörlerin Rolleri ve İçerik Rehberi

Bu bölüm, projedeki her ana klasörün **neyi ifade ettiğini** ve **hangi tür içeriklerin nereye geleceğini** özetler. Yeni bir şey eklerken bu rehberi kullanarak doğru yeri bulun. Aşağıda, klasör bazlı bir rehber sunulmuştur.

### 📁 Kök Düzey (`/`)
- **Rolü**: Projenin genel yapılandırması ve meta dosyaları. Uygulamanın çalışması için gerekli ayarlar burada toplanır.
- **Ne Gelir**:
  - Yapılandırma dosyaları (`.json`, `.config.*`).
  - Paket yönetimi ve bağımlılıklar (`package.json`).
  - Dokümantasyon (`README.md`, `doc/` klasörü).
  - Statik dosyalar (`public/`).

### 📁 `src/` (Kaynak Kodlar)
- **Rolü**: Tüm uygulama kodlarının merkezi. Next.js'in `src/` dizini yapısını kullanır, kodları düzenli ve modüler tutar.
- **Ne Gelir**:
  - Sayfa ve bileşen kodları.
  - Hook'lar, tipler ve yardımcı fonksiyonlar.
  - Özellik bazlı alt klasörler.

#### 📁 `src/app/`
- **Rolü**: Next.js App Router sayfaları ve layout'lar. Her dosya bir URL route'una karşılık gelir.
- **Ne Gelir**:
  - Sayfa dosyaları (`page.tsx`).
  - Layout dosyaları (`layout.tsx`).
  - Route grupları (örneğin, `(dashboard)/`).
  - Yeni sayfalar veya route'lar buraya eklenir.

#### 📁 `src/components/`
- **Rolü**: Yeniden kullanılabilir UI bileşenleri. Uygulamayı modüler hale getirir.
- **Ne Gelir**:
  - **shared/**: Uygulamaya özel bileşenler (sidebar, nav, charts).
  - **ui/**: Temel UI bileşenleri (button, input, ShadCN'den gelenler).
  - Yeni bileşenler: Paylaşılan ise `shared/`, genel UI ise `ui/` altına.

#### 📁 `src/config/`
- **Rolü**: Uygulama yapılandırması ve sabit veriler. Kod dışı ayarları merkezi hale getirir.
- **Ne Gelir**:
  - Navigasyon verileri (`navigation.ts`).
  - Diğer yapılandırma dosyaları (örneğin, tema ayarları, API URL'leri).

#### 📁 `src/features/`
- **Rolü**: Özellik bazlı modülerlik. Uygulamayı özelliklere göre ayırır (örneğin, dashboard, auth).
- **Ne Gelir**:
  - Özellik klasörleri (örneğin, `dashboard/`, `analytics/`).
  - Her özellik altında: `components/`, `hooks/`, `data.json`, `types/`.
  - Yeni özellikler buraya eklenir, alt yapıyı koruyarak.

#### 📁 `src/hooks/`
- **Rolü**: Özel React hook'ları. Mantığı yeniden kullanılabilir hale getirir.
- **Ne Gelir**:
  - Hook dosyaları (örneğin, `use-mobile.ts`).
  - Veri çekme, state yönetimi veya utility hook'ları.

#### 📁 `src/lib/`
- **Rolü**: Yardımcı fonksiyonlar ve araçlar. Genel utility'ler.
- **Ne Gelir**:
  - Utility fonksiyonları (`utils.ts`).
  - Diğer yardımcı kodlar (örneğin, API client'lar).

#### 📁 `src/types/`
- **Rolü**: TypeScript tip tanımları. Tip güvenliği sağlar.
- **Ne Gelir**:
  - Tip dosyaları (`index.ts`).
  - Veri modelleri, API tipleri, bileşen props'ları.

### 📁 `public/`
- **Rolü**: Statik dosyalar. Tarayıcı tarafından doğrudan erişilir.
- **Ne Gelir**:
  - Resimler, favicon, fontlar.
  - Diğer statik varlıklar.

### 📁 `doc/`
- **Rolü**: Dokümantasyon dosyaları. Proje hakkında bilgi verir.
- **Ne Gelir**:
  - MD dosyaları (bu doküman gibi).
  - API dokümantasyonları, rehberler.

### 🚀 Hızlı Ekleme Rehberi
| Ne Eklemek İstiyorum? | Nereye Gidecek? | Örnek |
|-----------------------|-----------------|-------|
| Yeni Sayfa | `src/app/` | `analytics/page.tsx` |
| Paylaşılan Bileşen | `src/components/shared/` | `user-profile.tsx` |
| UI Bileşeni | `src/components/ui/` | ShadCN komutu ile `ui/` altına |
| Yeni Özellik | `src/features/` | `analytics/` klasörü oluştur |
| Hook | `src/hooks/` | `use-auth.ts` |
| Yardımcı Fonksiyon | `src/lib/` | `format-date.ts` |
| Tip Tanımı | `src/types/` | `user.ts` |
| Yapılandırma | `src/config/` | `theme.ts` |
| Statik Dosya | `public/` | `logo.png` |
| Dokümantasyon | `doc/` | `api-guide.md` |

Bu rehber, projeyi düzenli tutmak için tasarlandı. Her ekleme sonrası bu dokümanı güncelleyin!