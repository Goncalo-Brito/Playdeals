const database = require("../config/database");

class ShoppingCart {
    constructor(UserID, GameID, DLCID, GiftCardID, DateAdded) {
        this.UserID = UserID;
        this.GameID = GameID;
        this.DLCID = DLCID;
        this.GiftCardID = GiftCardID;
        this.DateAdded = DateAdded;
    }

    async create() {
        const sql = `INSERT INTO shoppingcart (UserID, GameID, DLCID, GiftCardID, DateAdded) 
                     VALUES (?, ?, ?, ?, ?)`;

        const params = [this.UserID, this.GameID, this.DLCID, this.GiftCardID, this.DateAdded];

        console.log(params);

        return await database.execute(sql, params);
    }

    static getAll() {
        let sql = "select * from shoppingcart";

        return database.execute(sql);
    }

    async deleteById(id) {
        let sql = `delete from shoppingcart where CartID = ${id}`;

        return database.execute(sql);
    }
}

module.exports = ShoppingCart;
