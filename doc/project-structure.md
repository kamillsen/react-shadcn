# Proje Yapısı Dokümantasyonu

Bu doküman, `react-shadcn-me` projesinin dosya yapısını detaylı bir şekilde açıklamaktadır. Proje, Next.js 16.1.1 ile geliştirilmiş, React 19, TypeScript ve ShadCN UI kullanan bir dashboard uygulamasıdır. Aşağıda, projenin genel yapısı ASCII çizimiyle gösterilmiştir. Ardından, her klasör ve dosyanın neyi ifade ettiği, ne barındırdığı ve içerdiği kodların işlevleri açıklanmıştır.

## Genel Dosya Yapısı

```
├── components.json
├── doc
│   ├── AppRouter
│   │   └── nextjs-app-router-felsefesi.md
│   ├── context-provider
│   │   └── kutu-ornegi-react-context.md
│   ├── done.txt
│   ├── hooks
│   │   ├── state
│   │   │   └── react-useState-notlari.md
│   │   ├── useCallback
│   │   │   ├── useCallback-notu.md
│   │   │   └── useCallback_performans_rehberi.md
│   │   ├── useContext
│   │   │   ├── react-useContext-kilavuz.md
│   │   │   └── tree.txt
│   │   ├── useEffect
│   │   │   └── react-useEffect-temel-notlar.md
│   │   └── useMemo
│   │       └── useMemo-not.md
│   ├── kaynak.txt
│   ├── link.txt
│   ├── nextjs-app-router-render-kural-notlari.md
│   ├── project-structure.md
│   ├── props
│   │   ├── react-callback-props-selectedid-notlari.md
│   │   ├── react-children-panel-notlari.md
│   │   └── react-lifting-vs-callback-extended.md
│   ├── react-nextjs-roadmap.md
│   ├── todo-app
│   │   ├── Theme-Context-Anlatim
│   │   │   ├── theme-context-core-note.md
│   │   │   └── theme-useeffect-dokumani.md
│   │   └── todo-app-plan.md
│   ├── tree-code.txt
│   └── ts
│       ├── react-state-object-spread.md
│       └── type-vs-interface-notlar.md
├── eslint.config.mjs
├── .gitignore
├── next.config.ts
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── README.md
├── src
│   ├── app
│   │   ├── (dashboard)
│   │   │   ├── dashboard
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── (learn)
│   │   │   └── learn
│   │   │       ├── components
│   │   │       │   └── page.tsx
│   │   │       ├── hooks
│   │   │       │   ├── context
│   │   │       │   │   ├── layout.tsx
│   │   │       │   │   └── page.tsx
│   │   │       │   ├── effect
│   │   │       │   │   ├── basic
│   │   │       │   │   │   └── page.tsx
│   │   │       │   │   ├── cleanup
│   │   │       │   │   │   └── page.tsx
│   │   │       │   │   ├── fetch
│   │   │       │   │   │   └── page.tsx
│   │   │       │   │   └── page.tsx
│   │   │       │   └── page.tsx
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx
│   │   │       ├── props
│   │   │       │   ├── basic
│   │   │       │   │   └── page.tsx
│   │   │       │   ├── callback
│   │   │       │   │   └── page.tsx
│   │   │       │   ├── children
│   │   │       │   │   └── page.tsx
│   │   │       │   ├── layout.tsx
│   │   │       │   └── page.tsx
│   │   │       └── state
│   │   │           ├── basic
│   │   │           │   └── page.tsx
│   │   │           ├── layout.tsx
│   │   │           ├── lifting
│   │   │           │   └── page.tsx
│   │   │           ├── objects-arrays
│   │   │           │   └── page.tsx
│   │   │           └── page.tsx
│   │   ├── page.tsx
│   │   └── (todo-app)
│   │       └── todo-app
│   │           ├── layout.tsx
│   │           └── page.tsx
│   ├── components
│   │   ├── shared
│   │   │   ├── app-sidebar.tsx
│   │   │   ├── chart-area-interactive.tsx
│   │   │   ├── data-table.tsx
│   │   │   ├── nav-documents.tsx
│   │   │   ├── nav-main.tsx
│   │   │   ├── nav-secondary.tsx
│   │   │   ├── nav-user.tsx
│   │   │   ├── search-form.tsx
│   │   │   ├── section-cards.tsx
│   │   │   └── site-header.tsx
│   │   ├── typography-demo.tsx
│   │   └── ui
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       └── tooltip.tsx
│   ├── config
│   │   └── navigation.ts
│   ├── features
│   │   ├── dashboard
│   │   │   ├── api
│   │   │   ├── components
│   │   │   ├── data.json
│   │   │   └── hooks
│   │   ├── learn
│   │   │   ├── hooks
│   │   │   │   ├── context
│   │   │   │   │   └── theme
│   │   │   │   │       ├── ThemeContext.tsx
│   │   │   │   │       ├── ThemeProvider.tsx
│   │   │   │   │       └── ThemeToggle.tsx
│   │   │   │   └── effect
│   │   │   │       └── examples
│   │   │   │           ├── UseEffect_Basic.tsx
│   │   │   │           ├── UseEffect_Cleanup.tsx
│   │   │   │           └── UseEffect_Fetch.tsx
│   │   │   ├── props
│   │   │   │   └── examples
│   │   │   │       ├── BasicPropsExample.tsx
│   │   │   │       ├── CallbackExample.tsx
│   │   │   │       └── ChildrenExample.tsx
│   │   │   └── state
│   │   │       └── examples
│   │   │           ├── BasicStateExample.tsx
│   │   │           ├── LiftingExample.tsx
│   │   │           └── ObjectsArraysExample.tsx
│   │   └── todo
│   │       ├── components
│   │       │   ├── EditDialog.tsx
│   │       │   ├── Filters.tsx
│   │       │   ├── ThemeToggle.tsx
│   │       │   ├── TodoForm.tsx
│   │       │   ├── TodoItem.tsx
│   │       │   ├── TodoList.tsx
│   │       │   └── TodoStats.tsx
│   │       ├── context
│   │       │   ├── ThemeContext.tsx
│   │       │   ├── theme.types.ts
│   │       │   └── TodoContext.tsx
│   │       ├── data
│   │       │   └── mock-todos.ts
│   │       ├── hooks
│   │       │   ├── useTodoActions.ts
│   │       │   ├── useTodoFilters.ts
│   │       │   └── useTodos.ts
│   │       ├── types
│   │       │   └── index.ts
│   │       └── utils
│   │           ├── localStorage.ts
│   │           └── todoHelpers.ts
│   ├── hooks
│   │   └── use-mobile.ts
│   ├── lib
│   │   └── utils.ts
│   └── types
│       └── index.ts
└── tsconfig.json


```

