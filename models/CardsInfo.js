const database = require("../config/database");

class CardsInfo {
    constructor(cardnumber, cardCVC, cardVal, userID) {
        this.cardnumber = cardnumber;
        this.cardCVC = cardCVC;
        this.cardVal = cardVal;
        this.userID = userID;
    }

    async create() {
        let sql = `insert into cardsinfo(CardNumber, CardCVC, CardVal, UserID) 
                   values (${this.cardnumber}, ${this.cardCVC}, ${this.cardVal}, ${this.userID})`;

        return await database.execute(sql);
    }

    static getById(id) {
        let sql = `select * from cardsinfo where id = ${id}`;

        return database.execute(sql);
    }

    async updateById(id) {
        let sql = `update cardsinfo set CardNumber = ${this.cardnumber}, CardCVC = ${this.cardCVC}, CardVal = ${this.cardVal}, UserID = ${this.userID}`;

        return await database.execute(sql);
    }

    async deleteById(id) {
        let sql = `delete from cardsinfo where id = ${id}`;

        return database.execute(sql);
    }
}

module.exports = CardsInfo;
