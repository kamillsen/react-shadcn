# 📘 React `useState()` Notları

> React'te **değişebilen (dinamik) verileri** yönetmenin en temel yolu: `useState` hook'u.

---

## 🎯 `useState` Nedir?

`useState`, React **fonksiyonel bileşenlerde** değişebilen verileri (state) saklamak için kullanılan bir **hook**’tur.  
Bir bileşenin **hafızası** gibi çalışır: Bileşen yeniden render olsa bile, state değerleri korunur.

```jsx
const [deger, setDeger] = useState(baslangicDegeri);
```

- `deger` → O anki state
- `setDeger` → State’i güncellemek için kullanılan fonksiyon
- `baslangicDegeri` → İlk render’da kullanılacak başlangıç değeri

---

## ❓ Neden `useState` Kullanılır?

### 🔴 Temel Problem (Normal Değişken ile)

Normal değişkenler, bileşen her render olduğunda **baştan oluşturulur**:

```jsx
function ProblemliBilesen() {
  let sayi = 0; // Her render'da tekrar 0 olur!

  const artir = () => {
    sayi = sayi + 1;     // Değer artar ama...
    console.log(sayi);   // Console'da doğru görünür
  };

  return (
    <button onClick={artir}>
      Tıkla ({sayi}) {/* Ekranda hep 0 görünür! */}
    </button>
  );
}
```

- `sayi` her render’da **yeniden 0** olur.
- Değişiklik ekrana **yansımaz**, çünkü React render tetiklenmez.

---

### ✅ `useState` ile Çözüm

```jsx
import { useState } from "react";

function CozumluBilesen() {
  const [sayi, setSayi] = useState(0); // ✅ Değer korunur

  const artir = () => {
    setSayi(sayi + 1); // Hem değer değişir HEM de ekran yenilenir
  };

  return (
    <button onClick={artir}>
      Tıkla ({sayi}) {/* Güncel değer ekranda görünür */}
    </button>
  );
}
```

- `sayi` state olarak tutulduğu için **render’lar arasında korunur**.
- `setSayi` çağrıldığında React bileşeni **yeniden render eder**.

---

## 🛠️ `useState` Nasıl Çalışır?

```jsx
const [deger, setDeger] = useState(baslangicDegeri);
```

- `useState` **iki elemanlı bir dizi** döndürür:
  1. **State değeri** (okuma)
  2. **Güncelleme fonksiyonu** (yazma)

---

## 📝 Temel Örnekler

### 1️⃣ Sayaç Örneği

```jsx
function Sayac() {
  const [sayac, setSayac] = useState(0);

  return (
    <div>
      <p>Sayac: {sayac}</p>
      <button onClick={() => setSayac(sayac + 1)}>+</button>
      <button onClick={() => setSayac(sayac - 1)}>-</button>
      <button onClick={() => setSayac(0)}>Sıfırla</button>
    </div>
  );
}
```

---

### 2️⃣ Aç / Kapa (Toggle) Düğmesi

```jsx
function AcKapa() {
  const [acik, setAcik] = useState(false);

  return (
    <div>
      <button onClick={() => setAcik(!acik)}>
        {acik ? "Kapat" : "Aç"}
      </button>
      {acik && <p>İçerik görünüyor!</p>}
    </div>
  );
}
```

---

### 3️⃣ Input Formu

```jsx
function AdFormu() {
  const [ad, setAd] = useState("");

  return (
    <div>
      <input 
        value={ad}
        onChange={(e) => setAd(e.target.value)}
        placeholder="Adınızı yazın"
      />
      <p>Merhaba {ad || "yabancı"}!</p>
    </div>
  );
}
```

---

## 🔄 State Güncelleme Yöntemleri

### 1️⃣ Doğrudan Değer Atama

Basit durumlarda kullanılabilir:

```jsx
setSayac(5);
setAcik(true);
setAd("Ali");
```

---

### 2️⃣ Önceki Değere Göre Güncelleme (**Önerilen**)

Önceki state değerine göre işlem yaparken **her zaman** fonksiyonel formu kullan:

```jsx
setSayac((oncekiSayac) => oncekiSayac + 1);
setToplam((prevToplam) => prevToplam + 10);
```

Bu yöntem:
- Birden fazla güncellemenin arka arkaya yapılmasında
- Asenkron güncellemelerde
daha **güvenlidir**.

---

### 3️⃣ Object (Nesne) State Güncelleme

```jsx
const [kullanici, setKullanici] = useState({ ad: "", yas: 0 });

// ❌ YANLIŞ
kullanici.ad = "Ali"; // State doğrudan değiştirilemez (mutasyon)!

// ✅ DOĞRU
setKullanici({ ...kullanici, ad: "Ali" });

// ✅ Daha güvenli (önceki state'i kullanarak)
setKullanici((prev) => ({
  ...prev,
  ad: "Ali",
}));
```

---

### 4️⃣ Array (Dizi) State Güncelleme

```jsx
const [liste, setListe] = useState(["elma", "armut"]);

// ➕ Ekleme
setListe([...liste, "muz"]);

// ➖ Silme
setListe(liste.filter((item) => item !== "elma"));

// 🔁 Güncelleme
setListe(
  liste.map((item) => (item === "elma" ? "portakal" : item))
);
```

---

## 💡 `useState` Hangi Problemleri Çözer?

### 🧩 Problem 1: Sayfa Yenileme Gereksinimi

**Eski Web Yaklaşımı:**

- Butona bas → Sunucuya istekte bulun
- Yeni HTML al → Tüm sayfa yenilenir

**`useState` ile:**

- Butona bas → Sadece ilgili bileşen tekrar render olur
- Kullanıcıya anında, akıcı bir deneyim sağlar