## Detaylı Açıklamalar

### Kök Düzey Dosyaları
Bu dosyalar, projenin genel yapılandırmasını ve bağımlılıklarını yönetir. Yeni özellik eklerken bu dosyaları nadiren değiştireceksiniz, ancak bağımlılık eklemek için `package.json`'a bakabilirsiniz.

- **`.git/`**: Git versiyon kontrol sistemi dosyalarını barındırır. Projenin tüm versiyon geçmişi ve yapılandırması burada saklanır.
- **`.gitignore`**: Git tarafından yoksayılan dosyalar. Ortama özgü ayarları, derleme çıktılarını ve hassas bilgileri (örneğin, API anahtarları) izleme dışı bırakmak için kullanılır.
- **`components.json`**: ShadCN UI kütüphanesinin yapılandırma dosyası. UI bileşenlerinin nerede kurulacağı, hangi stilleri kullanacağı gibi ayarları içerir.
- **`eslint.config.mjs`**: Kod kalitesi için ESLint kuralları. Kod yazarken hataları yakalar ve tutarlılığı sağlar.
- **`next-env.d.ts`**: Next.js'in TypeScript tiplerini tanımlar. Otomatik olarak oluşturulur, elle düzenlenmez.
- **`next.config.ts`**: Next.js uygulama ayarları (örneğin, derleme seçenekleri, yönlendirmeler). `src/` klasörü kullanımı için gerekli ayarlar burada yapılır.
- **`package-lock.json`**: `package.json`'daki bağımlılıkların tam ve kilitli versiyonlarını içerir. Bu sayede farklı ortamlarda aynı bağımlılık setinin kurulması garanti edilir.
- **`package.json`**: Proje bağımlılıkları, script'ler (örneğin, `npm run dev`) ve proje meta verileri. Yeni paket eklemek için burayı düzenleyin.
- **`postcss.config.mjs`**: CSS işleme için PostCSS ayarları. Tailwind CSS entegrasyonu burada yapılır.
- **`README.md`**: Proje açıklaması, kurulum talimatları ve kullanım rehberi. Dokümantasyon için başlangıç noktası.
- **`tsconfig.json`**: TypeScript derleyici ayarları. Yol alias'ları (`@/*`) burada tanımlanır, modül çözümlemesi için kritik.

