const gamesContainer = document.getElementById('games-container');
const loadingText = document.getElementById('loading');

// DİKKAT: storeID=1 kısmını sildik, artık tüm platformlardaki fırsatlar geliyor!
// pageSize=60 olarak güncellendi, artık ekranda 60 oyun göreceğiz.
async function getGameDeals() {
    try {
        const response = await fetch('https://www.cheapshark.com/api/1.0/deals?sortBy=Deal%20Rating&pageSize=60');
        const data = await response.json();
        
        loadingText.style.display = 'none';
        displayGames(data);
    } catch (error) {
        loadingText.innerText = "Fiyatlar çekilirken bir hata oluştu. Radar bozuldu!";
        console.error("API Hatası:", error);
    }
}

function displayGames(games) {
    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        
        // Kartın içindeki HTML yapısı. Resim ve platform ikonu birleşti.
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

// Sayfa yüklendiğinde motoru çalıştır
getGameDeals();