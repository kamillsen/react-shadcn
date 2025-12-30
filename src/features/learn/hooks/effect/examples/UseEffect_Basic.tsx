"use client";

import { useState, useEffect } from "react";

export default function UseEffect_Basic() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Tıklama: ${count}`;
  }, [count]);

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-semibold">Temel useEffect</h2>
      <p className="text-neutral-700">
        Aşağıdaki butona tıkladıkça sayacı artırır ve
        <strong> document.title</strong> güncellenir:
      </p>
      <p className="text-lg font-medium">Count: {count}</p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Artır
      </button>
    </div>
  );
}
