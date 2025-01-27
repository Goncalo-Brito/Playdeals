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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
    
<<<<<<< HEAD
>>>>>>> parent of 7ee4fdf (Merge pull request #23 from Goncalo-Brito/Goncalo-dev)
=======
    
>>>>>>> parent of 4708c13 (java doc)
        console.log("Executing delete for UserID:", userID); 
=======
    
>>>>>>> parent of f5dbaa9 (Merge branch 'main' into Andre)
=======
    
>>>>>>> parent of f5dbaa9 (Merge branch 'main' into Andre)
=======
        console.log("Executing delete for UserID:", userID); 
>>>>>>> parent of 09cb55d (Javadoc)
        return await database.execute(sql, [userID]);
    }

    static async deleteById(id) {
        if (!id) {
            throw new Error('userID is required');
        }
    
        const sql = `DELETE FROM shoppingcart WHERE CartID = ?`;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

        console.log("Executing delete for CartID:", id); 
        return await database.execute(sql, [id]);
=======
    
        console.log("Executing delete for CartID:", userID); 
        return await database.execute(sql, [userID]);
<<<<<<< HEAD
>>>>>>> parent of f5dbaa9 (Merge branch 'main' into Andre)
=======
>>>>>>> parent of f5dbaa9 (Merge branch 'main' into Andre)
=======
    
        console.log("Executing delete for CartID:", userID); 
        return await database.execute(sql, [userID]);
>>>>>>> parent of 7ee4fdf (Merge pull request #23 from Goncalo-Brito/Goncalo-dev)
=======
    
        console.log("Executing delete for CartID:", userID); 
        return await database.execute(sql, [userID]);
>>>>>>> parent of 4708c13 (java doc)
    }
}

module.exports = ShoppingCart;
