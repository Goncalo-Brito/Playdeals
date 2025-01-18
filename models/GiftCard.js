const database = require("../config/database");

class GiftCard {
    static getAll() {
        let sql = "select * from giftcard";

        return database.execute(sql);
    }

    static getById(id) {
        let sql = `select * from giftcard where id = ${id}`;

        return database.execute(sql);
    }
}

module.exports = GiftCard;
