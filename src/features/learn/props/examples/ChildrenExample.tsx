import type { ReactNode } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

/**
 * PANEL = "Çerçeve" component'i
 * - title/description: dışarıdan gelen props
 * - children: Panel'in içine yazdığın içerik
 * - footer: opsiyonel ikinci bir slot (yine ReactNode)
 */
function Panel({
  title,
  description,
  children,
  footer,
}: {
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>

      {/* 👇 Panel'in "içi" tamamen children'dan gelir */}
      <CardContent className="space-y-3">{children}</CardContent>

      {/* 👇 Footer ayrı bir slot gibi düşün (opsiyonel) */}
      {footer ? <CardFooter className="justify-end gap-2">{footer}</CardFooter> : null}
    </Card>
  )
}

export default function ChildrenExample() {
  return (
    <div className="space-y-4">
      <Panel
        title="Children ile içerik ekleme"
        description="Component'in içine yazdığın her şey children olarak gelir."
        footer={
          <>
            <Button variant="secondary">İptal</Button>
            <Button>Kaydet</Button>
          </>
        }
      >
        {/* ✅ Bu bloğun tamamı Panel'e children olarak gider */}
        <p className="text-sm text-muted-foreground">
          Burada yazdığın JSX, Panel component'inin içinde <b>{`{children}`}</b> olarak render edilir.
        </p>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">composition</Badge>
          <Badge variant="secondary">wrapper</Badge>
          <Badge variant="secondary">slot</Badge>
        </div>

        <ul className="list-disc pl-5 text-sm">
          <li>Panel sadece çerçeveyi kurar</li>
          <li>İçerik dışarıdan gelir (children)</li>
          <li>Böylece tekrar kullanılabilir bir “kutu” elde edersin</li>
        </ul>
      </Panel>

      <Panel title="Aynı Panel, farklı içerik">
        <div className="flex items-center justify-between rounded-md border p-3">
          <div>
            <div className="font-medium">Bildirimler</div>
            <div className="text-sm text-muted-foreground">3 okunmamış mesaj</div>
          </div>
          <Button size="sm">Göster</Button>
        </div>
      </Panel>
    </div>
  )
}
