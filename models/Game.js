/**
 * Represents a game model and provides methods to interact with the database.
 * @class
 */
class Game {
    /**
     * Creates a new instance of Game.
     * @constructor
     * @param {string} gamename - The name of the game.
     * @param {string} gamecompany - The developer company of the game.
     * @param {number} gameprice - The price of the game.
     * @param {string} gamereleasedate - The release date of the game.
     * @param {string} gamePEGI - The age rating (PEGI) of the game.
     * @param {string} gameplatform - The platform for which the game was developed (e.g., PC, PS4, etc.).
     * @param {number} gamediscount - The discount applicable to the game, if any.
     * @param {boolean} featuredgame - Indicates whether the game is featured on the platform.
     * @param {string} gamestatus - The current status of the game (e.g., available, pre-order, etc.).
     * @param {string} gamedescription - The description of the game.
     */
    constructor(gamename, gamecompany, gameprice, gamereleasedate, gamePEGI, gameplatform, gamediscount, featuredgame, gamestatus, gamedescription) {
        this.gamename = gamename;
        this.gamecompany = gamecompany;
        this.gameprice = gameprice;
        this.gamereleasedate = gamereleasedate;
        this.gamePEGI = gamePEGI;
        this.gameplatform = gameplatform;
        this.gamediscount = gamediscount;
        this.featuredgame = featuredgame;
        this.gamestatus = gamestatus;
        this.gamedescription = gamedescription;
    }

    /**
     * Creates a new game in the database.
     * @async
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    async create() {
        let sql = `INSERT INTO games (GameName, GameCompany, GamePrice, GameReleaseDate, GamePEGI, GamePlatform, GameDiscount, FeaturedGame, GameStatus, GameDescription) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
        const params = [
            this.gamename, 
            this.gamecompany, 
            this.gameprice, 
            this.gamereleasedate, 
            this.gamePEGI, 
            this.gameplatform, 
            this.gamediscount, 
            this.featuredgame, 
            this.gamestatus, 
            this.gamedescription
        ];
    
        return await database.execute(sql, params);
    }

    /**
     * Returns all games from the database.
     * @static
     * @returns {Promise} - Returns a promise that resolves with all games.
     */
    static getAll() {
        let sql = "SELECT * FROM games";

        return database.execute(sql);
    }

    /**
     * Returns all featured games.
     * @static
     * @returns {Promise} - Returns a promise that resolves with all featured games.
     */
    static getAllFeatured() {
        let sql = "SELECT * FROM games WHERE FeaturedGame = true";

        return database.execute(sql);
    }

    /**
     * Returns a specific game by its ID.
     * @static
     * @param {number} id - The ID of the game to retrieve.
     * @returns {Promise} - Returns a promise that resolves with the found game.
     */
    static getById(id) {
        let sql = `SELECT * FROM games WHERE GameID = ?`;
        return database.execute(sql, [id]);
    }

    /**
     * Updates a specific game by its ID.
     * @async
     * @param {number} id - The ID of the game to update.
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    async updateById(id) {
        let sql = `UPDATE games SET GameName = ?, GameCompany = ?, GamePrice = ?, GameReleaseDate = ?, GamePEGI = ?, GamePlatform = ?, GameDiscount = ?, FeaturedGame = ?, 
                   GameStatus = ?, GameDescription = ? WHERE GameID = ?`;
    
        const params = [
            this.gamename, 
            this.gamecompany, 
            this.gameprice, 
            this.gamereleasedate, 
            this.gamePEGI, 
            this.gameplatform, 
            this.gamediscount, 
            this.featuredgame, 
            this.gamestatus, 
            this.gamedescription, 
            id
        ];
    
        return await database.execute(sql, params);
    }

    /**
     * Deletes a specific game by its ID.
     * @async
     * @param {number} id - The ID of the game to delete.
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    static async deleteById(id) {
        let sql = `DELETE FROM games WHERE GameID = ?`;
    
        return database.execute(sql, [id]);
    }
}

module.exports = Game;
