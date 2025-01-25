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

        return await database.execute(sql, params);
    }

    static getAll() {
        let sql = "select * from shoppingcart";

        return database.execute(sql);
    }

    static async deleteCartItems(userID) {
        if (!userID) {
            throw new Error('userID is required');
        }
    
        const sql = `DELETE FROM shoppingcart WHERE UserID = ?`;
    
        console.log("Executing delete for UserID:", userID); 
        return await database.execute(sql, [userID]);
    }
}

module.exports = ShoppingCart;
