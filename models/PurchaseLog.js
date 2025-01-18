const database = require("../config/database");

class PurchaseLog {
    constructor(purchasedate, purchaseprice, itemkey, userID, gameID, dlcID, giftcardID) {
        this.purchasedate = purchasedate;
        this.purchaseprice = purchaseprice;
        this.itemkey = itemkey;
        this.userID = userID;
        this.gameID = gameID;
        this.dlcID = dlcID;
        this.giftcardID = giftcardID;
    }

    async create() {
        let sql = `insert into purchaselog(PurchaseDate, PurchasePrice, ItemKey, UserID, GameID, DLCID, GiftCardID) 
                   values (${this.purchasedate}, ${this.purchaseprice}, ${this.itemkey}, ${this.userID}, ${this.gameID}, ${this.dlcID}, ${this.giftcardID})`;

        return await database.execute(sql);
    }

    static getAll() {
        let sql = "select * from purchaselog";

        return database.execute(sql);
    }

    async updateById(id) {
        let sql = `update purchaselog set PurchaseDate = ${this.purchasedate}, PurchasePrice = ${this.purchaseprice}, ItemKey = ${this.itemkey}, 
        UserID = ${this.userID}, GameID = ${this.gameID}, DLCID = ${this.dlcID}, GiftCardID = ${this.giftcardID}`;

        return await database.execute(sql);
    }

    async deleteById(id) {
        let sql = `delete from purchaselog where id = ${id}`;

        return database.execute(sql);
    }
}

module.exports = PurchaseLog;
