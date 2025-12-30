# React’te Callback Props + `selectedId` akışı (satır satır, mantıkla)

Bu not, aşağıdaki örnek üzerinden **callback prop (fonksiyon prop)**, **state**, **`selected`**, **`variant`**, **`selectedId / setSelectedId`** ve “**handler çağrılmaz, geçilir**” mantığını *akış halinde* anlatır.

> Hedef: Kodu ezberlemeden, “hangi satır neyi değiştiriyor, tıklayınca neler oluyor?” sorusunu netleştirmek.

---

## 1) Örnek Kod

```tsx
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
```

---

## 2) Büyük Resim: Parent–Child görev paylaşımı

Bu örnekte kural şu:

- **Parent (`CallbackExample`)** → veriyi ve state’i tutar (**seçili ürün kim?**)
- **Child (`ProductRow`)** → sadece satırı çizer; tıklanınca parent’a haber verir

> Bu yaklaşım React’te “tek kaynak (single source of truth)” mantığını korur: seçim bilgisi *tek bir yerde* (`selectedId`) durur.

---

## 3) `selectedId` nedir?

```ts
const [selectedId, setSelectedId] = useState<number | null>(null)
```

Bu satır 2 şey üretir:

1. **`selectedId`**: Şu an seçili ürünün id’si  
   - Başlangıç `null` → “henüz seçim yok”
2. **`setSelectedId`**: `selectedId`’yi değiştiren fonksiyon  
   - `setSelectedId(2)` → seçili id 2 olur  
   - `setSelectedId(null)` → seçim temizlenir

> “`selectedId` değişken gibi duruyor ama aşağıda parametre almış” gibi bir his oluyorsa:  
> Parametre alan **`selectedId` değil**, **`setSelectedId`**’dir.

---

## 4) `selected` nedir? Ne tutuyor?

`ProductRow` içindeki `selected`, her satır için:

- **Bu ürün seçili mi?** → `true/false`

Parent bunu şöyle hesaplayıp gönderir:

```tsx
selected={p.id === selectedId}
```

Yani:

- Eğer satırın id’si seçili id’ye eşitse → `selected = true`
- Değilse → `selected = false`

---

## 5) `variant={selected ? "default" : "secondary"}` ne demek?

Bu satır **UI stili** seçtirir:

```tsx
variant={selected ? "default" : "secondary"}
```

- `selected === true` → `variant="default"` (genelde “aktif/primary” görünüm)
- `selected === false` → `variant="secondary"` (daha “pasif/ikincil” görünüm)

Aynı `selected` bilgisi buton yazısını da değiştirir:

```tsx
{selected ? "Seçildi" : "Seç"}
```

Özet:
- `selected=true` → Buton: **Seçildi** + aktif görünüm
- `selected=false` → Buton: **Seç** + pasif görünüm

---

## 6) “Handler çağrılmaz, geçilir” ne demek?

Child tarafında:

```tsx
<Button onClick={onSelect} ... />
```

Bu doğru kullanım. Çünkü `onClick` bir **fonksiyon** ister.

### ✅ Doğru
```tsx
onClick={onSelect}
```
- React click olunca `onSelect()` çağırır.

### ❌ Yanlış
```tsx
onClick={onSelect()}
```
- Bu, fonksiyonu **hemen render sırasında** çalıştırır.
- Click’i beklemez → çoğu zaman bug.

> Kural: Event prop’larına **fonksiyon verilir**, fonksiyonun sonucu değil.

---

## 7) `onSelect` ne yapar?

Child “ne yapacağını bilmez”, sadece *olayı bildirir*:

- “Butona tıklandı” → `onSelect()` çağır

Child’ın tek görevi:

```tsx
<Button onClick={onSelect} ... />
```

`onSelect` fonksiyonunun içinde ne olacağına **parent karar verir**.

---

## 8) Parent `onSelect`’e ne veriyor?

Listeyi render ederken:

```tsx
onSelect={() => setSelectedId(p.id)}
```

Bu ne demek?

- “Bu satırın butonuna tıklanırsa → seçili id’yi bu ürünün id’sine set et”

### Neden ok fonksiyonla sarıyoruz?

Şu yanlış olur:

```tsx
onSelect={setSelectedId(p.id)} // ❌ render anında çalışır
```

Doğru olan:

```tsx
onSelect={() => setSelectedId(p.id)} // ✅ click olunca çalışır
```

`()` => ... demek:
- “Şimdi çalıştırma, sonra (tıklanınca) çalıştır.”

---

## 9) Tıklayınca neler oluyor? (Gerçek akış)

Örnek: “Klavye” (id=2) satırında **Seç** butonuna tıklayın.

1) Kullanıcı tıklar  
2) Child’daki `onClick={onSelect}` tetiklenir  
3) `onSelect()` çalışır  
4) Ama `onSelect`, parent’ın verdiği fonksiyondur:  
   - Bu satır için `onSelect = () => setSelectedId(2)`
5) `setSelectedId(2)` state’i günceller  
6) Parent (`CallbackExample`) yeniden render olur  
7) Her satır için tekrar hesaplanır:
   - `selected={p.id === selectedId}`
8) id=2 olan satır `selected=true` olur → buton “Seçildi” + `variant="default"`  
9) Üstteki “Seçilen ürün” kutusu da güncellenir

> Görsel değişiklikler **state değiştiği için** olur.

---

## 10) Üstteki “Seçilen ürün” kutusu nasıl çalışıyor?

```ts
const selected = products.find((p) => p.id === selectedId) ?? null
```

- `selectedId=null` → `selected=null` → “Henüz seçim yok”
- `selectedId=2` → `selected={...Klavye...}` → seçilen ürün bilgisi gösterilir

Sonra JSX:

```tsx
{selected ? ( ...ürün bilgisi... ) : ( ...Henüz seçim yok... )}
```

---

## 11) “Seçimi temizle” butonu ne yapıyor?

```tsx
<Button variant="outline" onClick={() => setSelectedId(null)}>
  Seçimi temizle
</Button>
```

Tıklayınca:
- `selectedId` tekrar `null` olur
- yeniden render
- tüm satırlarda `selected=false`
- üst kutu “Henüz seçim yok” olur

---

## 12) En iyi mental model (tek cümle)

**Child “event” üretir (`onSelect()`), Parent state’i değiştirir (`setSelectedId`), UI state’ten tekrar hesaplanır (`selected={p.id===selectedId}`) ve bu yüzden her şey tutarlı kalır.**

---
