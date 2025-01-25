/**
 * Represents a user's profile picture for a game.
 * @class
 */
class ProfilePicture {
    /**
     * Creates a new instance of ProfilePicture.
     * @constructor
     * @param {string} pfpextention - The file extension of the profile picture (e.g., ".jpg").
     * @param {string} pfpsource - The source of the profile picture (e.g., URL or local path).
     * @param {string} pfpname - The name of the profile picture.
     * @param {number} gameID - The ID of the game associated with the profile picture.
     */
    constructor(pfpextention, pfpsource, pfpname, gameID) {
        this.pfpextention = pfpextention;
        this.pfpsource = pfpsource;
        this.pfpname = pfpname;
        this.gameID = gameID;
    }

    /**
     * Creates a new profile picture in the database.
     * @async
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    async create() {
        let sql = `INSERT INTO profilepicture(PFPExtention, PFPSource, PFPName, GameID) 
                   VALUES (?, ?, ?, ?)`;

        const params = [this.pfpextention, this.pfpsource, this.pfpname, this.gameID];

        return await database.execute(sql, params);
    }

    /**
     * Returns all profile pictures.
     * @static
     * @returns {Promise} - Returns a promise that resolves with all profile pictures.
     */
    static getAll() {
        let sql = "SELECT * FROM profilepicture";

        return database.execute(sql);
    }

    /**
     * Returns a specific profile picture by its ID.
     * @static
     * @param {number} id - The ID of the profile picture to retrieve.
     * @returns {Promise} - Returns a promise that resolves with the found profile picture.
     */
    static getById(id) {
        let sql = `SELECT * FROM profilepicture WHERE id = ?`;

        return database.execute(sql, [id]);
    }

    /**
     * Updates a specific profile picture by its ID.
     * @async
     * @param {number} id - The ID of the profile picture to update.
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    async updateById(id) {
        let sql = `UPDATE profilepicture SET PFPExtention = ?, PFPSource = ?, 
                   PFPName = ?, GameID = ? WHERE id = ?`;

        const params = [this.pfpextention, this.pfpsource, this.pfpname, this.gameID, id];

        return await database.execute(sql, params);
    }

    /**
     * Deletes a specific profile picture by its ID.
     * @async
     * @param {number} id - The ID of the profile picture to delete.
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    async deleteById(id) {
        let sql = `DELETE FROM profilepicture WHERE id = ?`;

        return database.execute(sql, [id]);
    }
}

module.exports = ProfilePicture;
