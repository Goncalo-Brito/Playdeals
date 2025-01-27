/**
 * Represents a shopping cart.
 * @class
 */
class ShoppingCart {
    /**
     * Creates a new instance of ShoppingCart.
     * @constructor
     * @param {number} UserID - The ID of the user.
     * @param {number} GameID - The ID of the game.
     * @param {number} DLCID - The ID of the DLC.
     * @param {number} GiftCardID - The ID of the GiftCard.
     * @param {string} DateAdded - The date when the item was added to the cart.
     */
    constructor(UserID, GameID, DLCID, GiftCardID, DateAdded) {
        this.UserID = UserID;
        this.GameID = GameID;
        this.DLCID = DLCID;
        this.GiftCardID = GiftCardID;
        this.DateAdded = DateAdded;
    }

    /**
     * Creates a new item in the shopping cart.
     * @async
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    async create() {
        const sql = `INSERT INTO shoppingcart (UserID, GameID, DLCID, GiftCardID, DateAdded) 
                     VALUES (?, ?, ?, ?, ?)`;

        const params = [this.UserID, this.GameID, this.DLCID, this.GiftCardID, this.DateAdded];

        return await database.execute(sql, params);
    }

    /**
     * Returns all items from the shopping cart.
     * @static
     * @returns {Promise} - Returns a promise that resolves with all the items in the cart.
     */
    static getAll() {
        let sql = "SELECT * FROM shoppingcart";

        return database.execute(sql);
    }

    /**
     * Deletes all items from the cart for a specific user.
     * @async
     * @static
     * @param {number} userID - The ID of the user whose cart items will be deleted.
     * @throws {Error} - If the userID is not provided.
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    static async deleteCartItems(userID) {
        if (!userID) {
            throw new Error('userID is required');
        }
    
        const sql = `DELETE FROM shoppingcart WHERE UserID = ?`;

        console.log("Executing delete for UserID:", userID); 
        return await database.execute(sql, [userID]);
    }

    /**
     * Deletes a specific item from the cart using the cart ID.
     * @async
     * @static
     * @param {number} id - The ID of the cart item to be deleted.
     * @throws {Error} - If the id is not provided.
     * @returns {Promise} - Returns a promise that resolves with the result of the SQL execution.
     */
    static async deleteById(id) {
        if (!id) {
            throw new Error('id is required');
        }
    
        const sql = `DELETE FROM shoppingcart WHERE CartID = ?`;

        console.log("Executing delete for CartID:", id); 
        return await database.execute(sql, [id]);
    }
}

module.exports = ShoppingCart;
