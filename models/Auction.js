const database = require("../config/database");

/**
 * Represents the model of an auction and provides methods to interact with the database.
 * @class
 */
class Auction {
    /**
     * Creates a new instance of Auction.
     * @constructor
     * @param {string} AuctionTitle - The title of the auction.
     * @param {number} initialvalue - The initial value of the auction.
     * @param {string} status - The status of the auction (e.g., available, completed).
     * @param {string} startdate - The start date of the auction.
     * @param {string} enddate - The end date of the auction.
     * @param {string} description - The description of the auction.
     */
    constructor(AuctionTitle, initialvalue, status, startdate, enddate, description) {
        this.AuctionTitle = AuctionTitle;
        this.initialvalue = initialvalue;
        this.status = status;
        this.startdate = startdate;
        this.enddate = enddate;
        this.description = description;
    }

    /**
     * Creates a new auction in the database.
     * @async
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    async create() {
        let sql = `insert into auctions(AuctionTittle, AuctionInitialValue, Status, StartDate, EndDate, Description) 
                values (?, ?, ?, ?, ?, ?)`;

        const params = [
            this.AuctionTitle, 
            this.initialvalue, 
            this.status, 
            this.startdate, 
            this.enddate, 
            this.description
        ];

        return await database.execute(sql, params);
    }

    /**
     * Returns all auctions from the database.
     * @static
     * @returns {Promise} - Returns a promise that resolves with all auctions.
     */
    static getAll() {
        let sql = "select * from auctions";

        return database.execute(sql);
    }

    /**
     * Returns a specific auction by its ID.
     * @static
     * @param {number} id - The ID of the auction to retrieve.
     * @returns {Promise} - Returns a promise that resolves with the found auction.
     */
    static getById(id) {
        let sql = `select * from auctions where AuctionID = ${id}`;

        return database.execute(sql);
    }

    /**
     * Updates a specific auction by its ID.
     * @async
     * @param {number} id - The ID of the auction to update.
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    async updateById(id) {
        let sql = `update auctions set AuctionInitialValue = ${this.initialvalue}, Status = ${this.status}, StartDate = ${this.startdate}, EndDate = ${this.enddate}, 
        Description = ${this.description}`;

        return await database.execute(sql);
    }

    /**
     * Updates the status of a specific auction to 'Completed'.
     * @static
     * @param {number} id - The ID of the auction to update.
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    static async updateByIdStatusC(id) {
        let sql = `UPDATE Auctions SET Status = 'Completed' WHERE AuctionID = ?`;

        return database.execute(sql, [id]);
    }

    /**
     * Updates the status of a specific auction to 'Available'.
     * @static
     * @param {number} id - The ID of the auction to update.
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    static async updateByIdStatusA(id) {
        let sql = `UPDATE Auctions SET Status = 'Available' WHERE AuctionID = ?`;

        return database.execute(sql, [id]);
    }

    /**
     * Deletes a specific auction by its ID.
     * @async
     * @param {number} id - The ID of the auction to delete.
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    static async deleteById(id) {
        let sql = `DELETE FROM Auctions WHERE AuctionID = ?`;

        return database.execute(sql, [id]);
    }
}

module.exports = Auction;
