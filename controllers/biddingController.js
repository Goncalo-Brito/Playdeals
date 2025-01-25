/**
 * Controller for managing Bidding operations.
 * Handles fetching, creating, and deleting bids.
 * 
 * @module BiddingController
 */

const Bidding = require("../models/Bidding");

/**
 * Get all biddings.
 * 
 * Fetches all biddings from the database and returns them in the response.
 * In case of an error, a 500 status is returned with an error message.
 * 
 * @function getAll
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a list of biddings or an error message.
 */
exports.getAll = async (req, res, next) => {
    try {
        const [biddings, _] = await Bidding.getAll();
        res.status(200).json({ biddings: biddings });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

/**
 * Get a bidding by ID.
 * 
 * Fetches a single bidding by its ID and renders it on the "discoveryauctions" page.
 * If an error occurs, it is passed to the next middleware.
 * 
 * @function getById
 * @async
 * @param {Object} req - The request object containing the bidding ID.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Renders the "discoveryauctions" page with the bidding or passes an error to the next middleware.
 */
exports.getById = async (req, res, next) => {
    try {
        const [[bidding, _]] = await Bidding.getById(req.params.id);
        res.render("discoveryauctions", { bidding });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * Create a new bidding.
 * 
 * Creates a new bidding based on the request body and saves it to the database.
 * If successful, returns a 201 status with a success message. In case of error, returns a 500 error message.
 * 
 * @function create
 * @async
 * @param {Object} req - The request object containing bidding data.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a success message or error.
 */
exports.create = async (req, res, next) => {
    let { biddingvalue, userID, auctionID } = req.body;

    let bidding = new Bidding(biddingvalue, userID, auctionID);

    try {
        await bidding.create();
        res.status(201).json({ success: true, message: "Bidding created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating Bidding." });
    }
};

/**
 * Delete a bidding by ID.
 * 
 * Deletes a bidding from the database based on the provided ID.
 * If successful, a 200 status with a success message is returned. In case of error, the error is passed to the next middleware.
 * 
 * @function deleteById
 * @async
 * @param {Object} req - The request object containing the bidding ID.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a success message or an error message.
 */
exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await Bidding.deleteById(id);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
