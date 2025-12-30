"use client";

import Link from "next/link";
import UseEffect_Basic from "@/features/learn/hooks/effect/examples/UseEffect_Basic";

export default function UseEffectBasicPage() {
  return (
    <main className="p-6 space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">Temel useEffect Örneği</h1>
        <p className="text-neutral-700">
          useEffect’in temel kullanımını gösteren örnek:
        </p>
      </section>

      <section className="bg-white p-4 rounded-lg shadow">
        <UseEffect_Basic />
      </section>

      <section>
        <Link href="/learn/hooks/effect">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">
            Geri
          </button>
        </Link>
      </section>
    </main>
  );
}
