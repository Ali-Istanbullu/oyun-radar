# Oyun Radar Birim Testi Dokümantasyonu

Bu doküman, Oyun Radar projesi için oluşturulan test altyapısı ve testlerin nasıl çalıştırılacağı hakkında bilgi vermektedir.

## Test Altyapısı

Projede, yardımcı (pure) JavaScript fonksiyonlarının doğru çalıştığından emin olmak için **Node.js** ve **Jest** kullanılarak bir test altyapısı kurulmuştur.

- **Jest:** JavaScript test çerçevesi (framework).
- **Jest-Environment-Jsdom:** Node.js ortamında çalışan testlerde tarayıcıya (browser) özgü `document` ve `window` gibi nesnelerin kullanılabilmesini (mock) sağlar.

## Kurulum ve Çalıştırma

Projeyi yeni bir bilgisayara indirdiğinizde, testleri çalıştırabilmek için öncelikle Node.js modüllerini yüklemeniz gerekmektedir:

```bash
# Proje dizininde terminali açın ve bağımlılıkları yükleyin:
npm install

# Testleri çalıştırmak için şu komutu girin:
npm test
```

## Neler Test Ediliyor?

Testler `script.test.js` dosyası içerisinde yazılmıştır. Test edilen başlıca fonksiyonlar ve senaryolar şunlardır:

1. **`getStoreName`**
   - Mağaza ID'si biliniyorsa doğru mağaza adını (`Steam`, `Epic Games` vb.) döndürür.
   - Bilinmiyorsa varsayılan `Mağaza #ID` metnini döndürür.

2. **`getStoreIconUrl`**
   - Mağaza ID'sine karşılık gelen doğru ikon URL'sini döndürür.
   - Eğer hafızada bulunamadıysa `(ID - 1).png` varsayılan formatında URL üretir.

3. **`getHighResImage`**
   - Steam API'sinden gelen düşük çözünürlüklü (`capsule`) resimleri yüksek çözünürlüklü (`header`) versiyonlara dönüştürür.
   - Steam harici resim URL'lerini bozmadan aynen geri döndürür.

4. **`getStoreLink`**
   - Steam oyunlarını doğrudan Steam mağazasına yönlendirir.
   - Diğer mağazalar için CheapShark referans linkini oluşturur.

5. **`getKinguinLink`**
   - Aranacak oyun ismini URI formatına çevirerek doğru Kinguin arama linkini üretir.

6. **`getStoreBtnLabel`**
   - Mağaza ID'lerine göre ("Steam'de Kontrol Et", "Epic'de Kontrol Et" vb.) doğru buton etiketini oluşturur.

7. **`formatPrice`**
   - Fiyatları `$` işareti ile ondalıklı (örn: `$19.99`) şekilde formatlar.
   - Fiyat 0, geçersiz veya negatif ise `Ücretsiz` yazısını döndürür.

## Yeni Test Eklemek

Eğer `script.js` içerisine yeni bir metot eklerseniz ve bunu test etmek isterseniz şu adımları izleyin:

1. **Fonksiyonu Dışa Aktarın:** `script.js` dosyasının en altındaki `module.exports` bloğuna yeni eklediğiniz fonksiyonu ekleyin.
   ```javascript
   if (typeof module !== 'undefined' && module.exports) {
       module.exports = {
           // ...diğer fonksiyonlar
           yeniFonksiyon
       };
   }
   ```
2. **Test Dosyasına Ekleyin:** `script.test.js` dosyasının üst kısmındaki `require` bloğuna bu yeni fonksiyonu dahil edin.
   ```javascript
   const { yeniFonksiyon } = require('./script');
   ```
3. **Test Senaryosunu Yazın:** `script.test.js` içerisinde uygun bir `describe` bloğu açarak test senaryolarınızı oluşturun.
   ```javascript
   describe('yeniFonksiyon', () => {
       test('beklenen davranışı göstermeli', () => {
           expect(yeniFonksiyon(girdi)).toBe(beklenenCikti);
       });
   });
   ```

## Önemli Not
`script.js` sadece Node.js üzerinde (test amaçlı) değil, tarayıcı üzerinde de çalışmaktadır. Test ortamı için eklenen `module.exports` bloğunun tarayıcı tarafını etkilememesi için güvenli `typeof module !== 'undefined'` kontrolüyle sınırlandırılmıştır. Lütfen bu bloğu silmeyiniz.
