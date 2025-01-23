const database = require("../config/database");

class Game {
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

    async create() {
        let sql = `insert into games(GameName, GameCompany, GamePrice, GameReleaseDate, GamePEGI, GamePlatform, GameDiscount, FeaturedGame, GameStatus, GameDescription) 
                   values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
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

    static getAll() {
        let sql = "select * from games";

        return database.execute(sql);
    }

    static getAllFeatured() {
        let sql = "select * from games where FeaturedGame = true";

        return database.execute(sql);
    }

    static getById(id) {
        let sql = `SELECT * FROM games WHERE GameID = ?`;
        return database.execute(sql, [id]);
    }
    

    async updateById(id) {
        let sql = `update games set GameName = ?, GameCompany = ?, GamePrice = ?, GameReleaseDate = ?, GamePEGI = ?, GamePlatform = ?, GameDiscount = ?, FeaturedGame = ?, 
                   GameStatus = ?, GameDescription = ? where GameID = ?`;
    
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
    

    async deleteById(id) {
        let sql = `delete from games where GameID = ${id}`;

        return database.execute(sql);
    }
}

module.exports = Game;
