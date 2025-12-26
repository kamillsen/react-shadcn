# React ShadCN Dashboard Projesi

Bu proje [Next.js](https://nextjs.org) 16.1.1 ile oluşturulmuş, [ShadCN UI](https://ui.shadcn.com/) bileşenleri ve modern React teknolojilerini kullanan gelişmiş bir dashboard uygulamasıdır.

## 🚀 Özellikler

- **Next.js 16.1.1** - App Router ile modern React framework'ü
- **React 19** - En güncel React sürümü
- **TypeScript** - Tip güvenliği
- **Tailwind CSS v4** - Modern CSS framework'ü
- **ShadCN UI** - Yüksek kaliteli, erişilebilir UI bileşenleri
- **Recharts** - Etkileşimli grafikler ve veri görselleştirme
- **TanStack Table** - Gelişmiş veri tabloları
- **Tabler Icons** - Tutarlı ikon seti

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router sayfaları
│   ├── (dashboard)/       # Dashboard route grubu
│   ├── globals.css        # Global stiller
│   ├── layout.tsx         # Ana layout
│   └── page.tsx           # Ana sayfa
├── components/            # React bileşenleri
│   ├── shared/           # Paylaşılan bileşenler
│   └── ui/               # ShadCN UI bileşenleri
├── config/               # Yapılandırma dosyaları
├── features/             # Özellik tabanlı modüller
├── hooks/                # Özel React hook'ları
├── lib/                  # Yardımcı fonksiyonlar
└── types/                # TypeScript tip tanımları
```

## 🛠️ Başlarken

### Gereksinimler

- Node.js 18+
- npm, yarn, pnpm veya bun

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

## 📊 Dashboard Özellikleri

- **İnteraktif Grafikler**: Recharts ile oluşturulmuş responsive grafikler
- **Veri Tabloları**: TanStack Table ile gelişmiş tablo işlevselliği
- **Responsive Tasarım**: Mobil uyumlu tasarım
- **Koyu/Açık Tema**: Otomatik tema desteği
- **Erişilebilirlik**: ShadCN UI bileşenleri ile tam erişilebilirlik desteği

## 🏗️ Geliştirme

### Kullanılan Teknolojiler

- **Frontend Framework**: Next.js 16.1.1
- **UI Kütüphanesi**: ShadCN UI (Radix UI temelli)
- **Styling**: Tailwind CSS v4
- **Icons**: Tabler Icons
- **Charts**: Recharts
- **Tables**: TanStack Table
- **Type Safety**: TypeScript

### Komutlar

- `npm run dev` - Geliştirme sunucusunu başlat
- `npm run build` - Üretim için derle
- `npm run start` - Üretim sunucusunu başlat
- `npm run lint` - Kod kalitesi kontrolü

## 📚 Daha Fazla Bilgi

Next.js hakkında daha fazla bilgi için:

- [Next.js Dokümantasyonu](https://nextjs.org/docs) - Next.js özellikleri ve API'leri
- [Next.js Öğren](https://nextjs.org/learn) - İnteraktif Next.js eğitimi

ShadCN UI hakkında:
- [ShadCN UI Dokümantasyonu](https://ui.shadcn.com/) - Bileşenler ve kullanım kılavuzu

## 🚀 Dağıtım

Bu uygulamayı dağıtmanın en kolay yolu [Vercel Platform](https://vercel.com/new) kullanmaktır.

Daha fazla bilgi için [Next.js dağıtım dokümantasyonunu](https://nextjs.org/docs/app/building-your-application/deploying) inceleyin.

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
