/**
 * Bidding Router Module
 *
 * This module defines the routes for handling bidding-related HTTP requests.
 * It uses Express.js to create routes and map them to the appropriate controller methods.
 */

const express = require("express");
const biddingController = require("../controllers/biddingController");

const router = express.Router();

/**
 * Route to handle general bidding operations.
 * 
 * @route GET / - Retrieves all bidding records
 * @route POST / - Creates a new bidding record
 */
router
    .route("/")
    .get(biddingController.getAll)  // Get all bidding records
    .post(biddingController.create); // Create a new bidding record

/**
 * Route to handle specific bidding operations based on ID.
 * 
 * @route GET /:id - Retrieves a bidding record by ID
 * @route DELETE /:id - Deletes a bidding record by ID
 */
router
    .route("/:id")
    .get(biddingController.getById)  // Get bidding record by ID
    .delete(biddingController.deleteById); // Delete bidding record by ID

module.exports = router;
