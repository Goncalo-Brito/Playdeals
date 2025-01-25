const database = require("../config/database");

class PurchaseLog {
    constructor(PurchaseDate, PurchasePrice, ItemKey, UserID, GameID, DLCID, GiftCardID) {
        this.PurchaseDate = PurchaseDate;
        this.PurchasePrice = PurchasePrice;
        this.ItemKey = ItemKey;
        this.UserID = UserID;
        this.GameID = GameID;
        this.DLCID = DLCID;
        this.GiftCardID = GiftCardID;
    }
    
    async create() {

        const sql = `INSERT INTO purchaselog (PurchaseDate, PurchasePrice, ItemKey, UserID, GameID, DLCID, GiftCardID) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
        const params = [this.PurchaseDate, this.PurchasePrice, this.ItemKey, this.UserID, this.GameID, this.DLCID, this.GiftCardID];
    
        console.log(params);

        return await database.execute(sql, params);
    }

    static getAll() {
        let sql = "SELECT * FROM purchaselog";
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
