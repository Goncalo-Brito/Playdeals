/**
 * Controller that handles the operations related to users.
 * @module userController
 */

const User = require("../models/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Retrieves all users from the database and sends them as a JSON response.
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to a response with the users.
 */
exports.getAll = async (req, res, next) => {
    try {
        const [users, _] = await User.getAll();
        res.status(200).json({ users: users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

/**
 * Retrieves a specific user by ID and renders their profile page.
 * @function
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to rendering the profile page.
 */
exports.getById = async (req, res, next) => {
    try {
        const [[user, _]] = await User.getById(req.params.id);
        res.render("profilepage", { user });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * Handles user login. Verifies username and password and starts a session if valid.
 * @function
 * @param {Object} req - The request object containing login credentials.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to a response with login results.
 */
exports.getLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const [[user, _]] = await User.getLogin(username);
        if (user) {
            bcrypt.compare(password, user.Pass, (err, isMatch) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Error comparing passwords." });
                }
                if (isMatch) {
                    req.session.user = { id: user.UserID, username: user.UserName };
                    res.status(200).json({ user });
                } else {
                    res.status(404).json({ message: "Invalid username or password." });
                }
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * Creates a new user and stores it in the database.
 * @function
 * @param {Object} req - The request object containing user data.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to a response confirming user creation.
 */
exports.create = async (req, res, next) => {
    let { username, fname, lname, email, password } = req.body;

    let date = new Date();

    let creationdate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}`;

    let usertype = 'U';

    let user = new User(username, fname, lname, email, password, creationdate, usertype);

    try {
        await user.create();
        res.status(201).json({ message: "User created successfully." });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(401).json({ message: "Email or Username is already in use. Please use a different email." });
        } else {
            console.log(error);
            res.status(500).send("Error creating user.");
        }
        next(error);
    }
};

/**
 * Updates an existing user by ID with the provided updated data.
 * @function
 * @param {Object} req - The request object containing the user ID and updated data.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to a response confirming user update.
 */
exports.updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const [result] = await User.updateById(id, updatedData);
        res.send("User updated: " + user);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/**
 * Deletes a user by ID.
 * @function
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to a response confirming user deletion.
 */
exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await User.deleteById(id);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
