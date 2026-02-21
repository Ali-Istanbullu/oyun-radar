const gamesContainer = document.getElementById('games-container');
const featuredContainer = document.getElementById('featured-games-container');
const featuredSection = document.getElementById('featured-section');
const allDealsTitle = document.getElementById('all-deals-title');
const loadingText = document.getElementById('loading');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

const scrollLeftBtn = document.getElementById('scroll-left');
const scrollRightBtn = document.getElementById('scroll-right');

// Yağ gibi kaydırma (Smooth Scroll) motoru
if (scrollLeftBtn && scrollRightBtn) {
    scrollLeftBtn.addEventListener('click', () => {
        featuredContainer.scrollBy({ 
            top: 0, 
            left: -640, 
            behavior: 'smooth' 
        });
    });

    scrollRightBtn.addEventListener('click', () => {
        featuredContainer.scrollBy({ 
            top: 0, 
            left: 640,  
            behavior: 'smooth' 
        });
    });
}

async function getGameDeals(searchQuery = "") {
    try {
        gamesContainer.innerHTML = '';
        featuredContainer.innerHTML = '';
        featuredSection.style.display = 'none';
        allDealsTitle.style.display = 'none';
        
        loadingText.style.display = 'block';
        loadingText.innerText = "İndirimler taranıyor... Yapay zeka iş başında 🤖";

        let url = 'https://www.cheapshark.com/api/1.0/deals?sortBy=Deal%20Rating&pageSize=60&metacritic=75';
        
        if (searchQuery !== "") {
            url += `&title=${searchQuery}`;
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

function displayFeaturedGames(games) {
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'featured-card';
        // YENİ: İndirim yüzdesi ve yeni fiyat yapısı
        card.innerHTML = `
            <div class="image-container">
                <img src="${game.thumb}" alt="${game.title}" class="game-img">
                <div class="platform-badge" title="Mağaza ID: ${game.storeID}">
                    <img src="https://www.cheapshark.com/img/stores/icons/${game.storeID}.png" alt="Platform">
                </div>
            </div>
            <div class="game-info">
                <h3 class="game-title" title="${game.title}">${game.title}</h3>
                <div class="price-box">
                    <div class="discount-badge">-%${Math.round(game.savings)}</div>
                    <div class="price-details">
                        <span class="old-price">$${game.normalPrice}</span>
                        <span class="new-price">$${game.salePrice}</span>
                    </div>
                </div>
                <a href="https://www.cheapshark.com/redirect?dealID=${game.dealID}" target="_blank" class="buy-btn">İndirimi Gör</a>
            </div>
        `;
        featuredContainer.appendChild(card);
    });
}

function displayListGames(games) {
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        // YENİ: İndirim yüzdesi ve yeni fiyat yapısı
        card.innerHTML = `
            <div class="image-container">
                <img src="${game.thumb}" alt="${game.title}" class="game-img">
                <div class="platform-badge" title="Mağaza ID: ${game.storeID}">
                    <img src="https://www.cheapshark.com/img/stores/icons/${game.storeID}.png" alt="Platform">
                </div>
            </div>
            <div class="game-info">
                <h3 class="game-title" title="${game.title}">${game.title}</h3>
                <div class="price-box">
                    <div class="discount-badge">-%${Math.round(game.savings)}</div>
                    <div class="price-details">
                        <span class="old-price">$${game.normalPrice}</span>
                        <span class="new-price">$${game.salePrice}</span>
                    </div>
                </div>
                <a href="https://www.cheapshark.com/redirect?dealID=${game.dealID}" target="_blank" class="buy-btn">İndirimi Gör</a>
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

getGameDeals();