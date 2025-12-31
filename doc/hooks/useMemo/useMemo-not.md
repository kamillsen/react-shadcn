# useMemo — Özet Not (Hesaplama Optimizasyonu ve Çalışma Mantığı)

## 🎯 Amaç

`useMemo`, React’e şunu söyler:

> “Bu **hesaplama sonucunu hafızada tut**.  
> Bağımlılıklar değişmedikçe yeniden hesaplama yapma.”

Böylece:
- Pahalı hesaplamalar her render’da tekrar çalışmaz
- Aynı sonuç **cache’den** alınır
- Performans artar

---

## 🧩 Temel Kullanım

```js
const result = useMemo(() => {
  return hesaplama();
}, [deps]);
```

- İlk parametre → hesaplamayı yapan fonksiyon
- İkinci parametre → bağımlılık listesi
- Bağımlılıklar değişirse → hesaplama **yeniden yapılır**
- Değişmezse → eski sonuç **hafızadan geri döner**

---

## 🟡 useMemo Olmadan Olan Durum

```js
const filtered = users.filter(u => u.age > 30);
```

- Component her render’da çalışır
- Liste büyükse **her seferinde yeniden hesaplanır**
- Gereksiz CPU tüketimi oluşur

---

## 🟢 useMemo ile Doğru Kullanım

```js
const filtered = useMemo(() => {
  return users.filter(u => u.age > 30);
}, [users]);
```

- Sadece `users` değiştiğinde filtreleme yapılır
- Değilse sonuç **cache’den gelir**
- Render hızlı gerçekleşir

---

## 🧠 Çalışma Mantığı

> useMemo, fonksiyonu değil **hesaplanmış değeri** saklar.

- `useCallback` → fonksiyon referansı tutar
- `useMemo` → hesaplama sonucu tutar

| Hook | Ne saklar? | Ne zaman kullanılır? |
|------|----------|----------------------|
| useCallback | Fonksiyon referansı | Rerender & referans değişimi kontrolü |
| useMemo | Hesaplanmış değer | Pahalı hesaplamayı önlemek |

---

## 🧩 Ağır Hesaplama Örneği

```js
function heavyCalc(n) {
  console.log("ağır hesaplama çalıştı");
  let t = 0;
  for (let i = 0; i < 1_000_000_000; i++) t += i;
  return t + n;
}

const result = useMemo(() => heavyCalc(count), [count]);
```

- `count` değişirse → hesaplama tekrar yapılır
- başka state değişirse → yapılmaz

> useMemo olmasa her render’da işlem yeniden çalışırdı

---

## ⚠️ Her Yerde Kullanılmamalı

Gereksiz kullanım:
- hafıza tüketir
- aksine performansı düşürebilir

Kullanmak mantıklıysa:
- büyük liste işleniyorsa
- türetilmiş veri (derived state) oluşturuluyorsa
- hesaplama **pahalıysa**

---

## ✅ Sonuç Özeti

- `useMemo` = “Bu **hesaplamayı cache’de tut**”
- Deps değişmezse → yeniden hesaplama yok
- Deps değişirse → yeni sonuç üretilir
- Amaç → gereksiz CPU yükünü azaltmak

---

_Not, bu sohbetimizdeki anlatım mantığı temel alınarak hazırlanmıştır._
