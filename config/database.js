const mysql = require("mysql2");
const options = require('./options.json');

const db = mysql.createConnection(options.database);

module.exports = db.promise();