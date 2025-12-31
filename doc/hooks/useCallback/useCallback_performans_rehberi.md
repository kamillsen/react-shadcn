# useCallback --- Performans ve Çalışma Mantığı (Özet + Doğru Kullanım Rehberi)

React'te **useCallback**, bir fonksiyonun *referansını stabilize etmek*
için kullanılır. Amaç, her render'da yeniden oluşturulan fonksiyonların
**child componentlere props olarak geçerken gereksiz yeniden render
tetiklemesini önlemektir**.

------------------------------------------------------------------------

## 🎯 Ne Zaman Kullanılır?

Şu durumlarda mantıklıdır:

-   Fonksiyon **child componente prop olarak gönderiliyorsa**
-   Child **`React.memo` ile sarılıysa**
-   Fonksiyon referansının **her render'da değişmesi istenmiyorsa**
-   Liste, tablo, grafik gibi **büyük/performans kritik** bileşenler
    varsa

> Küçük componentlerde gereksiz kullanımı aksine *performans kaybı*
> yaratabilir.

------------------------------------------------------------------------

## 🧩 Temel Kullanım

``` jsx
const handleClick = useCallback(() => {
  // yapılacak iş
}, [deps]);
```

-   Fonksiyon bellekte tutulur
-   `[deps]` içindeki bağımlılıklardan biri değişirse fonksiyon yeniden
    üretilir

------------------------------------------------------------------------

## 🟡 State / Prop Bağımlılığı Olan Fonksiyon

``` jsx
const handleAdd = useCallback(() => {
  setCount(count + 1);
}, [count]);
```

-   Fonksiyon **count değerine bağımlıdır**
-   `count` değişince fonksiyonun **yeniden üretilmesi gerekir**
-   Aksi halde **eski state'e kilitlenir (stale state)**

------------------------------------------------------------------------

## 🟢 Functional Update ile Bağımlılıksız Kullanım

``` jsx
const handleAdd = useCallback(() => {
  setCount(c => c + 1);
}, []);
```

-   Fonksiyon dışarıdaki `count` değerini kullanmaz
-   React **en güncel değeri parametre olarak verir**
-   Fonksiyon **yeniden üretilmek zorunda değildir**
-   Referans **stabil kalır → child gereksiz rerender olmaz**

  --------------------------------------------------------------------------------
  Model                    Nasıl Çalışır                          Sonuç
  ------------------------ -------------------------------------- ----------------
  `setCount(count + 1)`    `count` dışarıdan okunur               deps gerekir

  `setCount(c => c + 1)`   güncel değer callback ile gelir        deps gerekmez
  --------------------------------------------------------------------------------

------------------------------------------------------------------------

## 🧷 React.memo ile Birlikte Kullanım

``` jsx
const Child = React.memo(({ onAdd }) => {
  /* ... */
});

<Child onAdd={handleAdd} />
```

-   Eğer fonksiyon her render'da yeniden üretilirse → **child rerender
    olur**
-   `useCallback` sayesinde referans **sabit kalır**
-   Yalnızca gerçekten gerekli olduğunda render çalışır

------------------------------------------------------------------------

## ⚠️ Yanlış Kullanım Örnekleri

❌ "Her fonksiyona useCallback yazayım" → **yanlış** - Bellek maliyeti +
karmaşıklık ekler

❌ Local, küçük fonksiyonlarda kullanmak → **gereksiz**

❌ Performans problemi yokken ezbere kullanmak → **anti‑pattern**

------------------------------------------------------------------------

## ✅ Özet

-   `useCallback` = **"Fonksiyon referansını sabit tut"**
-   Bağımlılık varsa → `[deps]` gerekir
-   `c => c + 1` formu → çoğu durumda dep gerektirmez
-   Asıl amaç → **gereksiz render'ı önlemek, performansı korumak**

------------------------------------------------------------------------

## 📌 Kısa Pratik Kural

> Eğer fonksiyon **child'a gidiyor + child memo'luysa** → `useCallback`
> düşün Aksi halde çoğu zaman **gerek yok**

------------------------------------------------------------------------

## 🎁 Bonus --- Küçük Checklist

-   [ ] Child `React.memo` mu?
-   [ ] Fonksiyon props olarak gidiyor mu?
-   [ ] Referans değişirse rerender oluyor mu?
-   [ ] Bileşen büyük / yoğun işlem yapıyor mu?

> Hepsine "evet" → kullan\
> Biri bile "hayır" → büyük ihtimalle gereksiz

------------------------------------------------------------------------

Bu doküman performans odaklı, sade ve doğru kullanım prensiplerine göre
hazırlanmıştır.
