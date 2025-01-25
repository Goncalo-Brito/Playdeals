/**
 * Controller for managing games.
 * Handles various operations such as fetching, creating, updating, and deleting games.
 * 
 * @module GameController
 */

const Game = require("../models/Game");

/**
 * Get all games.
 * 
 * Fetches all the games from the database and returns them in the response.
 * In case of an error, a 500 status is returned with an error message.
 * 
 * @function getAll
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a list of games or an error message.
 */
exports.getAll = async (req, res, next) => {
    try {
        const [Games, _] = await Game.getAll();
        res.status(200).json({ games: Games });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

/**
 * Get a game by ID.
 * 
 * Fetches a single game by its ID. If the game is not found, a 404 status is returned.
 * In case of an error, a 500 status is returned with an error message.
 * 
 * @function getById
 * @async
 * @param {Object} req - The request object containing the game ID.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with the game or an error message.
 */
exports.getById = async (req, res, next) => {
    try {
        const [result] = await Game.getById(req.params.id);
        const game = result[0];

        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }

        res.status(200).json({ game });
    } catch (error) {
        console.error("Error in getById:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

/**
 * Create a new game.
 * 
 * Creates a new game based on the request body and saves it to the database.
 * If successful, returns a 201 status with a success message, otherwise returns a 500 error.
 * 
 * @function create
 * @async
 * @param {Object} req - The request object containing game data.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a success message or error.
 */
exports.create = async (req, res, next) => {
    let { gamename, gamecompany, gameprice, gamereleasedate, gamePEGI, gameplatform, gamediscount, featuredgame, gamestatus, gamedescription } = req.body;

    let game = new Game(gamename, gamecompany, gameprice, gamereleasedate, gamePEGI, gameplatform, gamediscount, featuredgame, gamestatus, gamedescription);

    try {
        await game.create();
        res.status(201).json({ message: "Game created successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating Game.");
        next(error);
    }
};

/**
 * Update a game by ID.
 * 
 * Updates a game in the database with the provided data. If successful, returns a success message.
 * If an error occurs, it is forwarded to the next middleware.
 * 
 * @function updateById
 * @async
 * @param {Object} req - The request object containing the game ID and update data.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a success message or error.
 */
exports.updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const [result] = await Game.updateById(id, updatedData);
        res.send("Game updated: " + game);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/**
 * Delete a game by ID.
 * 
 * Deletes a game from the database based on the provided ID. If the game is not found,
 * a 404 status is returned. If successful, a 200 status with a success message is returned.
 * 
 * @function deleteById
 * @async
 * @param {Object} req - The request object containing the game ID.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a success message or an error message.
 */
exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const [result] = await Game.deleteById(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Game not found' });
        }

        res.status(200).json({ message: 'Game deleted successfully' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
