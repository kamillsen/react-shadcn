import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// 1) Child component: Props alır (parametre gibi)
function ProductCard({
  title,
  price,
  tag,
}: {
  title: string
  price: number
  tag: "Yeni" | "İndirim" | "Popüler"
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge variant="secondary">{tag}</Badge>
        </div>
        <CardDescription>Bu kart props ile doluyor</CardDescription>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <div className="text-sm">Fiyat: <b>{price} ₺</b></div>
        <Button size="sm">İncele</Button>
      </CardContent>
    </Card>
  )
}

// 2) Page: Parent component (veriyi tutar ve props ile aşağı verir)
export default function PropsPage() {
  const products = [
    { id: 1, title: "Kulaklık", price: 799, tag: "Popüler" as const },
    { id: 2, title: "Klavye", price: 1299, tag: "Yeni" as const },
    { id: 3, title: "Mouse", price: 499, tag: "İndirim" as const },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Props</h1>
      </div>

      <p className="text-sm text-muted-foreground">
        Parent (sayfa) veriyi tutar, child (ProductCard) props ile alıp render eder.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} title={p.title} price={p.price} tag={p.tag} />
        ))}
      </div>
    </div>
  )
}
