/**
 * This class represents a User and provides methods for interacting with the user data in the database.
 */
class User {
    /**
     * Creates an instance of the User class.
     *
     * @param {string} username - The username of the user.
     * @param {string} fname - The first name of the user.
     * @param {string} lname - The last name of the user.
     * @param {string} email - The email of the user.
     * @param {string} pass - The password of the user (to be hashed before storing).
     * @param {string} creationdate - The account creation date.
     * @param {string} usertype - The type of the user (e.g., admin, regular user).
     */
    constructor(username, fname, lname, email, pass, creationdate, usertype) {
        console.log('User constructor input:', { username, fname, lname, email, pass, creationdate, usertype });
        this.username = username;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.pass = pass;
        this.creationdate = creationdate;
        this.usertype = usertype;
    }

    /**
     * Creates a new user in the database.
     *
     * @returns {Promise} A promise that resolves to the result of the database execution.
     * @throws {Error} If the password is not provided.
     */
    async create() {
        if (!this.pass) {
            throw new Error('Password is required');
        }

        const sql = `INSERT INTO users (UserName, FName, LName, Email, Pass, CreationDate, UserType) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const hashedPassword = await bcrypt.hash(this.pass, 10);

        const params = [this.username, this.fname, this.lname, this.email, hashedPassword , this.creationdate, this.usertype];

        return await database.execute(sql, params);
    }

    /**
     * Retrieves all users from the database.
     *
     * @returns {Promise} A promise that resolves to the list of all users.
     */
    static getAll() {
        let sql = "select * from users";

        return database.execute(sql);
    }

    /**
     * Retrieves a user from the database by their ID.
     *
     * @param {number} id - The ID of the user.
     * @returns {Promise} A promise that resolves to the user data.
     */
    static getById(id) {
        let sql = `select * from users where UserID = ${id}`;

        return database.execute(sql);
    }

    /**
     * Retrieves a user from the database by their username.
     *
     * @param {string} username - The username of the user.
     * @returns {Promise} A promise that resolves to the user data.
     */
    static getLogin(username) {
        let sql = `select * from users where UserName = '${username}'`;
        
        return database.execute(sql);
    }

    /**
     * Updates the user information in the database by their ID.
     *
     * @param {number} id - The ID of the user.
     * @returns {Promise} A promise that resolves to the result of the database execution.
     */
    async updateById(id) {
        let sql = `update users set UserName = ${this.username}, FName = ${this.fname}, LName = ${this.lname}, Email = ${this.email}, 
        Pass = ${this.pass}, CreationDate = ${this.creationdate}, UserType = ${this.usertype} where UserID = ${this.id}`;

        return await database.execute(sql);
    }

    /**
     * Deletes a user from the database by their ID.
     *
     * @param {number} id - The ID of the user to be deleted.
     * @returns {Promise} A promise that resolves to the result of the database execution.
     */
    async deleteById(id) {
        let sql = `delete from users where UserID = ${id}`;

        return database.execute(sql);
    }
}

module.exports = User;