### `src/` Klasörü
Kaynak kodların bulunduğu ana klasör. Tüm uygulama kodları burada yer alır. Bu yapı, Next.js'in `src/` dizini kullanımını destekler ve kodları düzenli tutar.

#### `src/app/`
Next.js App Router yapısı. Sayfa ve layout dosyaları burada bulunur. Her dosya bir route'a karşılık gelir.

- **`favicon.ico`**: Tarayıcı sekmesinde görünen site ikonu.
- **`globals.css`**: Global CSS stilleri. Tailwind CSS yapılandırması ve genel stil tanımlamaları içerir.
- **`layout.tsx`**: Ana uygulama layout'u. Tüm sayfalar için ortak yapı (örneğin, HTML head, genel stiller). `SidebarProvider` ve genel bileşenleri içerir.
- **`page.tsx`**: Ana sayfa (home route). Basit bir karşılama sayfası veya yönlendirme yapabilir.
- **`(dashboard)/`**: Route grubu. Dashboard ile ilgili sayfaları gruplar.
  - **`layout.tsx`**: Dashboard sayfaları için özel layout. Sidebar ve header'ı içerir, dashboard'a özgü stiller uygular.
  - **`dashboard/page.tsx`**: Dashboard ana sayfası. Kartlar, grafikler ve tabloları gösterir. Veri çekme ve bileşen render'ını yönetir.
- **`(learn)/`**: Route grubu. Learn modülü ile ilgili sayfaları gruplar.
  - **`learn/layout.tsx`**: Learn modülü sayfaları için özel layout.
  - **`learn/page.tsx`**: Learn modülünün ana sayfası.
  - **`learn/components/page.tsx`**: Bileşen öğrenme sayfası.
  - **`learn/hook/page.tsx`**: Hook'lar genel sayfası.
    - **`learn/hook/context/page.tsx`**: `useContext` hook'u ile ilgili örneklerin bulunduğu sayfa.
    - **`learn/hook/effect/page.tsx`**: `useEffect` hook'u ile ilgili örneklerin bulunduğu sayfa.
      - **`learn/hook/effect/basic/page.tsx`**: Temel `useEffect` kullanımı sayfası.
      - **`learn/hook/effect/cleanup/page.tsx`**: `useEffect` cleanup fonksiyonu kullanımı sayfası.
      - **`learn/hook/effect/fetch/page.tsx`**: `useEffect` ile veri çekme örnek sayfası.
  - **`learn/props/layout.tsx`**: Props öğrenme modülü için layout.
  - **`learn/props/page.tsx`**: Props modülünün ana sayfası.
    - **`learn/props/basic/page.tsx`**: Temel props kullanımı sayfası.
    - **`learn/props/callback/page.tsx`**: Callback props kullanımı sayfası.
    - **`learn/props/children/page.tsx`**: Children props kullanımı sayfası.
  - **`learn/state/layout.tsx`**: State öğrenme modülü için layout.
  - **`learn/state/page.tsx`**: State modülünün ana sayfası.
    - **`learn/state/basic/page.tsx`**: Temel state kullanımı sayfası.
    - **`learn/state/lifting/page.tsx`**: State kaldırma (lifting state up) sayfası.
    - **`learn/state/objects-arrays/page.tsx`**: Nesne ve dizi state yönetimi sayfası.

