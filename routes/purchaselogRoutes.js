/**
 * Purchase Log Router Module
 *
 * This module defines the routes for handling purchase log-related HTTP requests.
 * It uses Express.js to create routes and map them to the appropriate controller methods.
 */

const express = require("express");
const purchaselogController = require("../controllers/purchaselogController");

const router = express.Router();

/**
 * Route to handle general purchase log operations.
 * 
 * @route GET / - Retrieves all purchase logs.
 * @route POST / - Creates a new purchase log.
 */
router
    .route("/")
    .get(purchaselogController.getAll)  // Get all purchase logs
    .post(purchaselogController.create); // Create a new purchase log

/**
 * Route to handle specific purchase log operations based on ID.
 * 
 * @route PUT /:id - Updates a purchase log by ID.
 * @route DELETE /:id - Deletes a purchase log by ID.
 */
router
    .route("/:id")
    .put(purchaselogController.updateById) // Update purchase log by ID
    .delete(purchaselogController.deleteById); // Delete purchase log by ID

module.exports = router;
