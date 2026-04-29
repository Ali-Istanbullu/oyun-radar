/**
 * Oyun Radar API Servisi
 * Bu modül sadece dış kaynaklı API'ler ile haberleşmekten sorumludur.
 * DOM manipülasyonu içermez.
 */

/**
 * CheapShark API'sinden mağaza listesini asenkron olarak çeker.
 * @returns {Promise<Array>} Mağaza nesnelerini içeren dizi.
 */
export async function fetchStores() {
    try {
        const response = await fetch('https://www.cheapshark.com/api/1.0/stores');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.warn('Mağaza listesi yüklenemedi:', error);
        return [];
    }
}

/**
 * Belirtilen arama sorgusuna göre indirimdeki oyunları çeker.
 * @param {string} [searchQuery=""] - Aranacak oyun adı (Boş bırakılırsa en popüler indirimleri çeker).
 * @returns {Promise<Array>} Oyun indirim nesnelerini içeren dizi.
 */
export async function fetchDeals(searchQuery = "") {
    try {
        let url = 'https://www.cheapshark.com/api/1.0/deals?sortBy=Deal%20Rating&pageSize=60&metacritic=75&onSale=1';
        
        if (searchQuery !== "") {
            url += `&title=${encodeURIComponent(searchQuery)}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('API yanıt vermedi.');
        
        return await response.json();
    } catch (error) {
        console.error("API Hatası:", error);
        throw error;
    }
}
