# 🎁 KUTU ÖRNEĞİ İLE REACT CONTEXT ANLATIMI

## 1. KUTU SİSTEMİNİ KURALIM

### ADIM 1: Boş Bir Kutu Hazırla

```typescript
const ThemeContext = createContext();
// 🎁 Bu bir KUTU: [İÇİ BOŞ]
// Sadece "Theme" yazılı bir karton kutu
// Ama İÇİ BOŞ, HİÇBİR ŞEY YOK!
```

---

### ADIM 2: Kutuyu Dolduran Kişi (ThemeProvider)

```typescript
function ThemeProvider({ children }) {
  // 🎁 Kutunun İÇİNİ DOLDUR:
  const [theme, setTheme] = useState('light');
  
  const kutuIcerigi = {
    theme: 'light',      // 🟡 Işık
    setTheme: fonksiyon, // 🎮 Değiştirme düğmesi
    isDark: false        // 🌙 Karanlık mı?
  };
  
  return (
    <ThemeContext.Provider value={kutuIcerigi}>
       {/* 👶 ÇOCUKLAR KUTUNUN İÇİNDE! */}
      {children}
    </ThemeContext.Provider>
  );
}
```

**Görsel Mantık:**

1. 🎁 `[BOŞ KUTU]` alınır (`createContext()`)
2. 📦 İçine `{theme, setTheme, isDark}` konur (`ThemeProvider` state ile doldurur)
3. 👶 Tüm çocuklar bu kutunun **içine/etrafına sarılır** (`<ThemeProvider>{children}</ThemeProvider>`)

---

## 2. ÇOCUKLARIN KUTUYA ERİŞİMİ

### ✅ KUTU İÇİNDE OLAN ÇOCUK (DOĞRU KULLANIM)

```jsx
<ThemeProvider>
  {/* 👶 ÇOCUK KUTUNUN İÇİNDE/ETRAFINDA */}
  <ThemeToggle />
</ThemeProvider>
```

**ThemeToggle bileşeni:**

```javascript
function ThemeToggle() {
  // 🎁 "Ben kutunun içindeyim, kutuyu açabilirim!"
  const { theme, setTheme } = useTheme(); // ✅ ÇALIŞIR
  // Çünkü yukarıda bir ThemeProvider var
}
```

---

### ❌ KUTU DIŞINDA KALAN ÇOCUK (YANLIŞ KULLANIM)

```jsx
{/* ❌ ÇOCUK KUTUNUN DIŞINDA! */}
<ThemeToggle />

{/* Sonra kutuyu hazırlıyoruz ama ÇOK GEÇ! */}
<ThemeProvider>
  {/* Başka çocuklar */}
</ThemeProvider>
```

**ThemeToggle bileşeni:**

```javascript
function ThemeToggle() {
  // 🎁 "Ben kutunun DIŞINDAYIM, kutuyu BULAMIYORUM!"
  const { theme } = useTheme(); // ❌ HATA!
  // "Kutu nerede? Yukarı baktım, kutucu yok!"
}
```

---

## 3. `useTheme()` NASIL ÇALIŞIYOR?

```javascript
function useTheme() {
  // 1. 🎁 "YUKARI BAK: ThemeContext adlı bir kutu var mı?"
  const context = useContext(ThemeContext);
  
  // 2. 🎁 "Kutu BULUNDU! Peki içinde BİR ŞEY var mı?"
  if (context === undefined) {
    // 3. ❌ "Kutu BOŞ! Hata verelim..."
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  // 4. ✅ "Kutu DOLU! İçindekileri alalım..."
  return context; // {theme: 'light', setTheme: fn, isDark: false}
}
```

**Görsel Akış:**

1. `ThemeToggle`: **"useTheme() çağırıyorum!"**
2. `useTheme`: **"Yukarı bakayım... ThemeContext.Provider var mı?"**
3. Bileşen ağacında yukarı çık:  
   `ThemeToggle → SiteHeader → SidebarProvider → ThemeProvider`
4. 🎁 **BULUNDU!** `ThemeProvider` tarafından sarılmış bir `ThemeContext.Provider`
5. `useTheme`: **"Kutuyu açayım... İçi dolu mu?"**
6. ✅ DOLU: `{theme, setTheme, isDark}`
7. `ThemeToggle`: **"Harika! `theme = 'light'` aldım!"**

---

## 4. NEDEN BU KUTU SİSTEMİ?

### PROBLEM: Herkese Tek Tek Dağıtmak (Prop Drilling)

```javascript
// Ana bileşende:
const [theme, setTheme] = useState('light');

// TÜM çocuklara tek tek ver:
<Header theme={theme} setTheme={setTheme} />
<Main theme={theme} setTheme={setTheme} />
<Footer theme={theme} setTheme={setTheme} />

// Torun bileşenlere de:
<Header>
  <Nav theme={theme} setTheme={setTheme}>
    <Button theme={theme} setTheme={setTheme}>
      <Icon theme={theme} setTheme={setTheme} />
    </Button>
  </Nav>
</Header>
```

**🔴 PROBLEM:** Her bileşen `theme` ve `setTheme` prop’unu **taşımak zorunda!**

---

### ÇÖZÜM: Merkezi Kutu Sistemi (Context API)

```javascript
// Ana bileşende:
<ThemeProvider>  {/* 🎁 Kutu hazırla ve doldur */}
  <Header />     {/* ❌ theme prop'u YOK */}
  <Main />       {/* ❌ theme prop'u YOK */}
  <Footer />     {/* ❌ theme prop'u YOK */}
</ThemeProvider>
```

