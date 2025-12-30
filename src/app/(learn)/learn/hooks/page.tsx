// src/app/(learn)/learn/hooks/page.tsx
import Link from "next/link";

const hooksSections = [
  {
    slug: "effect",
    title: "useEffect – Yan Etkiler ve Dış Dünya",
    description:
      "Bileşenini tarayıcı, API, timer gibi dış sistemlerle senkronize etmek için useEffect kullanırsın.",
  },
  {
    slug: "context",
    title: "useContext – Prop Drilling Yerine Paylaşılan State",
    description:
      "Veriyi her katmanda props geçirmek yerine, ağacın derinliklerine doğrudan paylaşmayı öğren.",
  },
  {
    slug: "performance",
    title: "useMemo & useCallback – Performans İnce Ayarı",
    description:
      "Gereksiz re-render’ları fark edip, pahalı hesaplamaları ve fonksiyon referanslarını stabilize et.",
  },
  {
    slug: "mini-project",
    title: "Mini Proje – Hooks ile Küçük Dashboard",
    description:
      "useEffect, useContext ve performans hook’larını tek bir küçük özellikte birleştir.",
  },
];

export default function HooksPage() {
  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">React Hooks</h1>
        <p className="text-sm text-neutral-600">
          Hooks, fonksiyon bileşenlerine süper güç ekleyen fonksiyonlardır.
          React bileşenine <strong>state</strong> eklemek, dış dünyayla{" "}
          <strong>senkron kalmak</strong> veya veriyi component ağacında
          paylaşmak için kullanılırlar.
        </p>
        <p className="text-sm text-neutral-600">
          Bu bölümde önce <strong>state ve render</strong> mantığını hatırlayıp,
          sonra <strong>yan etkiler</strong>, <strong>context</strong> ve{" "}
          <strong>performans odaklı hook’lara</strong> doğru adım adım ilerleyeceğiz.
        </p>

        {/* Eğer props/state için ayrı bir route'un varsa href'i projene göre düzelt */}
        <p className="text-xs text-neutral-500">
          State kavramına daha temel bir giriş için önce{" "}
          <Link href="/learn/state" className="underline">
            “Props &amp; State” bölümünü
          </Link>{" "}
          gözden geçirmen faydalı olabilir.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Öğrenme Yolu</h2>
        <ol className="list-decimal list-inside text-sm space-y-1">
          <li>State ve render mantığını hatırla.</li>
          <li>useEffect ile dış dünyayla senkronizasyonu öğren.</li>
          <li>useContext ile prop drilling problemini çöz.</li>
          <li>Gerektiğinde useMemo &amp; useCallback ile performans optimize et.</li>
          <li>Mini proje ile hepsini tek yerde topla.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Konular</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {hooksSections.map((section) => (
            <Link
              key={section.slug}
              href={`/learn/hooks/${section.slug}`}
              className="block rounded-md border border-neutral-200 p-4 hover:border-neutral-400 transition-colors"
            >
              <h3 className="text-sm font-semibold mb-1">{section.title}</h3>
              <p className="text-xs text-neutral-600">{section.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Hook Nedir, Ne Değildir?</h2>
        <ul className="list-disc list-inside text-sm space-y-1 text-neutral-700">
          <li>
            Hook, <strong>yalnızca bir fonksiyon</strong>dur; componentine ek
            davranış kazandırır.
          </li>
          <li>
            Esas amaç, <strong>state</strong> ve{" "}
            <strong>yan etkileri (effects)</strong> yönetmektir; “sihirli
            lifecycle” yazmak değildir.
          </li>
          <li>
            Tüm hook’lar, <strong>render mantığının üzerine oturur</strong>:
            önce render edilir, sonra effects çalışır.
          </li>
        </ul>
      </section>
    </main>
  );
}
