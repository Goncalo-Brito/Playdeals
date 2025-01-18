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
        let sql = `insert into game(GameName, GameCompany, GamePrice, GameReleaseDate, GamePEGI, GamePlatform, GameDiscount, FeaturedGame, GameStatus, GameDescription) 
                   values (${this.gamename}, ${this.gamecompany}, ${this.gameprice}, ${this.this.gamereleasedate}, ${this.gamePEGI}, 
                   ${this.gameplatform}, ${this.gamediscount}, ${this.this.featuredgame}, ${this.gamestatus}, ${this.gamedescription})`;

        return await database.execute(sql);
    }

    static getAll() {
        let sql = "select * from game";

        return database.execute(sql);
    }

    static getById(id) {
        let sql = `select * from game where id = ${id}`;

        return database.execute(sql);
    }

    async updateById(id) {
        let sql = `update game set GameName = ${this.gamename}, GameCompany = ${this.gamecompany}, GamePrice = ${this.gameprice}, GameReleaseDate = ${this.gamereleasedate},
        GamePEGI = ${this.gamePEGI}, GamePlatform = ${this.gameplatform}, GameDiscount = ${this.gamediscount}, FeaturedGame = ${this.this.featuredgame}, 
        GameStatus = ${this.gamestatus}, GameDescription = ${this.gamedescription}`;

        return await database.execute(sql);
    }

    async deleteById(id) {
        let sql = `delete from game where id = ${id}`;

        return database.execute(sql);
    }
}

module.exports = Game;
