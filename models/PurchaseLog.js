/**
 * Represents a purchase log entry.
 * @class
 */
class PurchaseLog {
    /**
     * Creates a new instance of PurchaseLog.
     * @constructor
     * @param {string} PurchaseDate - The date of the purchase.
     * @param {number} PurchasePrice - The price of the purchase.
     * @param {string} ItemKey - The key of the purchased item.
     * @param {number} UserID - The ID of the user who made the purchase.
     * @param {number} GameID - The ID of the purchased game.
     * @param {number} DLCID - The ID of the purchased DLC.
     * @param {number} GiftCardID - The ID of the GiftCard used in the purchase.
     */
    constructor(PurchaseDate, PurchasePrice, ItemKey, UserID, GameID, DLCID, GiftCardID) {
        this.PurchaseDate = PurchaseDate;
        this.PurchasePrice = PurchasePrice;
        this.ItemKey = ItemKey;
        this.UserID = UserID;
        this.GameID = GameID;
        this.DLCID = DLCID;
        this.GiftCardID = GiftCardID;
    }

    /**
     * Creates a new purchase log entry.
     * @async
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    async create() {
        const sql = `INSERT INTO purchaselog (PurchaseDate, PurchasePrice, ItemKey, UserID, GameID, DLCID, GiftCardID) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const params = [this.PurchaseDate, this.PurchasePrice, this.ItemKey, this.UserID, this.GameID, this.DLCID, this.GiftCardID];

        return await database.execute(sql, params);
    }

    /**
     * Returns all purchase log entries.
     * @static
     * @returns {Promise} - Returns a promise that resolves with all purchase log entries.
     */
    static getAll() {
        let sql = "SELECT * FROM purchaselog";
        return database.execute(sql);
    }

    /**
     * Updates a specific purchase log entry by its ID.
     * @async
     * @param {number} id - The ID of the purchase log entry to be updated.
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    async updateById(id) {
        let sql = `UPDATE purchaselog SET PurchaseDate = ?, PurchasePrice = ?, ItemKey = ?, UserID = ?, GameID = ?, DLCID = ?, 
                   GiftCardID = ? WHERE id = ?`;

        const params = [this.PurchaseDate, this.PurchasePrice, this.ItemKey, this.UserID, this.GameID, this.DLCID, this.GiftCardID, id];

        return await database.execute(sql, params);
    }

    /**
     * Deletes a specific purchase log entry by its ID.
     * @async
     * @param {number} id - The ID of the purchase log entry to be deleted.
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    async deleteById(id) {
        let sql = `DELETE FROM purchaselog WHERE id = ?`;

        return database.execute(sql, [id]);
    }
}

module.exports = PurchaseLog;
