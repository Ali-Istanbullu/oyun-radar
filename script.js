const gamesContainer = document.getElementById('games-container');
const featuredContainer = document.getElementById('featured-games-container');
const featuredSection = document.getElementById('featured-section');
const allDealsTitle = document.getElementById('all-deals-title');
const loadingText = document.getElementById('loading');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

async function getGameDeals(searchQuery = "") {
    try {
        gamesContainer.innerHTML = '';
        featuredContainer.innerHTML = '';
        featuredSection.style.display = 'none';
        allDealsTitle.style.display = 'none';
        
        loadingText.style.display = 'block';
        loadingText.innerText = "İndirimler taranıyor... Yapay zeka iş başında 🤖";

        // Metacritic puanı 75+ olanları çekiyoruz
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
            // Arama yoksa siteyi ikiye böl
            featuredSection.style.display = 'block';
            allDealsTitle.style.display = 'block';
            allDealsTitle.innerText = "Diğer Harika Fırsatlar";

            const topGames = data.slice(0, 6); // İlk 6 oyun öne çıkanlara
            const restGames = data.slice(6);   // Geri kalanı listeye

            displayFeaturedGames(topGames);
            displayListGames(restGames);
        } else {
            // Arama yapıldıysa sadece listeyi göster
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

// BÜYÜK KARTLARI BASAN FONKSİYON
function displayFeaturedGames(games) {
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'featured-card';
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
                    <span class="old-price">$${game.normalPrice}</span>
                    <span class="new-price">$${game.salePrice}</span>
                </div>
                <a href="https://www.cheapshark.com/redirect?dealID=${game.dealID}" target="_blank" class="buy-btn">İndirimi Gör</a>
            </div>
        `;
        featuredContainer.appendChild(card);
    });
}

// YATAY LİSTEYİ BASAN FONKSİYON
function displayListGames(games) {
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
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
                    <span class="old-price">$${game.normalPrice}</span>
                    <span class="new-price">$${game.salePrice}</span>
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