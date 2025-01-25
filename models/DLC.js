/**
 * Represents a downloadable content (DLC) for a game.
 * @class
 */
class DLC {
    /**
     * Creates an instance of the DLC class.
     * @constructor
     * @param {string} DLCName - The name of the DLC.
     * @param {number} DLCPrice - The price of the DLC.
     * @param {string} DLCReleaseDate - The release date of the DLC.
     * @param {string} DLCStatus - The status of the DLC (e.g., "active", "inactive").
     * @param {number} DLCDiscount - The discount applied to the DLC, if any.
     * @param {string} DLCDescription - A description of the DLC.
     * @param {number} GameID - The ID of the game the DLC is associated with.
     */
    constructor(DLCName, DLCPrice, DLCReleaseDate, DLCStatus, DLCDiscount, DLCDescription, GameID) {
        this.DLCName = DLCName;
        this.DLCPrice = DLCPrice;
        this.DLCReleaseDate = DLCReleaseDate;
        this.DLCStatus = DLCStatus;
        this.DLCDiscount = DLCDiscount;
        this.DLCDescription = DLCDescription;
        this.GameID = GameID;
    }

    /**
     * Creates a new DLC record in the database.
     * @returns {Promise} - A promise that resolves when the database operation is complete.
     */
    async create() {
        let sql = `insert into dlcs(DLCName, DLCPrice, DLCReleaseDate, DLCStatus, DLCDiscount, DLCDescription, GameID) 
        values (?, ?, ?, ?, ?, ?, ?)`;

        const params = [
                    this.DLCName, 
                    this.DLCPrice, 
                    this.DLCReleaseDate, 
                    this.DLCStatus, 
                    this.DLCDiscount, 
                    this.DLCDescription, 
                    this.GameID
                ];

        return await database.execute(sql, params);
    }

    /**
     * Retrieves all DLCs from the database.
     * @static
     * @returns {Promise} - A promise that resolves to the list of all DLCs.
     */
    static getAll() {
        let sql = "select * from dlcs";
        return database.execute(sql);
    }

    /**
     * Retrieves a specific DLC by its ID.
     * @static
     * @param {number} id - The ID of the DLC to retrieve.
     * @returns {Promise} - A promise that resolves to the DLC with the given ID.
     */
    static getById(id) {
        let sql = `select * from dlcs where DLCID = ${id}`;
        return database.execute(sql);
    }

    /**
     * Updates a DLC record by its ID.
     * @param {number} id - The ID of the DLC to update.
     * @returns {Promise} - A promise that resolves when the update operation is complete.
     */
    async updateById(id) {
        let sql = `update dlcs set DLCName = ${this.DLCname}, DLCPrice = ${this.DLCprice}, DLCReleaseDate = ${this.DLCreleasedate}, 
        DLCStatus = ${this.DLCstatus}, DLCDiscount = ${this.DLCdiscount}, DLCDescription = ${this.DLCdescription}, GameID = ${this.gameID}`;

        return await database.execute(sql);
    }

    /**
     * Deletes a DLC record by its ID.
     * @static
     * @param {number} id - The ID of the DLC to delete.
     * @returns {Promise} - A promise that resolves when the delete operation is complete.
     */
    static async deleteById(id) {
        let sql = `DELETE FROM games WHERE DLCID = ?`;
        return database.execute(sql, [id]);
    }
}

module.exports = DLC;
