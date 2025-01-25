/**
 * Represents the model of a bid in an auction and provides methods to interact with the database.
 * @class
 */
class Bidding {
    /**
     * Creates a new instance of Bidding.
     * @constructor
     * @param {number} biddingvalue - The value of the bid.
     * @param {number} userID - The ID of the user who placed the bid.
     * @param {number} auctionID - The ID of the auction where the bid was placed.
     */
    constructor(biddingvalue, userID, auctionID) {
        this.biddingvalue = biddingvalue;
        this.userID = userID;
        this.auctionID = auctionID;
    }

    /**
     * Creates a new bid in the database.
     * @async
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    async create() {
        const sql = `INSERT INTO biddings(BiddingValue, UserID, AuctionID)
                        VALUES (?, ?, ?)`;

        const params = [this.biddingvalue, this.userID, this.auctionID];

        return await database.execute(sql, params);
    }

    /**
     * Returns all bids from the database.
     * @static
     * @returns {Promise} - Returns a promise that resolves with all bids.
     */
    static getAll() {
        let sql = "SELECT * FROM biddings";

        return database.execute(sql);
    }

    /**
     * Returns a specific bid by its ID.
     * @static
     * @param {number} id - The ID of the bid to retrieve.
     * @returns {Promise} - Returns a promise that resolves with the found bid.
     */
    static getById(id) {
        let sql = `SELECT * FROM biddings WHERE id = ?`;

        return database.execute(sql, [id]);
    }

    /**
     * Deletes a specific bid by its ID.
     * @async
     * @param {number} id - The ID of the bid to delete.
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    async deleteById(id) {
        let sql = `DELETE FROM biddings WHERE id = ?`;

        return database.execute(sql, [id]);
    }
}

module.exports = Bidding;
