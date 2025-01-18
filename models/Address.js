const database = require("../config/database");

class Address {
    constructor(country, street, postalCode) {
        this.country = country;
        this.street = street;
        this.postalCode = postalCode;
    }

    async create() {
        let sql = `insert into users(country, street, postalCode) 
            values (${this.country}, ${this.street}, ${this.postalCode})`;
        
        return await database.execute(sql);
    }

    static getAll() {
        let sql = "select * from address";
    
        return database.execute(sql);
    }

    static getById(id) {
        let sql = `select * from address where id = ${id}`;

        return database.execute(sql);
    }

    async updateById(id) {
        let sql = `update address set country = ${this.country}, street = ${this.street}, postalCode = ${this.postalCode}`;
    
        return await database.execute(sql);
    }

    async deleteById(id) {
            let sql = `delete from address where id = ${id}`;
    
            return database.execute(sql);
    }
}