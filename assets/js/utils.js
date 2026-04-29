/**
 * Oyun Radar Yardımcı (Utility) Fonksiyonları
 * Veri formatlama, hesaplama ve string dönüşümleri gibi bağımsız fonksiyonları içerir.
 */

export const storeMap = {};

/**
 * API'den gelen mağaza verilerini yerel storeMap objesine kaydeder.
 * @param {Array} stores - Mağaza nesneleri dizisi.
 */
export function initializeStores(stores) {
    stores.forEach(store => {
        // API kurallarına göre icon URL'si için storeID - 1 kullanılır.
        const iconIndex = parseInt(store.storeID) - 1;
        storeMap[store.storeID] = {
            storeName: store.storeName,
            iconUrl: `https://www.cheapshark.com/img/stores/icons/${iconIndex}.png`
        };
    });
}

/**
 * Store ID'sine karşılık gelen mağaza adını döndürür.
 * @param {string} storeID - Mağaza kimlik numarası.
 * @returns {string} Mağaza adı.
 */
export function getStoreName(storeID) {
    return storeMap[storeID] ? storeMap[storeID].storeName : `Mağaza #${storeID}`;
}

/**
 * Store ID'sine karşılık gelen mağaza ikonu URL'sini döndürür.
 * @param {string} storeID - Mağaza kimlik numarası.
 * @returns {string} İkon URL'si.
 */
export function getStoreIconUrl(storeID) {
    if (storeMap[storeID]) {
        return storeMap[storeID].iconUrl;
    }
    return `https://www.cheapshark.com/img/stores/icons/${parseInt(storeID) - 1}.png`;
}

/**
 * Steam'in düşük çözünürlüklü kapak fotoğraflarını yüksek çözünürlüklü versiyonlarla değiştirir.
 * @param {string} url - Orijinal resim URL'si.
 * @returns {string} Yüksek çözünürlüklü resim URL'si.
 */
export function getHighResImage(url) {
    if (url && url.includes('steam/apps')) {
        return url.replace(/\/capsule_.*\.jpg/i, '/header.jpg');
    }
    return url;
}

/**
 * Satın alma linkini oluşturur. Steam için doğrudan link, diğerleri için yönlendirme kullanır.
 * @param {string} dealID - CheapShark Deal ID.
 * @param {string} storeID - Mağaza ID.
 * @param {string} steamAppID - Steam Application ID.
 * @returns {string} Yönlendirilecek URL.
 */
export function getStoreLink(dealID, storeID, steamAppID) {
    if (storeID === '1' && steamAppID) {
        return `https://store.steampowered.com/app/${steamAppID}`;
    }
    return `https://www.cheapshark.com/redirect?dealID=${dealID}`;
}

/**
 * Verilen oyun başlığı ile Kinguin mağazasında arama yapan link oluşturur.
 * @param {string} gameTitle - Oyun adı.
 * @returns {string} Kinguin arama URL'si.
 */
export function getKinguinLink(gameTitle) {
    const encodedTitle = encodeURIComponent(gameTitle);
    return `https://www.kinguin.net/?r=69984de7361b0&search=${encodedTitle}`;
}

/**
 * Mağazaya özel buton etiket metnini döndürür.
 * @param {string} storeID - Mağaza ID.
 * @returns {string} Buton metni.
 */
export function getStoreBtnLabel(storeID) {
    if (storeID === '1') return 'Steam\'de Kontrol Et ↗';
    if (storeID === '25') return 'Epic\'de Kontrol Et ↗';
    if (storeID === '7') return 'GOG\'da Kontrol Et ↗';
    if (storeID === '11') return 'Humble\'da Kontrol Et ↗';
    return 'Mağazada Kontrol Et ↗';
}

/**
 * Sayısal fiyatı dolar formatına çevirir.
 * @param {string|number} price - Fiyat değeri.
 * @returns {string} Formatlanmış fiyat ($19.99) veya "Ücretsiz".
 */
export function formatPrice(price) {
    const num = parseFloat(price);
    if (isNaN(num) || num <= 0) return 'Ücretsiz';
    return `$${num.toFixed(2)}`;
}
