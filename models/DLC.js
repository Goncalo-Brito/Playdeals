const database = require("../config/database");

class DLC {
    constructor(DLCname, DLCprice, DLCreleasedate, DLCstatus, DLCdiscount, DLCdescription, gameID) {
        this.DLCname = DLCname;
        this.DLCprice = DLCprice;
        this.DLCreleasedate = DLCreleasedate;
        this.DLCstatus = DLCstatus;
        this.DLCdiscount = DLCdiscount;
        this.DLCdescription = DLCdescription;
        this.gameID = gameID;
    }

    async create() {
        let sql = `insert into dlcs(DLCName, DLCPrice, DLCReleaseDate, DLCStatus, DLCDiscount, DLCDescription, GameID) 
                   values (${this.DLCname}, ${this.DLCprice}, ${this.DLCreleasedate}, ${this.DLCstatus}, ${this.DLCdiscount}, ${this.DLCdescription}, ${this.gameID})`;

        return await database.execute(sql);
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

    async deleteById(id) {
        let sql = `delete from dlcs where id = ${id}`;

        return database.execute(sql);
    }
}

module.exports = DLC;
