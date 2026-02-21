const gamesContainer = document.getElementById('games-container');
const loadingText = document.getElementById('loading');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

async function getGameDeals(searchQuery = "") {
    try {
        gamesContainer.innerHTML = '';
        loadingText.style.display = 'block';
        loadingText.innerText = "İndirimler taranıyor... Yapay zeka iş başında 🤖";

        // YENİ: Metacritic skoru 75 ve üzeri olan kaliteli oyunları getiriyoruz!
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

        displayGames(data);
    } catch (error) {
        loadingText.style.display = 'block';
        loadingText.innerText = "Fiyatlar çekilirken bir hata oluştu. Radar bozuldu!";
        console.error("API Hatası:", error);
    }
}

function displayGames(games) {
    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        
        gameCard.innerHTML = `
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
        
        gamesContainer.appendChild(gameCard);
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