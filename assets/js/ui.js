import {
    getStoreName,
    getStoreIconUrl,
    getHighResImage,
    getStoreLink,
    getKinguinLink,
    getStoreBtnLabel,
    formatPrice
} from './utils.js';

/**
 * Oyun Radar Arayüz (UI) Modülü
 * DOM manipülasyonu, HTML elementlerinin oluşturulması ve render işlemleri bu modülde gerçekleşir.
 */

const gamesContainer = document.getElementById('games-container');
const featuredContainer = document.getElementById('featured-games-container');

/**
 * Platform (Mağaza) rozetinin HTML şablonunu oluşturur.
 * @param {string} storeID - Mağaza kimliği.
 * @returns {string} Rozet HTML string'i.
 */
export function buildPlatformBadge(storeID) {
    const storeName = getStoreName(storeID);
    const iconUrl = getStoreIconUrl(storeID);
    return `
        <div class="platform-badge" title="${storeName}">
            <img src="${iconUrl}" alt="${storeName}" onerror="this.style.display='none'">
            <span class="store-tooltip">${storeName}</span>
        </div>
    `;
}

/**
 * Öne çıkan (Featured) oyunlar için görsel yüklenemediğinde çalışacak fallback (hata telafisi) fonksiyonu.
 * Bu fonksiyon, global scope'ta çalışabilmesi için window objesine atanmalıdır veya doğrudan script üzerinden bind edilmelidir.
 * @param {HTMLImageElement} imgElement - Hata veren resim elementi.
 * @param {string} fallbackThumb - İlk hatada denenecek yedek (thumbnail) resmi.
 */
export function handleFeaturedImageError(imgElement, fallbackThumb) {
    imgElement.onerror = function() {
        const card = this.closest('.featured-card');
        if (card) {
            card.className = 'game-card';
            document.getElementById('games-container').appendChild(card);
            this.src = 'assets/img/logo.png';
            this.onerror = null;
        }
    };
    imgElement.src = fallbackThumb;
}

/**
 * Liste oyunları için görsel yüklenemediğinde çalışacak fallback fonksiyonu.
 * @param {HTMLImageElement} imgElement - Hata veren resim elementi.
 * @param {string} fallbackThumb - İlk hatada denenecek yedek (thumbnail) resmi.
 */
export function handleListImageError(imgElement, fallbackThumb) {
    imgElement.onerror = function() {
        this.src = 'assets/img/logo.png';
        this.onerror = null;
    };
    imgElement.src = fallbackThumb;
}

// Inline HTML hata yakalayıcıları (onerror="handleListImageError(...)") için globale attach ediyoruz.
// Modül kapsamı izole olduğu için bu işlem HTML içindeki çağrıların kırılmamasını sağlar.
window.handleFeaturedImageError = handleFeaturedImageError;
window.handleListImageError = handleListImageError;

/**
 * Öne çıkan fırsatları carousel (dönen bant) yapısına render eder.
 * @param {Array} games - Render edilecek oyun indirim dizisi.
 */
export function displayFeaturedGames(games) {
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'featured-card';

        let epicBadgeHTML = '';
        if (Math.round(game.savings) >= 85) {
            epicBadgeHTML = `<div class="epic-badge">🔥 DİP FİYAT</div>`;
        }

        const normalPriceFormatted = formatPrice(game.normalPrice);
        const salePriceFormatted = formatPrice(game.salePrice);

        card.innerHTML = `
            <div class="image-container">
                ${epicBadgeHTML}
                <img src="${getHighResImage(game.thumb)}" onerror="handleFeaturedImageError(this, '${game.thumb}')" alt="${game.title}" class="game-img">
                ${buildPlatformBadge(game.storeID)}
            </div>
            <div class="game-info">
                <h3 class="game-title" title="${game.title}">${game.title}</h3>
                <div class="price-box">
                    <div class="discount-badge">-%${Math.round(game.savings)}</div>
                    <div class="price-details">
                        <span class="old-price">${normalPriceFormatted}</span>
                        <span class="new-price">${salePriceFormatted}</span>
                    </div>
                </div>
                <div class="action-buttons">
                    <a href="${getStoreLink(game.dealID, game.storeID, game.steamAppID)}" target="_blank" class="buy-btn">${getStoreBtnLabel(game.storeID)}</a>
                    <a href="${getKinguinLink(game.title)}" target="_blank" class="kinguin-btn">Kinguin'de Ara 🔑</a>
                    <span class="disclaimer-text">💲 USD fiyat — TRY için tıkla</span>
                </div>
            </div>
        `;
        if (featuredContainer) featuredContainer.appendChild(card);
    });
}

/**
 * Genel indirimli oyun listesini grid yapısına render eder.
 * @param {Array} games - Render edilecek oyun indirim dizisi.
 */
export function displayListGames(games) {
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';

        let epicBadgeHTML = '';
        if (Math.round(game.savings) >= 85) {
            epicBadgeHTML = `<div class="epic-badge">🔥 DİP FİYAT</div>`;
        }

        const normalPriceFormatted = formatPrice(game.normalPrice);
        const salePriceFormatted = formatPrice(game.salePrice);

        card.innerHTML = `
            <div class="image-container">
                ${epicBadgeHTML}
                <img src="${getHighResImage(game.thumb)}" onerror="handleListImageError(this, '${game.thumb}')" alt="${game.title}" class="game-img" loading="lazy">
                ${buildPlatformBadge(game.storeID)}
            </div>
            <div class="game-info">
                <h3 class="game-title" title="${game.title}">${game.title}</h3>
                <div class="price-box">
                    <div class="discount-badge">-%${Math.round(game.savings)}</div>
                    <div class="price-details">
                        <span class="old-price">${normalPriceFormatted}</span>
                        <span class="new-price">${salePriceFormatted}</span>
                    </div>
                </div>
                <div class="action-buttons">
                    <a href="${getStoreLink(game.dealID, game.storeID, game.steamAppID)}" target="_blank" class="buy-btn">${getStoreBtnLabel(game.storeID)}</a>
                    <a href="${getKinguinLink(game.title)}" target="_blank" class="kinguin-btn">Kinguin'de Ara 🔑</a>
                    <span class="disclaimer-text">💲 USD fiyat — TRY için tıkla</span>
                </div>
            </div>
        `;
        if (gamesContainer) gamesContainer.appendChild(card);
    });
}
