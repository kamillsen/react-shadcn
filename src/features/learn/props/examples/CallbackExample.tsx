"use client"

import { useMemo, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// ✅ Child component: Parent'tan "fonksiyon prop" alır
function ProductRow({
  title,
  price,
  selected,
  onSelect,
}: {
  title: string
  price: number
  selected: boolean
  onSelect: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border p-3">
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{price} ₺</div>
      </div>

      {/* ÖNEMLİ: Handler "çağrılmaz", "geçilir" */}
      <Button onClick={onSelect} variant={selected ? "default" : "secondary"}>
        {selected ? "Seçildi" : "Seç"}
      </Button>
    </div>
  )
}

export default function CallbackExample() {
  // Parent veriyi tutar
  const products = useMemo(
    () => [
      { id: 1, title: "Kulaklık", price: 799, tag: "Popüler" as const },
      { id: 2, title: "Klavye", price: 1299, tag: "Yeni" as const },
      { id: 3, title: "Mouse", price: 499, tag: "İndirim" as const },
    ],
    []
  )

  // Parent state: seçili ürün
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const selected = products.find((p) => p.id === selectedId) ?? null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Callback Props</CardTitle>
        <CardDescription>
          Parent fonksiyonu props olarak verir, child tıklayınca çağırır.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Üstte seçilen ürünü gösteriyoruz (Parent state) */}
        <div className="rounded-lg border p-3">
          <div className="text-sm text-muted-foreground">Seçilen ürün:</div>

          {selected ? (
            <div className="mt-1 flex items-center justify-between gap-3">
              <div className="font-medium">{selected.title}</div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{selected.tag}</Badge>
                <Badge>{selected.price} ₺</Badge>
              </div>
            </div>
          ) : (
            <div className="mt-1 text-sm">Henüz seçim yok</div>
          )}
        </div>

        <Separator />

        {/* Liste: Child'lara callback prop veriyoruz */}
        <div className="space-y-2">
          {products.map((p) => (
            <ProductRow
              key={p.id}
              title={p.title}
              price={p.price}
              selected={p.id === selectedId}
              // Parametre geçirmek için ok fonksiyonla sarıyoruz
              onSelect={() => setSelectedId(p.id)}
            />
          ))}
        </div>

        {/* Parent tarafında reset de gösterebiliriz */}
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => setSelectedId(null)}>
            Seçimi temizle
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
