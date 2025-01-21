const database = require("../config/database");

class GameImage {
    constructor(imageextention, imagesource, imagename, gameID) {
        this.imageextention = imageextention;
        this.imagesource = imagesource;
        this.imagename = imagename;
        this.gameID = gameID
    }

    async create() {
        let sql = `insert into gameimage(ImageExtention, ImageSource, ImageName, GameID) 
                   values (${this.imageextention}, ${this.imagesource}, ${this.imagename}, ${this.gameID})`;

        return await database.execute(sql);
    }

    static getAll() {
        let sql = "select * from gameimage";

        return database.execute(sql);
    }

    static getById(id) {
        let sql = `select * from gameimage where id = ${id}`;

        return database.execute(sql);
    }

    static getByGame(id) {
        let sql = `select * from gameimage where GameID = ${id}`;

        return database.execute(sql);
    }

    async updateById(id) {
        let sql = `update gameimage set ImageExtention = ${this.imageextention}, ImageSource = ${this.imagesource}, ImageName = ${this.imagename}, GameID = ${this.gameID}`;

        return await database.execute(sql);
    }

    async deleteById(id) {
        let sql = `delete from gameimage where id = ${id}`;

        return database.execute(sql);
    }
}

module.exports = GameImage;
