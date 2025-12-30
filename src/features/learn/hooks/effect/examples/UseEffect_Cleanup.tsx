"use client";

import { useEffect, useState } from "react";

export default function UseEffect_Cleanup() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm space-y-2">
      <h2 className="text-xl font-semibold">Cleanup Örneği</h2>
      <p className="text-neutral-700">
        Bu örnekte her saniye sayaç artar. Component unmount olduğunda timer
        temizlenir.
      </p>
      <p className="text-lg font-medium">
        Geçen saniye: {seconds}
      </p>
    </div>
  );
}
