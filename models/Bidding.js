const database = require("../config/database");

class Bidding {
    constructor(biddingvalue, userID, auctionID) {
        this.biddingvalue = biddingvalue;
        this.userID = userID;
        this.auctionID = auctionID;
    }

    async create() {
        let sql = `insert into biddings(BiddingValue, UserID, AuctionID) 
                   values (${this.biddingvalue}, ${this.userID}, ${this.auctionID})`;

        return await database.execute(sql);
    }

    static getById(id) {
        let sql = `select * from biddings where id = ${id}`;

        return database.execute(sql);
    }

    async deleteById(id) {
        let sql = `delete from biddings where id = ${id}`;

        return database.execute(sql);
    }
}

module.exports = Bidding;
