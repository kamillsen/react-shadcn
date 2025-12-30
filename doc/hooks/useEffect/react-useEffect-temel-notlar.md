# 📘 React `useEffect()` — Temel Notlar

> `useEffect`, React bileşenlerinde **yan etkileri (API çağrısı, timer, DOM değişikliği, event listener vb.)** kontrol etmek için kullanılan bir Hook’tur.

---

## 🎯 `useEffect` Nedir?

React bileşenleri normalde **yalnızca UI üretir**.  
Ancak bazen şu işlemleri yapmamız gerekir:

- API çağrısı yapmak
- `setInterval / setTimeout` çalıştırmak
- DOM üzerinde değişiklik yapmak
- LocalStorage ile veri saklamak
- Event listener eklemek

Bu işlemler **yan etki (side effect)** olarak adlandırılır ve `useEffect` ile yönetilir.

---

## ⏰ NE ZAMAN ÇALIŞIR?

### 1️⃣ Boş `[]` ile → **Sadece İlk Yüklemede**

```jsx
useEffect(() => {
  console.log("SADECE ilk yüklemede çalış");
}, []);
```

✔ Çalışır: Bileşen ilk kez ekrana geldiğinde (mount)

---

### 2️⃣ `[değişken]` ile → **Sadece O Değişken Değişince**

```jsx
useEffect(() => {
  console.log("isim değişince çalış");
}, [isim]);
```

✔ Çalışır: `isim` değiştiğinde

---

### 3️⃣ Hiç Array YOK → **Her Render’da**

```jsx
useEffect(() => {
  console.log("HER render'da çalış");
});
```

⚠️ Her state değişikliğinde çalışır → **dikkatli kullan**

---

## 🧹 CLEANUP (Temizleme) Nedir?

```jsx
useEffect(() => {
  const timer = setInterval(() => {}, 1000);

  return () => {
    clearInterval(timer); // Bileşen kalkınca timer'ı durdur
  };
}, []);
```

🧽 Cleanup ne işe yarar?

- Açık kalan timer’ı durdurur
- Event listener’ları kaldırır
- Bellek sızıntısını (memory leak) önler

---

# 📘 `useEffect` + `useState` Birlikte

## 🤝 Nasıl Çalışırlar?

- `useState` → **Veriyi tutar**
- `useEffect` → **Veri değişince bir iş yapar**

---

## 🔄 Çalışma Sırası

### 🧮 Örnek: Basit Sayaç

```jsx
function Sayaç() {
  const [sayı, setSayı] = useState(0); // 1️⃣ sayı = 0

  useEffect(() => {
    document.title = `Sayı: ${sayı}`; // 3️⃣ başlığı güncelle
  }, [sayı]); // 4️⃣ sayı değişince tekrar çalış

  return (
    <button onClick={() => setSayı(sayı + 1)}> // 2️⃣ artır
      Tıkla ({sayı})
    </button>
  );
}
```

🔎 Akış

1️⃣ İlk yükleme → `title = Sayı: 0`  
2️⃣ Butona bas → sayı = 1  
3️⃣ React yeniden render eder  
4️⃣ `useEffect`: “sayı değişti” → `title = 1`

---

## 🎯 3 Temel Senaryo

### 🟢 1. API Verisi Çekme

```jsx
const [kullanıcı, setKullanıcı] = useState(null);

useEffect(() => {
  fetch("/api/user")
    .then(res => res.json())
    .then(setKullanıcı);
}, []); // sadece ilk yüklemede
```

---

### 🟡 2. Timer / Interval

```jsx
const [saniye, setSaniye] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setSaniye(s => s + 1);
  }, 1000);

  return () => clearInterval(timer);
}, []);
```

---

### 🟣 3. LocalStorage

```jsx
const [ad, setAd] = useState("");

// Sayfa açılınca oku
useEffect(() => {
  const kayıtlı = localStorage.getItem("ad");
  if (kayıtlı) setAd(kayıtlı);
}, []);

// ad değişince kaydet
useEffect(() => {
  localStorage.setItem("ad", ad);
}, [ad]);
```

---

## ⚠️ DİKKAT — Sonsuz Döngü!

```jsx
// ❌ YANLIŞ
useEffect(() => {
  setSayı(sayı + 1);
}, [sayı]); // sayı değişir → effect çalışır → tekrar sayı değişir...
```

---

```jsx
// ✅ DOĞRU
useEffect(() => {
  // sadece 1 kere çalış
}, []);
```

---

## 💎 ÖZET

| Hook | Görevi |
|------|--------|
| `useState` | “Bu veriyi sakla” |
| `useEffect` | “Bu veri değişince şunu yap” |

---

### 🧩 Basit Formül

```jsx
// 1️⃣ Veriyi sakla
const [veri, setVeri] = useState(başlangıç);

// 2️⃣ Veri değişince çalışacak iş
useEffect(() => {
  // veri değişince burası çalışır
}, [veri]);

// 3️⃣ Bir yerden veriyi güncelle
<button onClick={() => setVeri("yeni")}>
```

---

### 🟢 En kısa özet

> **`useState` = hafıza  
> `useEffect` = “değişince yapılacak işlem”**

---

Bu notlar, `useEffect` mantığını hızlı ve net bir şekilde öğrenmek için özet bir referanstır.  
Daha ileri seviyede, cleanup, dependency ve performans konuları çok daha kritik hale gelir. 🔍
