/**
 * Auction Router Module
 *
 * This module defines the routes for handling auction-related HTTP requests.
 * It uses Express.js to create routes and map them to the appropriate controller methods.
 */

const express = require("express");
const auctionController = require("../controllers/auctionController");

const router = express.Router();

/**
 * Route to handle general auction operations.
 * 
 * @route GET / - Retrieves all auctions
 * @route POST / - Creates a new auction
 */
router
    .route("/")
    .get(auctionController.getAll)  // Get all auctions
    .post(auctionController.create); // Create a new auction

/**
 * Route to handle specific auction operations based on ID.
 * 
 * @route GET /:id - Retrieves auction by ID
 * @route PUT /:id - Updates auction by ID
 * @route DELETE /:id - Deletes auction by ID
 */
router
    .route("/:id")
    .get(auctionController.getById)  // Get auction by ID
    .put(auctionController.updateById) // Update auction by ID
    .delete(auctionController.deleteById); // Delete auction by ID

module.exports = router;
