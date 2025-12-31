# useCallback --- Özet Not (Performans ve Çalışma Mantığı)

## 🎯 Amaç

`useCallback`, React'e şunu söyler:

> "Bu fonksiyonun **referansını hafızada tut**. Sadece bağımlılıkları
> değiştiğinde yeni fonksiyon oluştur."

Böylece: - Her render'da **aynı fonksiyon yeniden üretilmez** -
Özellikle fonksiyon **child componente props olarak** veriliyorsa -
Gereksiz **rerender'lar engellenir**

------------------------------------------------------------------------

## 🧩 Temel Kullanım

``` js
const memoFn = useCallback(() => {
  // yapılacak iş
}, [deps]);
```

-   İlk parametre → hafızada tutulacak fonksiyon
-   İkinci parametre → bağımlılıklar (dependency array)
-   Bağımlılıklardan biri değişirse → fonksiyon **yeniden oluşturulur**

------------------------------------------------------------------------

## 🟡 Bağımlılığa (deps) ihtiyaç olan durum

Fonksiyon **dışarıdaki state veya prop'a bağlıysa**:

``` js
const handleAdd = useCallback(() => {
  setCount(count + 1);
}, [count]);
```

Çünkü burada fonksiyon:

-   `count` değiştikçe **güncel değeri kullanmak zorunda**
-   O yüzden React, fonksiyonu **yeniden üretmek zorunda kalır**

> Aksi halde eski değere kilitlenir (stale state)

------------------------------------------------------------------------

## 🟢 Functional Update (Render zorunlu değil)

``` js
const handleAdd = useCallback(() => {
  setCount(c => c + 1);
}, []);
```

Burada fark:

-   Fonksiyon **dışarıdaki count'u kullanmaz**
-   React en güncel değeri **`c` parametresi olarak verir**
-   Fonksiyonun yeniden oluşturulmasına gerek kalmaz
-   Referans sabit kalır → child gereksiz rerender olmaz

### 🧠 Mantık farkı

  ---------------------------------------------------------------------------------
  Model                    Nasıl Çalışır?                           Sonuç
  ------------------------ ---------------------------------------- ---------------
  `setCount(count + 1)`    Fonksiyon **count'a bağımlı**            deps gerekir

  `setCount(c => c + 1)`   React **güncel değeri parametre verir**  deps gerekmez
  ---------------------------------------------------------------------------------

------------------------------------------------------------------------

## 🧷 React.memo ile birlikte kullanım

``` js
const MemoChild = React.memo(Child);

<MemoChild onAdd={handleAdd} />
```

-   Eğer fonksiyon referansı her render'da değişirse → child rerender
    olur
-   `useCallback` sayesinde referans stabil kalır
-   Yalnızca **gerçekten ihtiyaç olduğunda** render çalışır

> Performans kazancı büyük listelerde ve kompleks componentlerde
> anlamlıdır

------------------------------------------------------------------------

## ⚠️ Önemli Notlar

-   Her yerde kullanmak **zorunlu değil**
-   Yanlış veya gereksiz kullanım → tam tersi performans kaybı
    yaratabilir
-   Sadece şu durumlarda mantıklı:
    -   Fonksiyon child'a props olarak gidiyorsa
    -   Child `React.memo` ile sarılıysa
    -   Fonksiyonun referansının değişmesi istenmiyorsa

------------------------------------------------------------------------

## ✅ Sonuç Özeti

-   `useCallback` = "Fonksiyon **referansını sabit tut**"
-   `[deps]` doluysa → fonksiyon **o verilere bağımlıdır**
-   `c => c + 1` gibi callback formunda → bağımlılığa gerek kalmaz
-   Amaç **gereksiz render'ı önleyip performansı korumak**

------------------------------------------------------------------------

*Not bu sohbetimizdeki örnekler ve açıklamalar temel alınarak
hazırlanmıştır.*
