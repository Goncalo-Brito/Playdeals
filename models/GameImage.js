/**
 * Represents an image associated with a game and provides methods to interact with the database.
 * @class
 */
class GameImage {
    /**
     * Creates a new instance of GameImage.
     * @constructor
     * @param {string} imageextention - The file extension of the image (e.g., ".jpg").
     * @param {string} imagesource - The source of the image (e.g., URL or local path).
     * @param {string} imagename - The name of the image.
     * @param {number} gameID - The ID of the game associated with the image.
     */
    constructor(imageextention, imagesource, imagename, gameID) {
        this.imageextention = imageextention;
        this.imagesource = imagesource;
        this.imagename = imagename;
        this.gameID = gameID;
    }

    /**
     * Creates a new game image in the database.
     * @async
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    async create() {
        let sql = `INSERT INTO gameimage (ImageExtention, ImageSource, ImageName, GameID) 
                   VALUES ('${this.imageextention}', '${this.imagesource}', '${this.imagename}', ${this.gameID})`;

        return await database.execute(sql);
    }

    /**
     * Returns all game images from the database.
     * @static
     * @returns {Promise} - Returns a promise that resolves with all game images.
     */
    static getAll() {
        let sql = "SELECT * FROM gameimage";

        return database.execute(sql);
    }

    /**
     * Returns a specific game image by its ID.
     * @static
     * @param {number} id - The ID of the game image to retrieve.
     * @returns {Promise} - Returns a promise that resolves with the found game image.
     */
    static getById(id) {
        let sql = `SELECT * FROM gameimage WHERE id = ${id}`;

        return database.execute(sql);
    }

    /**
     * Returns all game images associated with a specific game.
     * @static
     * @param {number} id - The ID of the game for which images will be retrieved.
     * @returns {Promise} - Returns a promise that resolves with the game images associated with the specified game.
     */
    static getByGame(id) {
        let sql = `SELECT * FROM gameimage WHERE GameID = ${id}`;

        return database.execute(sql);
    }

    /**
     * Updates a specific game image by its ID.
     * @async
     * @param {number} id - The ID of the game image to be updated.
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    async updateById(id) {
        let sql = `UPDATE gameimage SET ImageExtention = '${this.imageextention}', ImageSource = '${this.imagesource}', 
                   ImageName = '${this.imagename}', GameID = ${this.gameID} WHERE id = ${id}`;

        return await database.execute(sql);
    }

    /**
     * Deletes a specific game image by its ID.
     * @async
     * @param {number} id - The ID of the game image to be deleted.
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    async deleteById(id) {
        let sql = `DELETE FROM gameimage WHERE id = ${id}`;

        return database.execute(sql);
    }
}

module.exports = GameImage;
