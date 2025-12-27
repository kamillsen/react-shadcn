# 🚀 React & Next.js Öğrenme Yol Haritası: Projelerle Zirveye

Bu doküman, React ve Next.js dünyasına en verimli şekilde adım atmanız için hazırlanmış bir yol haritasıdır. Amacımız teoride boğulmak yerine, projeler üzerinden pratik yaparak ve her adımı "neden" attığımızı anlayarak ilerlemek.

---

## 🎯 1. Adım: Hedef Belirleme - Neden Next.js?

Hedefiniz; API'lerle konuşan, veritabanı işlemleri yapan ve interaktif bir "dashboard" oluşturmak. Bu hedef için en modern ve güçlü araç **Next.js (App Router)**'dır.

> **💡 Not:** Next.js, kendi içerisinde dosya sistemine dayalı bir yönlendirme (routing) mekanizmasına sahiptir. Bu sayede hem sunucu (backend) hem de istemci (frontend) katmanlarını bir arada yönetmenizi sağlar. Bu yüzden şimdilik React Router gibi ek kütüphanelere odaklanmıyoruz.

---

## 📚 2. Adım: Öğrenme Sırası - En Hızlı Projeye Giriş

Her şeyi aynı anda öğrenmek yerine, sizi en hızlı şekilde "üretken" kılacak adımları takip edelim.

### A. 🧱 React'in Temel Taşları (Proje Öncesi)

Bunlar, React evreninin alfabesidir. Bu konuları anlamadan yola çıkmak, sürekli engele takılmanıza neden olur.

