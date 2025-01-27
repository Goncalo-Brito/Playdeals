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
<<<<<<< HEAD

=======
    
        console.log("Executing delete for UserID:", userID); 
>>>>>>> parent of 7ee4fdf (Merge pull request #23 from Goncalo-Brito/Goncalo-dev)
        return await database.execute(sql, [userID]);
    }

    static async deleteById(id) {
        if (!id) {
            throw new Error('userID is required');
        }
    
        const sql = `DELETE FROM shoppingcart WHERE CartID = ?`;
    
<<<<<<< HEAD
        return await database.execute(sql, [userID]);

=======
        console.log("Executing delete for CartID:", userID); 
        return await database.execute(sql, [userID]);
>>>>>>> parent of 7ee4fdf (Merge pull request #23 from Goncalo-Brito/Goncalo-dev)
    }
}

module.exports = ShoppingCart;
