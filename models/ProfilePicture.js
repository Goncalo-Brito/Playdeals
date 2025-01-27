const database = require("../config/database");

class ProfilePicture {
    constructor(pfpextention, pfpsource, pfpname, gameID) {
        this.pfpextention = pfpextention;
        this.pfpsource = pfpsource;
        this.pfpname = pfpname;
        this.gameID = gameID
    }

    async create() {
        let sql = `insert into profilepicture(PFPExtention, PFPSource, PFPName, GameID) 
                   values (${this.pfpextention}, ${this.pfpsource}, ${this.pfpname}, ${this.gameID})`;

        return await database.execute(sql);
    }

    static getAll() {
        let sql = "select * from profilepicture";

        return database.execute(sql);
    }

    static getById(id) {
        let sql = `select * from profilepicture where id = ${id}`;

        return database.execute(sql);
    }

    async updateById(id) {
        let sql = `update profilepicture set PFPExtention = ${this.pfpextention}, PFPSource = ${this.pfpsource}, PFPName = ${this.pfpname}, GameID = ${this.gameID}`;

        return await database.execute(sql);
    }

    async deleteById(id) {
        let sql = `delete from profilepicture where id = ${id}`;

        return database.execute(sql);
    }
}

module.exports = ProfilePicture;
