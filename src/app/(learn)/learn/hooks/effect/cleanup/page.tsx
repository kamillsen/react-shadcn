"use client";

import Link from "next/link";
import UseEffect_Cleanup from "@/features/learn/hooks/effect/examples/UseEffect_Cleanup";

export default function UseEffectCleanupPage() {
  return (
    <main className="p-6 space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">useEffect Cleanup Örneği</h1>
        <p className="text-neutral-700">
          Timer veya abonelik temizleme örneği:
        </p>
      </section>

      <section className="bg-white p-4 rounded-lg shadow">
        <UseEffect_Cleanup />
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
