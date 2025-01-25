const database = require("../config/database");

class Auction {
    constructor(AuctionTitle, initialvalue, status, startdate, enddate, description) {
        this.AuctionTitle = AuctionTitle;
        this.initialvalue = initialvalue;
        this.status = status;
        this.startdate = startdate;
        this.enddate = enddate;
        this.description = description;
    }

    async create() {

        let sql = `insert into auctions(AuctionTittle, AuctionInitialValue, Status, StartDate, EndDate, Description) 
                values (?, ?, ?, ?, ?, ?)`;
        
                const params = [
                            this.AuctionTitle, 
                            this.initialvalue, 
                            this.status, 
                            this.startdate, 
                            this.enddate, 
                            this.description
                        ];
        
        return await database.execute(sql, params);
    }



    static getAll() {
        let sql = "select * from auctions";

        return database.execute(sql);
    }

    static getById(id) {
        let sql = `select * from auctions where AuctionID = ${id}`;

        return database.execute(sql);
    }

    async updateById(id) {
        let sql = `update auctions set AuctionInitialValue = ${this.initialvalue}, Status = ${this.status}, StartDate = ${this.startdate}, EndDate = ${this.enddate}, 
        Description = ${this.description}`;

        return await database.execute(sql);
    }

    static async updateByIdStatus(id) {
        let sql = `UPDATE Auctions SET Status = 'Completed' WHERE AuctionID = ?`;

        return database.execute(sql, [id]);
    }

    static async deleteById(id) {
        let sql = `DELETE FROM Auctions WHERE AuctionID = ?`;
            
        return database.execute(sql, [id]);
    }
    
}

module.exports = Auction;
