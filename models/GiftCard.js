/**
 * Represents the GiftCard model and provides methods to interact with the database.
 * @class
 */
class GiftCard {
    /**
     * Returns all gift cards from the database.
     * @static
     * @returns {Promise} - Returns a promise that resolves with all gift cards.
     */
    static getAll() {
        let sql = "SELECT * FROM GiftCards";

        return database.execute(sql);
    }

    /**
     * Returns a specific gift card by its ID.
     * @static
     * @param {number} id - The ID of the gift card to retrieve.
     * @returns {Promise} - Returns a promise that resolves with the found gift card.
     */
    static getById(id) {
        let sql = `SELECT * FROM GiftCards WHERE id = ?`;

        return database.execute(sql, [id]);
    }
}

module.exports = GiftCard;
