
# React: Lifting State Up & Callback Props (Kısa Ama Net Özet)

Bu not, şu iki kavramı küçük bir örnekle ayırmaya odaklanıyor:

- **Lifting state up (state’i yukarı taşımak)**
- **Callback props (fonksiyonu child’a prop olarak vermek)**

---

## 1. Lifting State Up (State’i Yukarı Taşımak)

**Tanım (kısaca):**  
State, child bileşende tutulmaz; daha yukarıdaki (parent) bileşende tutulur ve oradan yönetilir. Böylece veri tek bir yerden kontrol edilir.

Örnekte parent bileşenimiz:

```tsx
export default function CallbackExample() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const products = [
    { id: 1, title: "Kulaklık", price: 799 },
    { id: 2, title: "Klavye", price: 1299 },
  ];

  const selected = products.find((p) => p.id === selectedId) ?? null;

  return (
    <div>
      <div>Seçilen ürün: {selected ? selected.title : "Yok"}</div>

      {products.map((p) => (
        <ProductRow
          key={p.id}
          title={p.title}
          price={p.price}
          selected={p.id === selectedId}   // ⬅️ State bilgisini parent veriyor
          onSelect={() => setSelectedId(p.id)}
        />
      ))}
    </div>
  );
}
```

Burada:
- `selectedId` state’i **CallbackExample (parent)** içinde.
- Child olan `ProductRow`, sadece `selected` prop’u üzerinden bu bilgiyi **okuyor**.
- “Hangi ürün seçili?” sorusunun kaynağı **tek bir yer**: parent.

👉 Bu karar: “Seçili ürün state’i child’da değil, parent’ta dursun.” = **Lifting state up**

---

## 2. Callback Props (Child’ın Parent’a Haber Vermesi)

**Tanım (kısaca):**  
Parent, state’i değiştiren fonksiyonunu child’a **prop olarak verir**. Child bir olay (click vb.) olunca bu fonksiyonu çağırarak parent’a “şu oldu” diye haber verir.

Yukarıdaki örnekte callback prop şu satırda:

```tsx
<ProductRow
  ...
  onSelect={() => setSelectedId(p.id)}   // ⬅️ Parent fonksiyonunu child'a prop olarak veriyoruz
/>
```

Child bileşen:

```tsx
type ProductRowProps = {
  title: string;
  price: number;
  selected: boolean;
  onSelect: () => void;  // ⬅️ Parent'tan gelen callback
};

function ProductRow({ title, price, selected, onSelect }: ProductRowProps) {
  return (
    <div>
      <div>{title} - {price} ₺</div>
      <button onClick={onSelect}>
        {selected ? "Seçildi" : "Seç"}
      </button>
    </div>
  );
}
```

Burada:
- `onSelect`, **ProductRow’un içinde tanımlı bir fonksiyon değil**, parent’ın gönderdiği bir fonksiyon.
- Butona tıklanınca `onSelect()` çağrılıyor → aslında `setSelectedId(p.id)` çalışmış oluyor (ama bunu sadece parent biliyor).
- Child, “hangi id seçilmeli, state nasıl tutulmalı” bilmeden sadece **olayı tetikliyor**.

👉 Bu “parent fonksiyonunun child’a prop olarak verilmesi” = **Callback prop**

---

## 3. Aralarındaki İlişki ve Fark

- **Lifting state up**
  - “State nerede dursun?” sorusunun cevabı.
  - Biz diyoruz ki: “Seçili ürün state’i parent’ta dursun.”
  - Örnekte: `selectedId` ve `setSelectedId` → **CallbackExample** içinde.

- **Callback props**
  - “Child, bu parent state’ini nasıl değiştirsin?” sorusunun cevabı.
  - Child, parent’ın fonksiyonuna **direkt erişemez**, o yüzden parent fonksiyonu `onSelect` gibi bir prop olarak child’a verir.
  - Örnekte: `onSelect={() => setSelectedId(p.id)}` parent’ta tanımlanıp `ProductRow`’a gönderiliyor.

Kısaca:

> **Lifting state up:**  
> State’i child’dan alıp parent’a taşıma kararı.

> **Callback props:**  
> Child’tan gelen kullanıcı etkileşimini (click vb.) parent’a bildirmek için fonksiyon prop kullanma tekniği.

Genelde pratikte şunu yaşarsın:

1. “Bu bilgiyi hem üstte hem listede kullanmam lazım” dersin → state’i yukarı (parent’a) taşırsın (**lifting state up**).
2. Sonra child’da bir buton vardır, bu butonun o state’i değiştirmesi gerekir → parent fonksiyonunu child’a gönderirsin (**callback prop**).

İkisi çoğu zaman **beraber kullanılır**, ama **aynı şey değildir**.
