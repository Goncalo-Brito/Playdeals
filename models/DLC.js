const database = require("../config/database");

class DLC {
    constructor(DLCName, DLCPrice, DLCReleaseDate, DLCStatus, DLCDiscount, DLCDescription, GameID) {
        this.DLCName = DLCName;
        this.DLCPrice = DLCPrice;
        this.DLCReleaseDate = DLCReleaseDate;
        this.DLCStatus = DLCStatus;
        this.DLCDiscount = DLCDiscount;
        this.DLCDescription = DLCDescription;
        this.GameID = GameID;
    }

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

    static getAll() {
        let sql = "select * from dlcs";

        return database.execute(sql);
    }

    static getById(id) {
        let sql = `select * from dlcs where DLCID = ${id}`;

        return database.execute(sql);
    }

    async updateById(id) {
        let sql = `update dlcs set DLCName = ${this.DLCname}, DLCPrice = ${this.DLCprice}, DLCReleaseDate = ${this.DLCreleasedate}, 
        DLCStatus = ${this.DLCstatus}, DLCDiscount = ${this.DLCdiscount}, DLCDescription = ${this.DLCdescription}, GameID = ${this.gameID}`;

        return await database.execute(sql);
    }

    static async deleteById(id) {
        let sql = `DELETE FROM games WHERE DLCID = ?`;
            
        return database.execute(sql, [id]);
    }
}

module.exports = DLC;
