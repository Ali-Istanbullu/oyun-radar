import { fetchStores, fetchDeals } from './api.js';
import { displayFeaturedGames, displayListGames } from './ui.js';
import { initializeStores } from './utils.js';
import Logger from './logger.js';

/**
 * Oyun Radar Ana (Main) Modülü
 * Uygulamanın başlatılması, DOM olay dinleyicileri (event listeners) ve iş akışı kontrolü buradan yapılır.
 */

const loadingText = document.getElementById('loading');
const gamesContainer = document.getElementById('games-container');
const featuredContainer = document.getElementById('featured-games-container');
const featuredSection = document.getElementById('featured-section');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

/**
 * Fırsatları çeker, yükleme yazısını yönetir ve UI'a render eder.
 * @param {string} [searchQuery=""] - Kullanıcının arama sorgusu.
 */
async function loadAndDisplayDeals(searchQuery = "") {
    if (!loadingText) return; // İletişim vs. sayfalarında hata vermemesi için
    
    loadingText.style.display = 'block';
    if (gamesContainer) gamesContainer.innerHTML = '';
    
    if (searchQuery === "") {
        if (featuredContainer) featuredContainer.innerHTML = '';
        if (featuredSection) featuredSection.style.display = 'block';
    } else {
        if (featuredSection) featuredSection.style.display = 'none';
    }

    try {
        const deals = await fetchDeals(searchQuery);
        loadingText.style.display = 'none';

        if (deals.length === 0) {
            if (gamesContainer) gamesContainer.innerHTML = '<p style="text-align:center; width:100%;">Oyun bulunamadı veya şu an indirimde değil.</p>';
            return;
        }

        if (searchQuery === "") {
            // Ana sayfa akışı: İlk 8'i öne çıkana, kalanları listeye
            const featuredGames = deals.slice(0, 8);
            const listGames = deals.slice(8);
            displayFeaturedGames(featuredGames);
            displayListGames(listGames);
        } else {
            // Arama sonuçları akışı
            displayListGames(deals);
        }

    } catch (error) {
        Logger.error('Fırsatlar yüklenirken hata oluştu:', error);
        if (loadingText) loadingText.innerHTML = 'Fırsatlar yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.';
    }
}

// Olay Dinleyicileri (Event Listeners)
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        loadAndDisplayDeals(searchInput.value.trim());
    });
}

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loadAndDisplayDeals(searchInput.value.trim());
        }
    });
}

// Carousel Kaydırma Mekanizması
const scrollLeftBtn = document.getElementById('scroll-left');
const scrollRightBtn = document.getElementById('scroll-right');

if (scrollLeftBtn && scrollRightBtn && featuredContainer) {
    scrollLeftBtn.addEventListener('click', () => {
        featuredContainer.scrollBy({ left: -340, behavior: 'smooth' });
    });
    scrollRightBtn.addEventListener('click', () => {
        featuredContainer.scrollBy({ left: 340, behavior: 'smooth' });
    });
}

/**
 * Uygulamanın başlangıç fonksiyonu. Önce mağaza listesini, ardından oyunları çeker.
 */
async function initApp() {
    Logger.info('Uygulama başlatılıyor...');
    const stores = await fetchStores();
    initializeStores(stores);
    Logger.info(`${Object.keys(stores).length || stores.length} mağaza yüklendi.`);
    await loadAndDisplayDeals();
}

// Eğer oyunlar/arama çubuğu varsa uygulamayı başlat (index.html üzerindeysek)
if (document.getElementById('search-input')) {
    initApp();
}