**İç bileşenlerde:**

```javascript
function Header() {
  const { theme } = useTheme(); // 🎁 Kutudan al
}

function Button() {
  const { theme } = useTheme(); // 🎁 Kutudan al  
}

function Icon() {
  const { setTheme } = useTheme(); // 🎁 Kutudan al
}
```

**✅ ÇÖZÜM:** Herkes ihtiyacı olanı **kutudan** alıyor, arada gereksiz prop zinciri yok.

---

## 5. KUTU SİSTEMİNİN AVANTAJLARI

### AVANTAJ 1: TEMİZ KOD

```javascript
// ❌ ESKİ: Karmaşık prop zinciri
<ComponentA theme={theme} setTheme={setTheme}>
  <ComponentB theme={theme} setTheme={setTheme}>
    <ComponentC theme={theme} setTheme={setTheme}>
      // ... 10 kat daha derin
```

```javascript
// ✅ YENİ: Temiz, anlaşılır
<ThemeProvider>
  <ComponentA>
    <ComponentB>
      <ComponentC>
        {/* Herkes ihtiyacını kutudan alır */}
      </ComponentC>
    </ComponentB>
  </ComponentA>
</ThemeProvider>
```

---

### AVANTAJ 2: PERFORMANS

```javascript
// Kutunun içindeki değerler değişirse:
theme = 'dark' yapılınca
↓
🎁 Kutu yenilenir: {theme: 'dark', setTheme, isDark: true}
↓
⚠️ SADECE kutuyu kullananlar (useTheme) yeniden render olur!
↓
✅ Kutuyu kullanmayanlar ETKİLENMEZ!
```

Yani: **Context’i gerçekten kullanan bileşenler** güncellenir, diğerleri boşa render olmaz.

---

### AVANTAJ 3: GÜVENLİK / KONTROLLÜ ERİŞİM

```javascript
// ❌ Global değişken ile (TEHLİKELİ):
let globalTheme = 'light'; // Herkes değiştirebilir
```

```javascript
// ✅ Kutu sistemi ile (GÜVENLİ):
<ThemeProvider> // Sadece Provider state'i yönetir
  <Component>
    const { setTheme } = useTheme(); // Kontrollü erişim
    // Sadece bu fonksiyonu çağırabilir
  </Component>
</ThemeProvider>
```

**Yani:** State’in kaynağı **tek** yerde, herkes ona **kontrollü** şekilde erişiyor.

---

## 6. "AMA NEDEN ZORUNLU?" SORUSUNUN CEVABI

React bize şunu söylüyor:

> **"Eğer bir şeyi GLOBAL olarak paylaşmak istiyorsan, önce onu RESMİ olarak GLOBAL ilan etmelisin!"**

```javascript
// ❌ YANLIŞ: "Theme global olsun" deyip, kimseye haber vermemek
const gizliGlobalTheme = 'light';
// Kimse bunun global olduğunu bilmiyor!
```

```javascript
// ✅ DOĞRU: "Theme global'dir!" diye RESMEN ilan etmek
<ThemeProvider> {/* "BURADA THEME GLOBAL'DİR!" */}
  {/* Artık herkes biliyor: "Burada theme global" */}
  <HerhangiBirBilesen />
</ThemeProvider>
```

**Yani:**

- `createContext()` ile **kutu tanımlarsın**  
- `<ThemeProvider>` ile **kutuyu doldurur ve resmen ilan edersin**  
- `useTheme()` ile **resmi kutuya erişirsin**

Kutu (Context.Provider) yoksa, **global sayılmaz**, bu yüzden React da hata fırlatır.

---

## 7. SON BENZETME: OKUL SİSTEMİ

```text
createContext() = 📘 "DERS DEFTERİ"
                 Sadece defterin kapağında "Theme" yazıyor, içi boş.

ThemeProvider   = 👨‍🏫 "ÖĞRETMEN"
                 1. Defteri alır
                 2. İçine konuyu yazar (theme, setTheme)
                 3. Sınıftaki tüm öğrencilere defteri "dağıtmış" sayılır
                    (yani Provider ile hepsini sarar)

useTheme()      = 👨‍🎓 "ÖĞRENCİ"
                 1. "Defterim var mı?" diye bakar
                 2. "Öğretmen bana defter verdi mi?"
                 3. "Evet, verdi! İçindeki bilgiyi okuyabilirim"
```

- Öğrenci **defterin verilmediği** bir yerdeyse:  
  👉 "Öğretmen bana defter vermedi, okuyamam!" ❌

- Öğrenci **öğretmenin sınıfında** ve defter verilmişse:  
  👉 "Öğretmen bana defter verdi, okuyabilirim!" ✅

---

## ÖZET

**🎁 KUTU SİSTEMİ (CONTEXT) NEDEN ZORUNLU?**

1. **React'in kuralları böyle** – Context API bu şekilde tasarlandı.
2. **Organizasyon için** – Kimin neye erişebileceğini kontrol edebilmek için.
3. **Performans için** – Gereksiz re-render'ları önlemek için.
4. **Anlaşılır kod için** – "Burada `theme` global'dir" diye açıkça belirtmek için.

### Altın Kural

- `createContext()` = **Boş kutu** oluştur  
- `<Context.Provider>` = **Kutuyu doldur + çocukları sar**  
- `useContext(Context)` = **Kutudan oku** (sadece sarılıysan okuyabilirsin)

> **Kutuyu sarmazsan, çocuk kutuyu bulamaz!** 🎯
