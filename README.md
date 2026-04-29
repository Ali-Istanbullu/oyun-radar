<div align="center">
  <img src="assets/img/logo.png" alt="Oyun Radar Logo" width="150"/>
  <h1>🎮 Oyun Radar</h1>
  <p><strong>Steam, Epic Games, GOG ve diğer resmi oyun mağazalarındaki anlık indirimleri tarayan, yapay zeka destekli fırsat motoru.</strong></p>

  [![Live Demo](https://img.shields.io/badge/Live-Demo-2ea44f?style=for-the-badge)](https://ali-istanbullu.github.io/oyun-radar)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
</div>

---

## 📖 Projenin Amacı
Gittikçe artan oyun fiyatları nedeniyle kullanıcıların farklı mağazalarda hangi oyunun daha uygun fiyata satıldığını tek tek kontrol etmesi zordur. **Oyun Radar**, bu problemi çözmek için tasarlandı. 

CheapShark API entegrasyonu sayesinde:
- Çeşitli mağazalardaki anlık indirimleri tek bir ekranda saniyeler içinde listeler.
- `%85` ve üzeri indirim alan oyunlara özel **"🔥 DİP FİYAT"** etiketi verir.
- Spesifik oyun isimleri ile hızlı arama yapmanızı ve doğrudan ürün sayfasına gitmenizi sağlar.
- Satın almadan önce alternatif olarak Kinguin üzerinden oyun key'i (anahtarı) aramanızı sağlayan hızlı kısayollar sunar.

## 🚀 Canlı Demo
Uygulamayı indirmeden doğrudan tarayıcınız üzerinden test edebilirsiniz:
👉 **[Oyun Radar'ı Canlı İnceleyin](https://ali-istanbullu.github.io/oyun-radar)**

## 📸 Ekran Görüntüleri



<div align="center">
  <img src="assets/img/Ekran görüntüsü 2026-04-30 000620.png" alt="Ana Sayfa Görünümü" width="48%" style="border-radius: 8px; border: 1px solid #333;"/>
  <img src="assets/img/Ekran görüntüsü 2026-04-30 000644.png" alt="Arama Sonuçları Görünümü" width="48%" style="border-radius: 8px; border: 1px solid #333;"/>
</div>

## 🛠 Kullanılan Teknolojiler
Bu proje, modern web standartlarına uygun, hafif, performanslı ve tamamen dışa bağımlılığı en aza indirgenmiş (vanilla) bir mimari ile geliştirilmiştir:

- **Frontend (Arayüz):** HTML5, CSS3 (Flexbox & Grid, Mobil Uyumlu Mat Kurumsal Tasarım), Vanilla JavaScript (ES6+)
- **API (Veri Sağlayıcı):** [CheapShark API](https://apidocs.cheapshark.com/) (Asenkron Fetch işlemleri)
- **Test Altyapısı:** Node.js & Jest (Unit Testing)
- **Performans Ölçümü:** Google Chrome Lighthouse

## ⚡ Performans ve Mimari Özellikleri
- **Lazy Loading (Tembel Yükleme):** Liste içerisindeki görseller sadece kullanıcı sayfayı aşağı kaydırdıkça yüklenir (`loading="lazy"`). Bu sayede sayfa açılış (FCP) süresi minimize edilmiştir.
- **Modüler Yapı:** Tüm kaynak dosyaları `assets` klasörü altında CSS, JS ve IMG olarak düzenli bir şekilde kategorize edilmiştir.
- **Test Kapsamı:** Veri parse etme, link oluşturma ve veri dönüşümleri gibi hayati JavaScript fonksiyonları `%100` oranında birim testleri ile güvence altına alınmıştır. (Daha fazla bilgi için: `TEST_DOKUMANTASYONU.md`)

## 💻 Kurulum (Local Development)

Projeyi bilgisayarınızda çalıştırmak veya kodları incelemek için:

1. **Projeyi Klonlayın:**
   ```bash
   git clone https://github.com/ali-istanbullu/oyun-radar.git
   cd oyun-radar
   ```

2. **Bağımlılıkları Yükleyin (Sadece test çalıştırmak için gereklidir):**
   ```bash
   npm install
   ```

3. **Projeyi Çalıştırın:**
   Herhangi bir local server (örneğin VS Code üzerinden `Live Server` eklentisi) veya komut satırı aracı kullanarak projeyi başlatın:
   ```bash
   npx http-server -p 8080
   ```
   Ardından tarayıcınızda `http://localhost:8080` adresine gidin.

4. **Testleri Çalıştırın:**
   ```bash
   npm test
   ```

## 🤝 Katkıda Bulunma
Bu proje geliştirilmeye açıktır. Herhangi bir hata bulursanız veya özellik önermek isterseniz, lütfen bir **Issue** açın veya **Pull Request** gönderin.

## 📄 Lisans
Bu proje kişisel bir portfolyo çalışmasıdır. Kodlar açık kaynaklı olup, [MIT Lisansı](https://opensource.org/licenses/MIT) altında eğitim ve geliştirme amaçlı özgürce kullanılabilir.
