
# ThemeProvider & useEffect Akış Dokümanı

## İçerik
- Kodun genel amacı
- Duruma göre akışlar
- useEffect-1 / useEffect-2 / useEffect-3 **ne zaman, niçin ve hangi amaçla çalışır**
- Sistem teması – kullanıcı teması ilişkisi

---

## 🎯 Genel Amaç

Bu yapı, uygulamanın temasını yönetir:

- Kullanıcının seçtiği tema: `light / dark / system`
- Sistem temasını dinler (system mode)
- Seçimi `localStorage`’a kaydeder
- `<html>` elementine uygun class ekleyerek CSS temasını günceller
- Tema değişikliklerini **global Context** üzerinden tüm uygulamaya dağıtır

---

## 🟡 useEffect‑1 — Sistem temasını dinleme

```ts
useEffect(() => {
  if (theme === 'system') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  } else {
    setIsDark(theme === 'dark');
  }
}, [theme]);
```

### 🧩 **Ne zaman çalışır?**
- Component ilk render edildiğinde
- `theme` değiştiğinde

### 🎯 **Amacı**
- Eğer kullanıcı **system mode** seçmişse:
  - Sistem temasını okur
  - Sistem teması değişirse (light ↔ dark) otomatik günceller
- Eğer kullanıcı elle tema seçmişse:
  - `isDark` değerini `theme === 'dark'` sonucuna göre ayarlar

### 📝 **Not**
> Bu effect **tema tercihinin kaynağını belirler**  
> (kullanıcı mı → sistem mi)

---

## 🟡 useEffect‑2 — localStorage + HTML class güncelleme

```ts
useEffect(() => {
  localStorage.setItem('todo-theme', theme);

  const root = document.documentElement;
  root.classList.remove('light', 'dark');

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
}, [theme, isDark]);
```

### 🧩 **Ne zaman çalışır?**
- `theme` değiştiğinde
- `isDark` değiştiğinde

### 🎯 **Amacı**
- Tema seçimini `localStorage`’a kaydetmek
- `<html>` elementine doğru class eklemek:
  - `html.dark`
  - `html.light`
- CSS ve Tailwind temayı buna göre uygular

### 📝 **Not**
> Sistem teması değişip `isDark` güncellendiğinde  
> bu effect tekrar çalışarak **UI’ı güncel tutar**

---

## 🟡 useEffect‑3 — Kayıtlı temayı yükleme (ilk açılış)

```ts
useEffect(() => {
  const savedTheme = localStorage.getItem('todo-theme') as Theme;
  if (savedTheme) setTheme(savedTheme);
}, []);
```

### 🧩 **Ne zaman çalışır?**
- Sadece **bir kere**
- Component mount olduğunda

### 🎯 **Amacı**
- Daha önce kaydedilen temayı geri yüklemek
- Uygulama açılır açılmaz **kullanıcı tercihini yansıtmak**

### 📝 **Not**
> Bu effect, ilk aşamada `theme` değerini değiştirebilir  
> ve bunun sonucu olarak **useEffect‑1 ve useEffect‑2 zincirleme tetiklenebilir**

---

## 🔁 Durum Bazlı Akış Özeti

| Durum | Çalışan useEffect |
|------|------------------|
| İlk yükleme | 3 → (gerekirse) 1 + 2 |
| Kullanıcı tema seçer | 1 + 2 |
| System mode seçilir | 1 + 2 |
| Sistem light → dark geçişi | 2 |
| Sayfa yenilenir | 3 → 1 + 2 |

---

## 🟢 Özet Cümlesi

- **useEffect‑1** → Temanın kaynağını belirler (**kullanıcı mı — sistem mi**)  
- **useEffect‑2** → Uygulamanın görünümünü ve kaydı senkronlar  
- **useEffect‑3** → Uygulama açılışında tema tercihinin geri yüklenmesini sağlar

---