#### `src/components/`
Yeniden kullanılabilir UI bileşenleri. İki alt klasöre ayrılır: `shared` ve `ui`.

- **`typography-demo.tsx`**: Tipografi örneklerini ve kullanımını gösteren demo bileşeni.
- **`shared/`**: Uygulamaya özel, paylaşılan bileşenler. Dashboard ve genel kullanım için.
  - **`app-sidebar.tsx`**: Ana sidebar bileşeni. Navigasyon menülerini, kullanıcı bilgilerini ve hızlı eylemleri içerir. ShadCN Sidebar bileşenlerini kullanır.
  - **`chart-area-interactive.tsx`**: Etkileşimli grafik alanı. Recharts kütüphanesi ile veri görselleştirme yapar, filtreleme ve zaman aralığı seçimi sağlar.
  - **`data-table.tsx`**: Veri tablosu. TanStack Table ile sıralanabilir, filtrelenebilir tablolar oluşturur. Dashboard verilerini listeler.
  - **`nav-documents.tsx`**: Belgeler için navigasyon bileşeni.
  - **`nav-main.tsx`**: Ana navigasyon bileşeni.
  - **`nav-secondary.tsx`**: İkincil navigasyon bileşeni.
  - **`nav-user.tsx`**: Kullanıcı menüsü navigasyon bileşeni.
  - **`search-form.tsx`**: Arama formu bileşeni.
  - **`section-cards.tsx`**: Kartlar bölümü. Metrik kartlarını (gelir, müşteriler vb.) gösterir, badge'lar ve trend göstergeleri içerir.
  - **`site-header.tsx`**: Sayfa başlığı. Başlık metni, breadcrumb ve ek eylemler (örneğin, GitHub bağlantısı) barındırır.