---

### 🧩 Problem 2: Manuel DOM Manipülasyonu

**Eskiden:**

```js
document.getElementById("sayac").innerText = yeniDeger;
```

**React + `useState` ile:**

```jsx
setSayac(yeniDeger); // Gerisini React halleder
```

- DOM’la uğraşmazsın, sadece **state’i değiştirirsin**.
- React, **sanatçı gibi** DOM’u en verimli şekilde günceller.

---

### 🧩 Problem 3: Karmaşık State Yönetimi

Basit API istekleri veya UI durumları için:

```jsx
const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);
const [error, setError] = useState(null);
```

---

## 🎯 Gerçek Hayat Örnekleri

### 🛒 1. Alışveriş Sepeti

```jsx
function Sepet() {
  const [sepet, setSepet] = useState([]);
  const [toplam, setToplam] = useState(0);

  const urunEkle = (urun) => {
    setSepet((prevSepet) => [...prevSepet, urun]);
    setToplam((prevToplam) => prevToplam + urun.fiyat);
  };

  const urunCikar = (index) => {
    setSepet((prevSepet) => {
      const yeniSepet = [...prevSepet];
      yeniSepet.splice(index, 1);
      return yeniSepet;
    });
  };

  return (
    <div>
      {sepet.map((urun, i) => (
        <div key={i}>
          {urun.ad} - {urun.fiyat} TL
          <button onClick={() => urunCikar(i)}>Sil</button>
        </div>
      ))}
      <p>Toplam: {toplam} TL</p>
    </div>
  );
}
```

---

### ✅ 2. Todo List

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [yeniTodo, setYeniTodo] = useState("");

  const ekle = () => {
    if (yeniTodo.trim()) {
      setTodos((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: yeniTodo,
          completed: false,
        },
      ]);
      setYeniTodo("");
    }
  };

  const tamamla = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  return (
    <div>
      <input
        value={yeniTodo}
        onChange={(e) => setYeniTodo(e.target.value)}
      />
      <button onClick={ekle}>Ekle</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => tamamla(todo.id)}>
              Tamamla
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## ⚠️ Önemli Kurallar

### 1️⃣ `useState` Her Zaman Üst Seviyede Kullanılır

```jsx
// ✅ DOĞRU
function Bilesen() {
  const [state, setState] = useState(0);
  // ...
}

// ❌ YANLIŞ
if (kosul) {
  const [state, setState] = useState(0); // HATA!
}
```

> `useState`, döngü, koşul veya iç fonksiyonların **içinde** kullanılmaz.  
> Her zaman bileşenin **en üst seviyesinde** tanımlanmalıdır.

---

### 2️⃣ State Doğrudan Değiştirilemez (İmmutability)

```jsx
const [user, setUser] = useState({ name: "Ali" });

// ❌ YANLIŞ
user.name = "Mehmet"; // Değişiklik state'e yansımaz!

// ✅ DOĞRU
setUser({ ...user, name: "Mehmet" });
```

> Her zaman **yeni bir obje/dizi** oluşturarak güncelleme yap.

---

### 3️⃣ State Güncellemeleri Asenkron Çalışır

```jsx
const [count, setCount] = useState(0);

// ❌ YANLIŞ – Eski değeri kullanır
const artirYanlis = () => {
  setCount(count + 1);
  setCount(count + 1); // İki kere artırmaz!
};

// ✅ DOĞRU – Fonksiyon ile güncelle
const artirDogru = () => {
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1); // Gerçekten 2 artırır
};
```

---

## 📊 `useState` vs Normal Değişken

| Özellik                    | Normal Değişken          | `useState`                        |
|---------------------------|--------------------------|-----------------------------------|
| Değişince ekran           | Yenilenmez               | Otomatik yenilenir               |
| Bileşen yeniden render    | Değer sıfırlanır         | Değer korunur                    |
| Kullanım amacı            | Geçici / sabit değerler  | UI'de görünen dinamik değerler   |
| React ile entegrasyon     | Yok                      | Tam uyumlu                       |

---

## 🚀 Ne Zaman `useState` Kullanmalıyım?

### ✅ Kullan:

- Kullanıcı girdileri  
- UI durumları (açık / kapalı, modal, menü)
- Form verileri
- Liste verileri (todo, ürün listesi, mesajlar)
- Filtreleme, sıralama, sayfalama durumları
- "Like", "Bookmark", "Dark mode" gibi etkileşimler

### 🚫 Kullanma:

- Sabit değerler → `const PI = 3.14`
- Her seferinde hesaplanabilen değerler → `useMemo` veya normal fonksiyon
- Global / çok paylaşılan state → `Context`, `Redux`, `Zustand` vb.

---

## 💎 Özet

### `useState`’in Çözdüğü 3 Ana Problem

1. **Ekranın otomatik güncellenmesi**  
   → State değişince bileşen otomatik render olur.

2. **Değerlerin korunması**  
   → Bileşen tekrar render olsa bile state kaybolmaz.

3. **Temiz ve bakımı kolay kod**  
   → DOM’a dokunmazsın, sadece state’le çalışırsın.

---

### Aklında Tutman Gereken Basit Kural

> **“Ekranda görünmesini istediğin ve değişebilecek her şey için `useState` kullan.”**

### Mini Rehber

```txt
Değişmeyecek değer         → const
Değişecek ama ekranda değil → let / ref
Değişecek VE ekranda       → useState
```

---

> 🧠 Not: Bu notlar, React’te state yönetimini anlamanın temelini oluşturur.  
> `useState`’i iyi anlarsan, `useEffect`, `useContext`, `useReducer` gibi diğer hook’ları öğrenmek **çok daha kolay** hale gelir.
