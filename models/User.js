const database = require("../config/database");
const bcrypt = require("bcrypt");

class User {
    constructor(username, fname, lname, email, pass, creationdate, usertype) {
        this.username = username;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.pass = pass;
        this.creationdate = creationdate;
        this.usertype = usertype;
    }

    async create() {
        const hashedPassword = await bcrypt.hash(this.pass, 10);
        let sql = `insert into users(UserName, FName, LName, Email, Pass, CreationDate, UserType) 
                   values (${this.username}, ${this.fname}, ${this.lname}, ${this.email}, ${this.hashedPassword}, ${this.creationdate}, ${this.usertype})`;

        return await database.execute(sql);
    }

    static getAll() {
        let sql = "select * from users";

        return database.execute(sql);
    }

    static getById(id) {
        let sql = `select * from users where UserID = ${id}`;

        return database.execute(sql);
    }

    static getLogin(username, password) {
        let sql = `select * from users where UserName = '${username}' and Pass = '${password}'`;
    
        return database.execute(sql);
    }

    
    async updateById(id) {
        let sql = `update users set UserName = ${this.username}, FName = ${this.fname}, LName = ${this.lname}, Email = ${this.email}, 
        Pass = ${this.pass}, CreationDate = ${this.creationdate}, UserType = ${this.usertype} where UserID = ${this.id}`;

        return await database.execute(sql);
    }

    async deleteById(id) {
        let sql = `delete from users where UserID = ${id}`;

        return database.execute(sql);
    }
}

module.exports = User;
