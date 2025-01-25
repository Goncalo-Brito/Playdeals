/**
 * Controller for managing Auction operations.
 * Handles fetching, creating, updating, and deleting auctions.
 * 
 * @module AuctionController
 */

const Auction = require("../models/Auction");

/**
 * Get all auctions.
 * 
 * Fetches all auctions from the database and returns them in the response.
 * In case of an error, a 500 status is returned with an error message.
 * 
 * @function getAll
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a list of auctions or an error message.
 */
exports.getAll = async (req, res, next) => {
    try {
        const [auctions, _] = await Auction.getAll();
        res.status(200).json({ auctions: auctions });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

/**
 * Get an auction by ID.
 * 
 * Fetches a single auction by its ID and returns it in the response.
 * If the auction is not found, a 404 status with an error message is returned.
 * 
 * @function getById
 * @async
 * @param {Object} req - The request object containing the auction ID.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with the auction or an error message.
 */
exports.getById = async (req, res, next) => {
    try {
        const [result] = await Auction.getById(req.params.id);
        const auction = result[0];

        if (!auction) {
            return res.status(404).json({ message: "Auction not found" });
        }

        res.status(200).json({ auction });
    } catch (error) {
        console.error("Error in getById:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

/**
 * Create a new auction.
 * 
 * Creates a new auction based on the request body and saves it to the database.
 * If successful, returns a 201 status with a success message. In case of error, returns a 500 error message.
 * 
 * @function create
 * @async
 * @param {Object} req - The request object containing auction data.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a success message or error.
 */
exports.create = async (req, res, next) => {
    let { AuctionTitle, initialvalue, status, startdate, enddate, description } = req.body;

    let auction = new Auction(AuctionTitle, initialvalue, status, startdate, enddate, description);

    try {
        await auction.create();
        res.status(201).json({ message: "Auction created successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating Auction.");
        next(error);
    }
};

/**
 * Update an auction by ID.
 * 
 * Updates an existing auction based on the provided ID and updated data.
 * If successful, returns a message indicating the update. In case of an error, it is passed to the next middleware.
 * 
 * @function updateById
 * @async
 * @param {Object} req - The request object containing the auction ID and updated data.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a success message or error.
 */
exports.updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const [result] = await Auction.updateById(id, updatedData);
        res.send("Auction updated: " + auction);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/**
 * Delete an auction by ID.
 * 
 * Deletes an auction based on the provided ID. If successful, returns a 200 status with a success message.
 * In case of an error, the error is passed to the next middleware.
 * 
 * @function deleteById
 * @async
 * @param {Object} req - The request object containing the auction ID.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a success message or an error message.
 */
exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await Auction.deleteById(id);
        res.status(200).send({ message: "Success" });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
