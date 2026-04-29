/**
 * @jest-environment jsdom
 */

// Sayfa üzerinde aranan DOM elemanlarını mock'luyoruz
document.body.innerHTML = `
    <div id="games-container"></div>
    <div id="featured-games-container"></div>
    <div id="featured-section"></div>
    <h2 id="all-deals-title"></h2>
    <div id="loading"></div>
    <input id="search-input" />
    <button id="search-btn"></button>
    <button id="scroll-left"></button>
    <button id="scroll-right"></button>
`;

// Fetch API'sini mockluyoruz (loadStores vs için hata vermemesi adına)
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([]),
    })
);

import { jest } from '@jest/globals';
import {
    getStoreName,
    getStoreIconUrl,
    getHighResImage,
    getStoreLink,
    getKinguinLink,
    getStoreBtnLabel,
    formatPrice,
    storeMap
} from '../assets/js/utils.js';

describe('Oyun Radar - Yardımcı Fonksiyon Testleri', () => {
    beforeEach(() => {
        // Testler öncesinde storeMap'i test verileriyle dolduralım
        storeMap['1'] = { storeName: 'Steam', iconUrl: 'steam-icon.png' };
        storeMap['25'] = { storeName: 'Epic Games', iconUrl: 'epic-icon.png' };
    });

    afterEach(() => {
        // Her testten sonra storeMap'i temizle
        for (let key in storeMap) delete storeMap[key];
    });

    describe('getStoreName', () => {
        test('storeMap içerisinde ID varsa mağaza adını döndürür', () => {
            expect(getStoreName('1')).toBe('Steam');
            expect(getStoreName('25')).toBe('Epic Games');
        });

        test('storeMap içerisinde ID yoksa fallback (varsayılan) metin döndürür', () => {
            expect(getStoreName('999')).toBe('Mağaza #999');
        });
    });

    describe('getStoreIconUrl', () => {
        test('storeMap içerisinde ID varsa ikon URL sini döndürür', () => {
            expect(getStoreIconUrl('1')).toBe('steam-icon.png');
        });

        test('storeMap içerisinde ID yoksa fallback ikon URL sini döndürür (ID - 1)', () => {
            expect(getStoreIconUrl('10')).toBe('https://www.cheapshark.com/img/stores/icons/9.png');
        });
    });

    describe('getHighResImage', () => {
        test('Steam capsule (küçük) resimlerini header (büyük) resimlerine dönüştürür', () => {
            const url = 'https://cdn.akamai.steamstatic.com/steam/apps/12345/capsule_sm_120.jpg';
            expect(getHighResImage(url)).toBe('https://cdn.akamai.steamstatic.com/steam/apps/12345/header.jpg');
        });

        test('Steam harici resimleri değiştirmeden döndürür', () => {
            const url = 'https://cdn.epicgames.com/image.jpg';
            expect(getHighResImage(url)).toBe(url);
        });
        
        test('Geçersiz url verildiğinde hatasız çalışır', () => {
            expect(getHighResImage('')).toBe('');
        });
    });

    describe('getStoreLink', () => {
        test('Mağaza Steam ise (ID = 1) doğrudan Steam ürün sayfasına yönlendirir', () => {
            expect(getStoreLink('deal123', '1', '456')).toBe('https://store.steampowered.com/app/456');
        });

        test('Mağaza Steam değilse CheapShark yönlendirme linkini verir', () => {
            expect(getStoreLink('deal123', '25', '456')).toBe('https://www.cheapshark.com/redirect?dealID=deal123');
        });
    });

    describe('getKinguinLink', () => {
        test('Oyun ismini URI formatına çevirerek Kinguin arama linki oluşturur', () => {
            expect(getKinguinLink('Red Dead Redemption 2')).toBe('https://www.kinguin.net/?r=69984de7361b0&search=Red%20Dead%20Redemption%202');
            expect(getKinguinLink('GTA V')).toBe('https://www.kinguin.net/?r=69984de7361b0&search=GTA%20V');
        });
    });

    describe('getStoreBtnLabel', () => {
        test('Mağazalara göre uygun buton etiketlerini döndürür', () => {
            expect(getStoreBtnLabel('1')).toBe('Steam\'de Kontrol Et ↗');
            expect(getStoreBtnLabel('25')).toBe('Epic\'de Kontrol Et ↗');
            expect(getStoreBtnLabel('7')).toBe('GOG\'da Kontrol Et ↗');
            expect(getStoreBtnLabel('11')).toBe('Humble\'da Kontrol Et ↗');
            expect(getStoreBtnLabel('99')).toBe('Mağazada Kontrol Et ↗');
        });
    });

    describe('formatPrice', () => {
        test('Sayısal ve ondalıklı fiyatları $ formatına çevirir', () => {
            expect(formatPrice('19.99')).toBe('$19.99');
            expect(formatPrice('5')).toBe('$5.00');
        });

        test('Sıfır veya geçersiz fiyatları "Ücretsiz" olarak döndürür', () => {
            expect(formatPrice('0')).toBe('Ücretsiz');
            expect(formatPrice('0.00')).toBe('Ücretsiz');
            expect(formatPrice('invalid')).toBe('Ücretsiz');
        });
    });
});
