import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function MiniProductCard({ title, price }: { title: string; price: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title} <Badge>JSX</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>Fiyat: {price} ₺</CardContent>
    </Card>
  )
}

export default function ComponentsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Component & JSX</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <MiniProductCard title="Kulaklık" price={799} />
        <MiniProductCard title="Klavye" price={1299} />
        <MiniProductCard title="Mouse" price={499} />
      </div>
    </div>
  )
}