| Konu | Ne İşe Yarar? | Kaynak |
| :--- | :--- | :--- |
| **Component & JSX** | Arayüzü küçük, yeniden kullanılabilir "lego" parçalarına ayırmanızı sağlar. | [Your First Component](https://react.dev/learn/your-first-component?utm_source=chatgpt.com) |
| **Props** | Bileşenler arasında veri akışını sağlar (yukarıdan aşağıya). | [Passing Props](https://react.dev/learn/passing-props-to-a-component?utm_source=chatgpt.com) |
| **State & Lifting** | Bileşenin kendi içindeki "değişken verisini" tutar (`useState`). Bu veriyi paylaşmak için yukarı taşımaktır. | [Sharing State](https://react.dev/learn/sharing-state-between-components?utm_source=chatgpt.com) |

> **✅ EŞİK NOKTASI:** Bu üç konuyu anladığınız an, basit bir web sayfası oluşturacak ve temel dinamikleri yönetecek seviyeye gelmişsiniz demektir.

### B. 훅 React Hooks: Süper Güçleriniz (Proje Sırasında)

Hook'lar, bileşenlerinize güç katan özel fonksiyonlardır.

| Hook | Öncelik | Ne İşe Yarar? | Kaynak |
| :--- | :--- | :--- | :--- |
| **`useState`** | **Yüksek** | Bileşen içinde state (durum) yönetimi. | (Yukarıda mevcut) |
| **`useEffect`** | **Yüksek** | API'den veri çekme, event dinleme gibi "yan etkileri" yönetir. | [`useEffect` Docs](https://react.dev/reference/react/useEffect?utm_source=chatgpt.com) |
| **`useContext`**| **Orta** | Veriyi props ile katman katman taşımak yerine, global olarak erişilebilir kılar. | [Passing Data with Context](https://react.dev/learn/passing-data-deeply-with-context?utm_source=chatgpt.com) |

<details>
<summary><strong>Performans Hook'ları (İhtiyaç Anında Öğrenin)</strong></summary>

> **`useCallback`** ve **`useMemo`** gibi hook'lar, uygulamanızda performans sorunları (örn: gereksiz yeniden render'lar) yaşamaya başladığınızda anlam kazanır. Başlangıçta bunlarla kafanızı karıştırmayın. Sorunla karşılaştığınızda çözümü öğrenmek daha kalıcı olacaktır.
> - **Kaynak:** [`useCallback` Docs](https://react.dev/reference/react/useCallback?utm_source=chatgpt.com)

</details>

### C. 📝 Formlar ve Validasyon (Dashboard'ların Kalbi)

Kullanıcıdan veri almak ve bu verinin doğruluğunu kontrol etmek kritiktir.

*   **🏆 Tavsiye Edilen İkili:** **React Hook Form + Zod**. Bu kombinasyon, form yönetimini ve validasyonu inanılmaz derecede basitleştirir.
*   **Kaynak:** [React Hook Form Docs](https://react-hook-form.com/docs?utm_source=chatgpt.com)

### D. 🔄 Veri Çekme Sanatı (Dashboard'u Canlandıran Kısım)

API'den veri çekerken sadece veriyi değil, sürecin kendisini de yönetmek gerekir.

*   **🧠 Zihinsel Model:** Her veri isteğinin üç durumu vardır: **Yükleniyor (Loading)**, **Başarılı (Success)**, **Hata (Error)**. Arayüzünüz bu üç duruma da cevap vermelidir.
*   **🚀 Güçlü Tavsiye:** **TanStack Query (React Query)**. Veri çekme, cache'leme, otomatik yenileme gibi karmaşık işlemleri sizin için halleder. Bir dashboard projesi için vazgeçilmezdir.
*   **Kaynak:** [TanStack Query Overview](https://tanstack.com/query/v5/docs/react/overview?utm_source=chatgpt.com)

---

## 🗺️ 3. Adım: Next.js'e Dalış - App Router

React temelleri oturduğunda, Next.js'in sunduğu mimariyi öğrenme zamanı.

| Konu | Ne İşe Yarar? | Kaynak |
| :--- | :--- | :--- |
| **App Router Yapısı** | Dosya ve klasörlerle URL yapısını oluşturur. **Server & Client Component** ayrımını anlamak en kritik adımdır. | [App Router Docs](https://nextjs.org/docs/app) |
| **Data Fetching** | `async/await` ile doğrudan sunucu bileşenlerinde veri çekmenizi sağlar. Backend ve frontend arasındaki sınırı kaldırır. | [Fetching Data](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating) |
| **Route Handlers** | Projeniz içinde `app/api/.../route.ts` dosyalarıyla kendi API endpoint'lerinizi oluşturmanızı sağlar. | [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) |
| **Server Actions** | Form gönderme gibi veri yazma işlemlerini güvenli sunucu fonksiyonları ile yapmanızı sağlar. | [Updating Data](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations) |

---

## 🛠️ 4. Adım: Proje Zamanı! - Nereden Başlamalı?

Teoriyi pratiğe dökmenin en etkili yolu proje yapmaktır.

### Öneri: Önce Portfolyo ➡️ Sonra Dashboard

**Neden?** Portfolyo projesi, Next.js'in temellerini (routing, styling, deploy) hızlıca oturtmanızı sağlar ve size "ürün çıkarma" motivasyonu verir. Bu temel oturduktan sonra, dashboard projesinde sadece veri ve iş mantığına odaklanmak çok daha kolay olur.

#### 🎓 Proje 1: Next.js Portfolyo Sitesi (Hızlı Başlangıç)

*   **Amaç:** Temel React ve Next.js yeteneklerini pekiştirmek.
*   **Görevler:**
    *   [ ] `/hakkimda`, `/projelerim`, `/iletisim` gibi statik sayfalar oluşturun.
    *   [ ] Header ve Footer gibi ortak bileşenleri `layout.tsx`'e yerleştirin.
    *   [ ] Projelerinizi bir JSON dosyasından okuyup listeleyin.
    *   [ ] `React Hook Form` ile bir iletişim formu ekleyin.

#### 🏆 Proje 2: Task Dashboard (Asıl Hedefiniz)

*   **Amaç:** API, veritabanı, kimlik doğrulama ve ileri seviye state yönetimi.
*   **Adımlar:**
    1.  **MVP (Minimum Çalışan Sürüm):**
        *   [ ] **UI:** Görev listesi, ekleme formu, filtreleme arayüzünü oluşturun.
        *   [ ] **API:** `Route Handlers` ile görevleri (task) yöneten CRUD endpoint'leri (`/api/tasks`) yazın.
        *   [ ] **Veritabanı:** Seçtiğiniz bir DB'ye (Postgres, SQLite vb.) bağlanın.
        *   [ ] **Veri Akışı:** Next.js ile veriyi çekin ve `TanStack Query` ile istemcide yönetin.
    2.  **Geliştirme (Sonraki Adımlar):**
        *   [ ] **Auth:** Kullanıcıların sadece kendi görevlerini göreceği bir giriş sistemi ekleyin.
        *   [ ] **Grafikler:** Tamamlanan görev sayısı gibi verileri görselleştiren grafikler ekleyin.
        *   [ ] **Server Actions:** Form işlemlerini `Server Actions` ile modernize edin.

> **🌟 Altın Değerinde Kaynak:** Next.js'in [resmi dashboard eğitimi](https://nextjs.org/learn/dashboard-app?utm_source=chatgpt.com), tam olarak bu senaryoyu adım adım uygulamanızı sağlar. Mutlaka göz atın!

---

## ✅ 5. "Projeye Ne Zaman Başlamalıyım?" - Net Kriterler

**Cevap: Hemen!** Ama başlamadan önce aşağıdaki minimum bilgi setine sahip olduğunuzdan emin olun:

- [x] JSX ve Component mantığı
- [x] Props ile veri aktarımı
- [x] `useState` ve `useEffect` kullanımı
- [x] `fetch` ile API'den veri çekme ve loading/error durum yönetimi
- [x] Next.js'te `app/` altında sayfa (`page.tsx`) ve ana yapı (`layout.tsx`) oluşturma

Bu kutucukları doldurduysanız, **Portfolyo projesine başlamaya hazırsınız!**

---

## ➡️ Sıradaki Adım: Size Özel Proje Planı

Bu yol haritasını daha da kişiselleştirmek için sıra sizde. Aşağıdaki soruları yanıtlarsanız, bir sonraki adımda size özel olarak (**kullanılacak kütüphaneler, dosya yapısı ve adım adım görev listesi dahil**) detaylı bir proje planı çıkarabilirim:

1.  **TypeScript kullanmak istiyor musunuz?** (Kesinlikle tavsiye ederim!)
2.  **Veritabanı olarak ne düşünüyorsunuz?** (Örn: Postgres, SQLite, MongoDB)
3.  **UI Kütüphanesi tercihiniz var mı?** (Örn: Tailwind CSS, Material UI, Shadcn/ui)