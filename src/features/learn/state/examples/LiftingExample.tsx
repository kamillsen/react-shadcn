"use client"

import { useMemo, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// 1) Child: sadece input gösterir, değişikliği parent'a bildirir
function ProductSearch({
  query,
  onQueryChange,
}: {
  query: string
  onQueryChange: (next: string) => void
}) {
  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground">Ara:</div>
      <Input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Örn: klavye"
      />
    </div>
  )
}

// 2) Child: listeyi gösterir, seçimi parent'a bildirir
function ProductList({
  items,
  selectedId,
  onSelect,
}: {
  items: { id: number; title: string; price: number; tag: string }[]
  selectedId: number | null
  onSelect: (id: number) => void
}) {
  return (
    <div className="space-y-2">
      {items.map((p) => {
        const selected = p.id === selectedId
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className={`w-full rounded-lg border p-3 text-left transition ${
              selected ? "border-primary" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="font-medium">{p.title}</div>
              <Badge variant="secondary">{p.tag}</Badge>
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{p.price} ₺</div>
          </button>
        )
      })}
    </div>
  )
}

// 3) Child: seçileni gösterir (kontrollü: sadece props okur)
function ProductDetails({
  product,
  onClear,
}: {
  product: { id: number; title: string; price: number; tag: string } | null
  onClear: () => void
}) {
  if (!product) {
    return (
      <div className="rounded-lg border p-4 text-sm text-muted-foreground">
        Detay görmek için soldan bir ürün seç.
      </div>
    )
  }

  return (
    <div className="rounded-lg border p-4 space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="text-lg font-semibold">{product.title}</div>
        <Badge>{product.price} ₺</Badge>
      </div>

      <div className="text-sm text-muted-foreground">Etiket: {product.tag}</div>

      <div className="pt-2">
        <Button variant="outline" onClick={onClear}>
          Seçimi temizle
        </Button>
      </div>
    </div>
  )
}

export default function LiftingExample() {
  // ✅ ORTAK STATE burada (parent)
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState<number | null>(null)

  // Demo verisi
  const products = useMemo(
    () => [
      { id: 1, title: "Kulaklık", price: 799, tag: "Popüler" },
      { id: 2, title: "Klavye", price: 1299, tag: "Yeni" },
      { id: 3, title: "Mouse", price: 499, tag: "İndirim" },
      { id: 4, title: "Monitör", price: 6499, tag: "Popüler" },
    ],
    []
  )

  // Filtre: query state’i değişince hem liste hem detay etkilenebilir
  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  )

  // Seçili ürün
  const selected = products.find((p) => p.id === selectedId) ?? null

  // Eğer filtre seçili ürünü dışarı atarsa seçimi temizlemek isteyebilirsin (opsiyonel)
  // Basit tutuyoruz: elle "Seçimi temizle" ile temizle.

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Lifting State Up</CardTitle>
        <CardDescription>
          State’i (query + selectedId) çocuklardan alıp en yakın ortak parent’a taşıyoruz,
          sonra props ile aşağı dağıtıyoruz.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search (child) -> parent state */}
        <ProductSearch query={query} onQueryChange={setQuery} />

        <div className="grid gap-4 md:grid-cols-2">
          {/* List (child) -> parent state */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Liste</div>
            <ProductList
              items={filtered}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          {/* Details (child) <- parent state */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Detay</div>
            <ProductDetails product={selected} onClear={() => setSelectedId(null)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
