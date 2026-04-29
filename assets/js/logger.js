/**
 * Oyun Radar — Merkezi Logger Modülü
 * Tüm loglama işlemleri bu modül üzerinden yapılır.
 * Seviyeler: INFO (bilgi), WARN (uyarı), ERROR (kritik hata)
 */

const Logger = {
    /**
     * Genel bilgi mesajı loglar.
     * @param {string} message - Log mesajı.
     * @param {*} [data] - Opsiyonel ek veri.
     */
    info(message, data) {
        if (data !== undefined) {
            console.info(`[INFO] ${message}`, data);
        } else {
            console.info(`[INFO] ${message}`);
        }
    },

    /**
     * Potansiyel sorunlar için uyarı loglar.
     * @param {string} message - Uyarı mesajı.
     * @param {*} [data] - Opsiyonel ek veri.
     */
    warn(message, data) {
        if (data !== undefined) {
            console.warn(`[WARN] ${message}`, data);
        } else {
            console.warn(`[WARN] ${message}`);
        }
    },

    /**
     * Kritik hatalar için stack trace dahil loglama yapar.
     * @param {string} message - Hata mesajı.
     * @param {Error|*} [error] - Hata objesi veya ek veri.
     */
    error(message, error) {
        if (error !== undefined) {
            console.error(`[ERROR] ${message}`, error);
        } else {
            console.error(`[ERROR] ${message}`);
        }
    }
};

export default Logger;