- **`ui/`**: ShadCN UI bileşenleri. Radix UI üzerine inşa edilmiş, yeniden kullanılabilir temel bileşenler. Her dosya bir UI öğesi için (button, input vb.). Bu bileşenler, tasarım sistemi için temel oluşturur ve doğrudan ShadCN'den gelir. Yeni bileşen eklemek için `npx shadcn@latest add [component]` komutunu kullanın.
  - **`alert.tsx`**: Uyarı mesajları göstermek için kullanılan bileşen.
  - **`avatar.tsx`**: Kullanıcı avatarlarını görüntülemek için.
  - **`badge.tsx`**: Kısa etiketler veya durum göstergeleri için rozet bileşeni.
  - **`breadcrumb.tsx`**: Sayfa hiyerarşisini gösteren navigasyon (breadcrumb).
  - **`button.tsx`**: Etkileşimli düğmeler.
  - **`card.tsx`**: İçerik gruplamak ve vurgulamak için kart bileşeni.
  - **`chart.tsx`**: Çeşitli grafiklerin çizilmesi için kullanılan temel bileşen.
  - **`checkbox.tsx`**: Onay kutusu.
  - **`collapsible.tsx`**: İçeriği gizleyip göstermek için kullanılan bileşen.
  - **`drawer.tsx`**: Ekranın kenarından açılan çekmece menü veya panel.
  - **`dropdown-menu.tsx`**: Açılır menüler.
  - **`input.tsx`**: Metin girişi ve diğer form elemanları için giriş alanı.
  - **`label.tsx`**: Form elemanları için etiket.
  - **`select.tsx`**: Seçenek listesi sunan seçim bileşeni.
  - **`separator.tsx`**: İçeriği ayırmak için kullanılan görsel ayırıcı.
  - **`sheet.tsx`**: Ekranın kenarından açılan bir panel (drawer'a benzer).
  - **`sidebar.tsx`**: Yan menü bileşeni.
  - **`skeleton.tsx`**: İçerik yüklenirken geçici yer tutucu (iskelet) etkisi.
  - **`sonner.tsx`**: Bildirim mesajları göstermek için (toast bildirimleri).
  - **`table.tsx`**: Tablo verilerini düzenli bir şekilde göstermek için.
  - **`tabs.tsx`**: İçeriği sekmeler halinde düzenlemek için.
  - **`toggle-group.tsx`**: Birden fazla toggle düğmesini gruplamak için.
  - **`toggle.tsx`**: İki durumlu anahtar düğmesi.
  - **`tooltip.tsx`**: Bir elemanın üzerine gelindiğinde bilgi gösteren ipucu.

#### `src/config/`
Yapılandırma dosyaları. Uygulama ayarları ve sabit veriler burada.

- **`navigation.ts`**: Navigasyon menüsü verileri. Sidebar'daki menü öğeleri (Dashboard, Analytics vb.) burada tanımlanır. İkonlar, etiketler ve bağlantılar içerir.

#### `src/features/`
Özellik bazlı klasörleme. Uygulamayı özelliklere göre ayırır (örneğin, dashboard, auth). Gelecekte yeni özellikler (analytics, reports) için kolay genişletme sağlar.

- **`dashboard/`**: Dashboard özelliği için dosyalar.
  - **`api/`**: Dashboard ile ilgili API servislerini veya mock API dosyalarını içerir.
  - **`components/`**: Dashboard'a özel bileşenler (henüz boş, gelecekte ekleme için hazır).
  - **`data.json`**: Dashboard verileri. Grafik ve tablo için örnek veri seti. Gerçek uygulamada API'den gelir.
  - **`hooks/`**: Dashboard'a özel hook'lar (henüz boş, veri çekme veya state yönetimi için).

- **`learn/`**: Öğrenme modülü için dosyalar.
  - **`hook/`**: Hook'lar ile ilgili örnekler ve açıklamalar.
    - **`context/ThemeContext.tsx`**: `useContext` örnekleri için tema bağlamı sağlayıcısı.
    - **`examples/`**: Hook örnek bileşenleri.
      - **`UseContext_PropDrillingProblem.tsx`**: `useContext` olmadan prop delme sorununu gösteren örnek.
      - **`UseContext_ThemeSwitcher.tsx`**: `useContext` ile tema değiştirici örneği.
      - **`UseContext_WithProvider.tsx`**: `useContext` hook'unun `Provider` ile nasıl kullanıldığını gösteren örnek.
      - **`UseEffect_Basic.tsx`**: Temel `useEffect` kullanımı.
      - **`UseEffect_Cleanup.tsx`**: `useEffect` cleanup fonksiyonu kullanımı.
      - **`UseEffect_Fetch.tsx`**: `useEffect` ile veri çekme örneği.
  - **`props/`**: Props ile ilgili örnekler ve açıklamalar.
    - **`examples/`**: Props örnek bileşenleri.
      - **`BasicPropsExample.tsx`**: Temel props kullanımı.
      - **`CallbackExample.tsx`**: Callback props kullanımı.
      - **`ChildrenExample.tsx`**: `children` props kullanımı.
  - **`state/`**: State yönetimi ile ilgili örnekler.
    - **`examples/`**: State örnek bileşenleri.
      - **`BasicStateExample.tsx`**: Temel state kullanımı.
      - **`LiftingExample.tsx`**: State kaldırma (lifting state up) örneği.
      - **`ObjectsArraysExample.tsx`**: Nesne ve dizi state yönetimi örneği.

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

- **`file.svg`**: Genel bir dosya ikonunu temsil eden SVG dosyası.
- **`globe.svg`**: Bir dünya küresini temsil eden SVG dosyası, genellikle global veya uluslararası içerikler için kullanılır.
- **`next.svg`**: Next.js logosunu temsil eden SVG dosyası.
- **`vercel.svg`**: Vercel logosunu temsil eden SVG dosyası.
- **`window.svg`**: Bir pencere ikonunu temsil eden SVG dosyası, genellikle bir uygulamadaki pencere veya düzen ile ilgili özellikler için kullanılır.

### `doc/` Klasörü
Dokümantasyon dosyaları. Bu doküman gibi MD dosyaları burada bulunur. Proje açıklamaları, API dokümantasyonları vb. için.

- **`kaynak.txt`**: Projeyle ilgili kaynak linkleri veya referansları içeren metin dosyası.
- **`link.txt`**: Projeyle ilgili çeşitli bağlantıları içeren metin dosyası.
- **`nextjs-app-router-render-kural-notlari.md`**: Next.js App Router'daki render kuralları hakkında notlar.
- **`project-structure.md`**: Bu doküman. Projenin dosya yapısını açıklar.
- **`react-nextjs-roadmap.md`**: React ve Next.js öğrenme yol haritası hakkında bir doküman.
- **`props/`**: Props ile ilgili ek dokümantasyonların bulunduğu klasör.
  - **`react-callback-props-selectedid-notlari.md`**: React'te callback props ve `selectedId` kullanımıyla ilgili notlar.
  - **`react-children-panel-notlari.md`**: React'te `children` props'u ile panel oluşturma notları.
  - **`react-lifting-vs-callback-extended.md`**: State kaldırma (lifting state up) ve callback props arasındaki farkları genişletilmiş olarak açıklayan notlar.

## Klasörlerin Rolleri ve İçerik Rehberi

Bu bölüm, projedeki her klasörün neyi ifade ettiğini ve hangi tür içeriklerin nereye geleceğini özetler. Yeni özellik eklerken bu rehberi kullanın.

| Klasör Yolu | Rolü ve İçeriği |
|-------------|-----------------|
| `src/app/` | Next.js App Router sayfaları. Her alt klasör/dosya bir route'a karşılık gelir. Yeni sayfa eklemek için buraya `page.tsx` dosyası oluşturun. |
| `src/components/shared/` | Uygulamaya özel paylaşılan bileşenler. Dashboard veya genel kullanım için yeniden kullanılabilir parçalar (örneğin, `AppSidebar`, `DataTable`). |
| `src/components/ui/` | ShadCN UI temel bileşenleri. Button, input gibi tasarım sistemi bileşenleri. Yeni UI bileşeni eklemek için `npx shadcn@latest add [component]` kullanın. |
| `src/config/` | Yapılandırma dosyaları. Navigasyon verileri, tema ayarları vb. Sabit veriler burada. |
| `src/features/` | Özellik bazlı modüller. Her özellik (dashboard, learn) kendi klasöründe toplanır. Altında `components/`, `hooks/`, `api/` vb. bulunur. Yeni özellik için yeni klasör oluşturun. |
| `src/hooks/` | Genel React hook'ları. Uygulama genelinde kullanılan özel hook'lar (örneğin, `use-mobile`). |
| `src/lib/` | Yardımcı fonksiyonlar ve araçlar. Utility fonksiyonları, API client'lar vb. |
| `src/types/` | TypeScript tip tanımları. Veri modelleri, API tipleri vb. |
| `public/` | Statik dosyalar. Resimler, favicon vb. Tarayıcı tarafından doğrudan erişilebilir. |
| `doc/` | Dokümantasyon dosyaları. MD dosyaları, notlar vb. Proje açıklamaları burada. |

## Kullanım İpuçları
- **Yeni Sayfa Eklemek**: `src/app/` altına yeni klasör/dosya oluşturun (örneğin, `analytics/page.tsx`).
- **Yeni Bileşen Eklemek**: Paylaşılan ise `src/components/shared/`, UI ise `src/components/ui/` altına.
- **Yeni Özellik Eklemek**: `src/features/` altına yeni klasör oluşturun ve alt klasörleri (components, hooks, types) ekleyin.
- **Veri Yönetimi**: `src/features/[feature]/data.json` veya API entegrasyonu için hook'lar kullanın.
- **Stil ve Tema**: Tailwind CSS sınıfları ve ShadCN bileşenleriyle yönetin.

Bu yapı, ölçeklenebilir ve modüler bir yaklaşım sağlar. Kod eklerken ilgili klasörü bulun ve tutarlılığı koruyun!