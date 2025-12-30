"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function UseEffectIntroPage() {
  const sections = [
    {
      href: "/learn/hooks/effect/basic",
      title: "Temel useEffect",
      description: "Document title gibi basit useEffect örneği",
    },
    {
      href: "/learn/hooks/effect/fetch",
      title: "API Fetch Örneği",
      description: "Fake API veya gerçek fetch ile loading state yönetimi",
    },
    {
      href: "/learn/hooks/effect/cleanup",
      title: "Cleanup Örneği",
      description: "Timer veya event listener cleanup örneği",
    },
  ];

  return (
    <main className="p-6 space-y-8">
      {/* Başlık */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
          useEffect ile Yan Etkiler
        </h1>
        <p className="text-base text-neutral-700">
          useEffect, React bileşenini render sonrası <strong>dış dünya ile
          senkron</strong> hale getirmek için kullanılır. Örneğin:
        </p>
        <ul className="list-disc list-inside text-neutral-700 space-y-1">
          <li>API çağrısı</li>
          <li>document.title güncelleme</li>
          <li>timer veya event listener</li>
        </ul>
      </section>

      <Separator />

      {/* Örnekler */}
      <section className="grid gap-4 md:grid-cols-2">
        {sections.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>

      {/* Geri Butonu */}
      <section>
        <Link href="/learn/hook">
          <Button variant="outline">Hooks Ana Sayfa</Button>
        </Link>
      </section>
    </main>
  );
}
