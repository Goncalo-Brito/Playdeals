const database = require("../config/database");

class Auction {
    constructor(initialvalue, status, startdate, enddate, description) {
        this.initialvalue = initialvalue;
        this.status = status;
        this.startdate = startdate;
        this.enddate = enddate;
        this.description = description;
    }

    async create() {
        let sql = `insert into auctions(AuctionInitialValue, Status, StartDate, EndDate, Description) 
                   values (${this.initialvalue}, ${this.status}, ${this.startdate}, ${this.enddate}, ${this.description})`;

        return await database.execute(sql);
    }

    static getAll() {
        let sql = "select * from auctions";

        return database.execute(sql);
    }

    static getById(id) {
        let sql = `select * from auctions where id = ${id}`;

        return database.execute(sql);
    }

    async updateById(id) {
        let sql = `update auctions set AuctionInitialValue = ${this.initialvalue}, Status = ${this.status}, StartDate = ${this.startdate}, EndDate = ${this.enddate}, 
        Description = ${this.description}`;

        return await database.execute(sql);
    }

    async deleteById(id) {
        let sql = `delete from auctions where id = ${id}`;

        return database.execute(sql);
    }
}

module.exports = Auction;
