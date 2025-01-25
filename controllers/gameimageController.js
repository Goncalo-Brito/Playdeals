/**
 * Controller for managing GameImage operations.
 * Handles fetching, creating, updating, and deleting game images.
 * 
 * @module GameImageController
 */

const GameImage = require("../models/GameImage");

/**
 * Get all game images.
 * 
 * Fetches all game images from the database and returns them in the response.
 * In case of an error, a 500 status is returned with an error message.
 * 
 * @function getAll
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a list of game images or an error message.
 */
exports.getAll = async (req, res, next) => {
    try {
        const [GameImages, _] = await GameImage.getAll();
        res.status(200).json({ gameimages: GameImages });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

/**
 * Create a new game image.
 * 
 * Creates a new game image based on the request body and saves it to the database.
 * If successful, returns a 201 status with a success message. In case of error, returns a 500 error message.
 * 
 * @function create
 * @async
 * @param {Object} req - The request object containing game image data.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a success message or error.
 */
exports.create = async (req, res, next) => {
    let { imageextention, imagesource, imagename, gameID } = req.body;
    
    let gameimage = new GameImage(imageextention, imagesource, imagename, gameID);

    try {
        await gameimage.create();
        res.status(201).json({ message: "Game Image created successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating Game Image.");
        next(error);
    }
};

/**
 * Update a game image by ID.
 * 
 * Updates an existing game image based on the provided ID and updated data.
 * If successful, returns a message indicating the update. In case of an error, it is passed to the next middleware.
 * 
 * @function updateById
 * @async
 * @param {Object} req - The request object containing the game image ID and updated data.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a success message or error.
 */
exports.updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const [result] = await GameImage.updateById(id, updatedData);
        res.send("Image updated: " + gameimage);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/**
 * Delete a game image by ID.
 * 
 * Deletes a game image based on the provided ID. If successful, sends a 200 status with a success message.
 * In case of an error, the error is passed to the next middleware.
 * 
 * @function deleteById
 * @async
 * @param {Object} req - The request object containing the game image ID.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a success message or error.
 */
exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await GameImage.deleteById(id);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
