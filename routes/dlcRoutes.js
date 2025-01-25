/**
 * DLC Router Module
 *
 * This module defines routes for handling DLC (Downloadable Content) related HTTP requests.
 * It uses Express.js to create and manage routes, mapping them to corresponding controller methods.
 */

const express = require("express");
const dlcController = require("../controllers/dlcController");

const router = express.Router();

/**
 * Route to handle general DLC operations.
 * 
 * @route GET / - Retrieves all DLCs.
 * @route POST / - Creates a new DLC.
 */
router
    .route("/")
    .get(dlcController.getAll)  // Get all DLCs
    .post(dlcController.create); // Create a new DLC

/**
 * Route to handle specific DLC operations based on ID.
 * 
 * @route GET /:id - Retrieves a DLC by ID.
 * @route PUT /:id - Updates a DLC by ID.
 * @route DELETE /:id - Deletes a DLC by ID.
 */
router
    .route("/:id")
    .get(dlcController.getById)  // Get DLC by ID
    .put(dlcController.updateById) // Update DLC by ID
    .delete(dlcController.deleteById); // Delete DLC by ID

module.exports = router;
