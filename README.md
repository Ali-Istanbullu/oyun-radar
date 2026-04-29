# Oyun Radar 🎮

Oyun Radar, Steam, Epic Games, GOG ve diğer resmi oyun mağazalarındaki anlık indirimleri tarayan, kullanıcıların en sevdikleri PC oyunlarına en uygun fiyatlarla ulaşmasını sağlayan yapay zeka destekli bir fırsat bulucu (deal tracker) web uygulamasıdır. 

**🚀 Canlı Demo (Live Demo):** [Oyun Radar'ı Canlı İnceleyin](https://ali-istanbullu.github.io/oyun-radar) *(Not: GitHub Pages linkiniz bu şekilde olacaktır, yapılandırma sonrası aktifleşir.)*

## 🎯 Projenin Amacı
Gittikçe artan oyun fiyatları nedeniyle kullanıcıların farklı mağazalarda hangi oyunun daha uygun fiyata satıldığını tek tek kontrol etmesi zordur. Oyun Radar, CheapShark API entegrasyonu sayesinde:
- Çeşitli mağazalardaki anlık indirimleri tek bir ekranda listeler.
- %85 ve üzeri indirim alan oyunlara "DİP FİYAT" etiketi verir.
- Spesifik oyun isimleri ile arama yapmanızı ve doğrudan ürün sayfasına gitmenizi sağlar.
- Satın almadan önce alternatif olarak Kinguin üzerinden oyun key'i (anahtarı) aramanızı sağlayan hızlı entegrasyonlar sunar.

## 🛠 Kullanılan Teknolojiler
Bu proje, modern web standartlarına uygun olarak hafif ve performanslı olması için saf (vanilla) teknolojiler kullanılarak geliştirilmiştir.

- **HTML5 & CSS3:** Semantik web yapısı, esnek Grid & Flexbox tabanlı responsive (mobil uyumlu) mat, profesyonel tasarım.
- **Vanilla JavaScript (ES6+):** Asenkron veri çekme (Fetch API), dinamik DOM manipülasyonu.
- **Jest:** Projedeki JavaScript fonksiyonlarının (veri işleme vb.) güvenilirliğini doğrulamak için kurulan birim (unit) test altyapısı.
- **Lighthouse:** Performans, SEO ve erişilebilirlik optimizasyonları için test aracı.

## 📸 Ekran Görüntüleri
*(Proje GitHub'a yüklendikten sonra buraya uygulamanın ekran görüntülerini ekleyebilirsiniz.)*
<!-- ![Ana Sayfa](assets/img/screenshot-1.png) -->
<!-- ![Arama Sonuçları](assets/img/screenshot-2.png) -->

## ⚡ Performans ve Optimizasyon
- Proje, yüksek performans sağlaması amacıyla optimize edilmiştir.
- **Lazy Loading:** API'den gelen resimler, sayfanın alt kısımlarına inildikçe yüklenir (Lazy Loading), bu sayede İlk Boyama (FCP) süreleri oldukça düşüktür.
- **Test Kapsamı:** Ana uygulama mantığındaki metodlar `%100` oranında test edilmiştir.

## 🚀 Kurulum (Local Development)

Projeyi kendi bilgisayarınızda çalıştırmak veya geliştirmek isterseniz aşağıdaki adımları takip edebilirsiniz:

1. **Projeyi Klonlayın:**
   ```bash
   git clone https://github.com/ali-istanbullu/oyun-radar.git
   cd oyun-radar
   ```

2. **Bağımlılıkları Yükleyin (Test Ortamı için):**
   ```bash
   npm install
   ```

3. **Uygulamayı Çalıştırın:**
   Herhangi bir local server (örneğin VS Code Live Server eklentisi veya `npx http-server`) kullanarak `index.html` dosyasını çalıştırabilirsiniz.
   ```bash
   npx http-server -p 8080
   ```

4. **Testleri Çalıştırın:**
   ```bash
   npm test
   ```

## 📄 Lisans
Bu proje kişisel bir portfolyo çalışmasıdır. Kodlar açık kaynaklı olup, eğitim ve geliştirme amaçlı kullanılabilir.
