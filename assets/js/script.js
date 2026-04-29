const gamesContainer = document.getElementById('games-container');
const featuredContainer = document.getElementById('featured-games-container');
const featuredSection = document.getElementById('featured-section');
const allDealsTitle = document.getElementById('all-deals-title');
const loadingText = document.getElementById('loading');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

const scrollLeftBtn = document.getElementById('scroll-left');
const scrollRightBtn = document.getElementById('scroll-right');

// Mağaza listesi: storeID -> { storeName, iconIndex }
// CheapShark API'sinde icon dosyaları storeID - 1 ile isimlendiriliyor.
let storeMap = {};

async function loadStores() {
    try {
        const res = await fetch('https://www.cheapshark.com/api/1.0/stores');
        const stores = await res.json();
        stores.forEach(store => {
            // iconIndex = storeID - 1 (API'nin kendi dokümanında belirtilen doğru formül)
            const iconIndex = parseInt(store.storeID) - 1;
            storeMap[store.storeID] = {
                storeName: store.storeName,
                iconUrl: `https://www.cheapshark.com/img/stores/icons/${iconIndex}.png`
            };
        });
    } catch (e) {
        console.warn('Mağaza listesi yüklenemedi:', e);
    }
}

function getStoreName(storeID) {
    return storeMap[storeID] ? storeMap[storeID].storeName : `Mağaza #${storeID}`;
}

function getStoreIconUrl(storeID) {
    if (storeMap[storeID]) {
        return storeMap[storeID].iconUrl;
    }
    // Fallback: storeID - 1
    return `https://www.cheapshark.com/img/stores/icons/${parseInt(storeID) - 1}.png`;
}

if (scrollLeftBtn && scrollRightBtn) {
    scrollLeftBtn.addEventListener('click', () => {
        featuredContainer.scrollBy({ top: 0, left: -640, behavior: 'smooth' });
    });

    scrollRightBtn.addEventListener('click', () => {
        featuredContainer.scrollBy({ top: 0, left: 640, behavior: 'smooth' });
    });
}

function getHighResImage(url) {
    if (url && url.includes('steam/apps')) {
        return url.replace(/\/capsule_.*\.jpg/i, '/header.jpg');
    }
    return url;
}

function getStoreLink(dealID, storeID, steamAppID) {
    if (storeID === '1' && steamAppID) {
        return `https://store.steampowered.com/app/${steamAppID}`;
    }
    return `https://www.cheapshark.com/redirect?dealID=${dealID}`;
}

function getKinguinLink(gameTitle) {
    const encodedTitle = encodeURIComponent(gameTitle);
    return `https://www.kinguin.net/?r=69984de7361b0&search=${encodedTitle}`;
}

function getStoreBtnLabel(storeID) {
    if (storeID === '1') return 'Steam\'de Kontrol Et ↗';
    if (storeID === '25') return 'Epic\'de Kontrol Et ↗';
    if (storeID === '7') return 'GOG\'da Kontrol Et ↗';
    if (storeID === '11') return 'Humble\'da Kontrol Et ↗';
    return 'Mağazada Kontrol Et ↗';
}

function formatPrice(price) {
    const num = parseFloat(price);
    if (isNaN(num) || num <= 0) return 'Ücretsiz';
    return `$${num.toFixed(2)}`;
}

function handleFeaturedImageError(imgElement, fallbackThumb) {
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

function handleListImageError(imgElement, fallbackThumb) {
    imgElement.onerror = function() {
        this.src = 'assets/img/logo.png';
        this.onerror = null;
    };
    imgElement.src = fallbackThumb;
}

async function getGameDeals(searchQuery = "") {
    try {
        gamesContainer.innerHTML = '';
        featuredContainer.innerHTML = '';
        featuredSection.style.display = 'none';
        allDealsTitle.style.display = 'none';

        loadingText.style.display = 'block';
        loadingText.innerText = "İndirimler taranıyor... Yapay zeka iş başında 🤖";

        let url = 'https://www.cheapshark.com/api/1.0/deals?sortBy=Deal%20Rating&pageSize=60&metacritic=75&onSale=1';

        if (searchQuery !== "") {
            url += `&title=${encodeURIComponent(searchQuery)}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        loadingText.style.display = 'none';

        if (data.length === 0) {
            loadingText.style.display = 'block';
            loadingText.innerText = "Maalesef bu oyunda şu an bir indirim bulamadık 😔";
            return;
        }

        if (searchQuery === "") {
            featuredSection.style.display = 'block';
            allDealsTitle.style.display = 'block';
            allDealsTitle.innerText = "Diğer Harika Fırsatlar";

            const topGames = data.slice(0, 15);
            const restGames = data.slice(15);

            displayFeaturedGames(topGames);
            displayListGames(restGames);
        } else {
            allDealsTitle.style.display = 'block';
            allDealsTitle.innerText = `"${searchQuery}" İçin Sonuçlar`;
            displayListGames(data);
        }

    } catch (error) {
        loadingText.style.display = 'block';
        loadingText.innerText = "Fiyatlar çekilirken bir hata oluştu. Radar bozuldu!";
        console.error("API Hatası:", error);
    }
}

function buildPlatformBadge(storeID) {
    const storeName = getStoreName(storeID);
    const iconUrl = getStoreIconUrl(storeID);
    return `
        <div class="platform-badge" title="${storeName}">
            <img src="${iconUrl}" alt="${storeName}" onerror="this.style.display='none'">
            <span class="store-tooltip">${storeName}</span>
        </div>
    `;
}

function displayFeaturedGames(games) {
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
        featuredContainer.appendChild(card);
    });
}

function displayListGames(games) {
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
        gamesContainer.appendChild(card);
    });
}

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    getGameDeals(query);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        getGameDeals(query);
    }
});

// Önce mağaza listesini yükle, sonra oyunları getir
loadStores().then(() => getGameDeals());

// Test ortamı için fonksiyonları dışa aktar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getStoreName,
        getStoreIconUrl,
        getHighResImage,
        getStoreLink,
        getKinguinLink,
        getStoreBtnLabel,
        formatPrice,
        storeMap
    };
}