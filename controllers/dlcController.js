/**
 * Controller for managing downloadable content (DLC).
 * Handles operations such as fetching, creating, updating, and deleting DLCs.
 * 
 * @module DLCController
 */

const DLC = require("../models/DLC");

/**
 * Get all DLCs.
 * 
 * Fetches all the DLCs from the database and returns them in the response.
 * In case of an error, a 500 status is returned with an error message.
 * 
 * @function getAll
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a list of DLCs or an error message.
 */
exports.getAll = async (req, res, next) => {
    try {
        const [DLCs, _] = await DLC.getAll();
        res.status(200).json({ dlcs: DLCs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

/**
 * Get a DLC by ID.
 * 
 * Fetches a single DLC by its ID. If the DLC is not found, a 404 status is returned.
 * In case of an error, a 500 status is returned with an error message.
 * 
 * @function getById
 * @async
 * @param {Object} req - The request object containing the DLC ID.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with the DLC or an error message.
 */
exports.getById = async (req, res, next) => {
    try {
        const [result] = await DLC.getById(req.params.id);
        const dlc = result[0];

        if (!dlc) {
            return res.status(404).json({ message: "Dlc not found" });
        }

        res.status(200).json({ dlc });
    } catch (error) {
        console.error("Error in getById:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

/**
 * Create a new DLC.
 * 
 * Creates a new DLC based on the request body and saves it to the database.
 * If successful, returns a 201 status with a success message, otherwise returns a 500 error.
 * 
 * @function create
 * @async
 * @param {Object} req - The request object containing DLC data.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a success message or error.
 */
exports.create = async (req, res, next) => {
    let { DLCName, DLCPrice, DLCReleaseDate, DLCStatus, DLCDiscount, DLCDescription, GameID } = req.body;

    let dlc = new DLC(DLCName, DLCPrice, DLCReleaseDate, DLCStatus, DLCDiscount, DLCDescription, GameID);

    try {
        await dlc.create();
        res.status(201).json({ message: "DLC created successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating DLC.");
        next(error);
    }
};

/**
 * Update a DLC by ID.
 * 
 * Updates a DLC in the database with the provided data. If successful, returns a success message.
 * If an error occurs, it is forwarded to the next middleware.
 * 
 * @function updateById
 * @async
 * @param {Object} req - The request object containing the DLC ID and update data.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a success message or error.
 */
exports.updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const [result] = await DLC.updateById(id, updatedData);
        res.send("DLC updated: " + dlc);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/**
 * Delete a DLC by ID.
 * 
 * Deletes a DLC from the database based on the provided ID. If the DLC is not found,
 * a 404 status is returned. If successful, a 200 status with a success message is returned.
 * 
 * @function deleteById
 * @async
 * @param {Object} req - The request object containing the DLC ID.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a success message or an error message.
 */
exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await DLC.deleteById(id);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
