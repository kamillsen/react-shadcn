# React’te `children`, `ReactNode` ve “slot” mantığı (Panel örneği)

Bu not, aşağıdaki `Panel` örneği üzerinden **props**, **children**, **ReactNode**, **footer/actions gibi slot prop’ları**, **`{}` (süslü parantez)** ve **Fragment (`<>...</>`)** konularını toparlar.

> Amaç: Bu notu okuyan biri, component içine yazılanların **neden `children` olduğuna**, `footer` gibi isimli prop’ların **neden ayrıca verilmesi gerektiğine** ve `{}` kullanımının mantığına net şekilde hakim olsun.

---

## 1) Örnek kod (Panel)

```tsx
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
```

---

## 2) Panel’in mantığı: “Şablon + Slot”

`Panel` iki şeyi aynı anda yapıyor:

1. **Şablon/çerçeve kuruyor**  
   - `Card`, `CardHeader`, (opsiyonel) `CardFooter` gibi kısımlar **Panel’in kendi içindeki sabit yapısı**.
2. **İçeriği dışarıdan alıp belirli bir yere yerleştiriyor**  
   - `{children}` → Panel’in gövdesine (CardContent içine) geliyor.
   - `{footer}` → ayrı bir “slot” gibi, CardFooter içine geliyor.

> Bu yaklaşımın adı genelde **composition** (bileşim) veya **wrapper component** mantığıdır.

---

## 3) “Tag’lar arasına yazılan her şey `children` olur” ne demek?

Şu kullanım:

```tsx
<Panel title="X">
  <p>Merhaba</p>
  <Button>Kaydet</Button>
</Panel>
```

React/JSX bunu **otomatik olarak** şöyle yorumlar:

```tsx
<Panel
  title="X"
  children={
    <>
      <p>Merhaba</p>
      <Button>Kaydet</Button>
    </>
  }
/>
```

✅ Yani tag arası içerik **otomatik olarak `children` prop’una** gider.

### Önemli nokta
Bu otomatik kural **sadece `children` için vardır**.  
Başka bir isim (`footer`, `actions`, `headerRight` vs.) otomatik dolmaz.

---

## 4) Peki `CardHeader` kısmı children değil mi?

Hayır. `CardHeader` şu şekilde Panel’in *kendi template’i*:

```tsx
<CardHeader>
  <CardTitle>{title}</CardTitle>
  {description ? <CardDescription>{description}</CardDescription> : null}
</CardHeader>
```

Burada:
- `CardHeader` Panel’in içine yazıldığı için **her zaman render olur**
- Ama `title` ve `description` **props** olduğu için içerik değişebilir

**children** sadece şurada devreye girer:

```tsx
<CardContent>{children}</CardContent>
```

---

## 5) `{}` (süslü parantez) neden var?

JSX kuralı:

- String verirken: `prop="metin"`
- **JS ifadesi** verirken (JSX, sayı, boolean, obje, fonksiyon…): `prop={...}`

Bu yüzden:

```tsx
footer={ <Button>Kaydet</Button> }
```

doğru; ama

```tsx
footer=<Button>Kaydet</Button>
```

**geçersiz** (syntax hatası).

### Fragment (`<>...</>`) neden kullanıldı?
Çünkü `footer` içine **iki tane kardeş** buton koyuyoruz:

```tsx
footer={
  <>
    <Button variant="secondary">İptal</Button>
    <Button>Kaydet</Button>
  </>
}
```

Fragment, bu iki öğeyi “tek bir ReactNode” gibi paketler.

---

## 6) “children’da `{}` yok ama footer’da var” sorusunun cevabı

Bu kafa karıştıran ama çok net bir durum:

- `children` da bir **prop**tur.
- Ama genelde `children`’ı **explicit** (açıkça) yazmayız.
- Çünkü JSX, tag arası içeriği **kendisi `children` prop’una çevirir**.

Yani:

```tsx
<Panel>...</Panel>
```

otomatik olarak:

```tsx
<Panel children={...} />
```

demektir.

### `children`’ı explicit yazarsan?
O zaman `footer` gibi `{}` kullanırsın:

```tsx
<Panel
  title="X"
  children={<p>Merhaba</p>}
/>
```

> Kısaca: `{}` “children özel olduğu için yok” değil, `children` çoğu zaman **tag arası verildiği için** görünmüyor.

---

## 7) “Explicit” ne demek?

**Explicit** = *açıkça / özellikle yazarak* demek.

- Tag arası kullanım: `children` **implicit** (dolaylı/otomatik) gelir.
- `footer={...}` gibi yazmak: `footer` **explicit** (açıkça) verilmiştir.

---

## 8) Başka isimli prop’lar (actions/footer) niye otomatik dolmuyor?

JSX’in otomatik kuralı sadece şudur:

> `<Component>...</Component>` içindeki her şey → `children`

`actions`, `footer` gibi prop’lara içerik göndermek istiyorsan **özellikle belirtmen gerekir**:

```tsx
<Panel footer={<Button>Kaydet</Button>}>
  <p>Bu children</p>
</Panel>
```

Burada:
- `<p>...</p>` → `children`
- `<Button>...</Button>` → `footer`

---

## 9) Props’ların hepsi “verilmek zorunda mı”?

Bunu **TypeScript prop tipi** belirler:

- `title: string` → **zorunlu**
- `description?: string` → **opsiyonel**
- `footer?: ReactNode` → **opsiyonel**
- `children: ReactNode` → bu tanıma göre **zorunlu**

> `?` işareti “opsiyonel” demektir.

### `children` zorunlu olmasın istersen:
```ts
children?: ReactNode
```

---

## 10) Props’ların hepsi component içinde “kullanılmak zorunda mı”?

Hayır, **kullanmak zorunda değilsin**.

- TypeScript “prop’u alıp kullanmadın” diye genelde hata vermez.
- Ama ESLint gibi araçlar “unused variable” uyarısı gösterebilir.

**Kullanıp kullanmamak**, component’in tasarımına bağlıdır.

---

## 11) En iyi mental model

`Panel`’i bir “fonksiyon çağrısı” gibi düşün:

```tsx
<Panel title="A" footer={<Button>Kaydet</Button>}>
  <p>X</p>
</Panel>
```

kabaca şuna denk:

```ts
Panel({
  title: "A",
  footer: <Button>Kaydet</Button>,
  children: <p>X</p>,
})
```

Sonra Panel:
- `title` ve `description`’ı **Header’da**
- `children`’ı **Content’te**
- `footer`’ı **Footer’da**
render eder.

---

## 12) Kısa özet

- `children` **prop’tur** ama JSX, tag arası içeriği **otomatik `children` yapar**
- `footer/actions` gibi isimli slot’lar otomatik dolmaz, **explicit** verilir: `footer={...}`
- `{}` süslü parantez, prop’a **JS ifadesi/JSX** geçmek için kullanılır
- Fragment `<>...</>` birden fazla elementi tek `ReactNode` gibi taşımak içindir
- “Prop zorunluluğu” TypeScript tipinden (`?`) gelir; “kullanma zorunluluğu” yoktur

---
