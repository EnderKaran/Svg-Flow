# SVG-Flow

**Turn SVGs into production-ready React components. Instantly.**

SVG-Flow, ham SVG kodlarını temizleyen, optimize eden ve modern React (TSX) bileşenlerine dönüştüren yüksek performanslı bir geliştirici aracıdır. Karmaşık XML çöplerinden kurtulun ve projelerinize saniyeler içinde temiz kod entegre edin.

[Live Demo ](https://svg-flow.vercel.app/)

---

## Özellikler

* **SVGO Entegrasyonu:** Gereksiz metadata, ID ve grupları otomatik temizler.
* **AST-Based Transformation:** SVG niteliklerini React-uyumlu (camelCase) yapılara dönüştürür.
* **Monaco Editor Deneyimi:** VS Code çekirdeği ile syntax highlighting ve akıllı kod düzenleme.
* **Live Preview:** Dönüştürdüğünüz ikonun nasıl göründüğünü anlık olarak takip edin.
* **Tailwind & Lucide Style:** Üretilen bileşenler `size` ve `className` prop'ları ile tam kontrol edilebilir.
* **Sonner Notifications:** Akıcı ve modern kullanıcı geribildirimleri.

##  Teknoloji Yığını

* **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Engine:** [SVGO](https://github.com/svg/svgo)

---

## Yerel Kurulum

Projeyi kendi makinenizde çalıştırmak için:

1. Repoyu clone'layın:
   ```bash
   git clone [https://github.com/EnderKaran/Svg-Flow](https://github.com/EnderKaran/Svg-Flow)
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

---

## Mühendislik Yaklaşımı (Senior Insights)

Bu proje sadece bir "string replacer" değildir. Bir mühendislik aracı olarak şu yaklaşımları benimser:
- **Server Actions:** Ağır optimizasyon işlemleri (SVGO) sunucu tarafında güvenli bir şekilde işlenir.
- **Component Architecture:** Shadcn UI ve Radix UI ile erişilebilir ve modüler bileşen yapısı.
- **DX (Developer Experience):** JetBrains Mono fontu ve koyu mod odaklı tasarım ile uzun süreli kullanıma uygun arayüz.

---

## Lisans

Bu proje MIT lisansı altındadır.


