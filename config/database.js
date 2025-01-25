/**
 * Database Connection Module
 *
 * This module establishes a connection to the MySQL database using the `mysql2` package.
 * The database connection options are loaded from an external JSON configuration file.
 */

const mysql = require("mysql2");
const options = require('./options.json');

// Create a connection to the MySQL database using configuration options
const db = mysql.createConnection(options.database);

// Export the connection as a promise to allow asynchronous database operations
module.exports = db.promise();
