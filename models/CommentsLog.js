const database = require("../config/database");

class CommentsLog {
    constructor(commenttext, userID, biddingID) {
        this.commenttext = commenttext;
        this.userID = userID;
        this.biddingID = biddingID;
    }

    async create() {
        let sql = `insert into commentslog(CommentText, UserID, BiddingID) 
                   values (${this.commenttext}, ${this.userID}, ${this.biddingID})`;

        return await database.execute(sql);
    }

    static getById(id) {
        let sql = `select * from commentslog where id = ${id}`;

        return database.execute(sql);
    }

    async updateById(id) {
        let sql = `update commentslog set CommentText = ${this.cardnumber}, UserID = ${this.userID}, BiddingID = ${this.cardCVC}`;

        return await database.execute(sql);
    }

    async deleteById(id) {
        let sql = `delete from commentslog where id = ${id}`;

        return database.execute(sql);
    }
}

module.exports = CommentsLog;
