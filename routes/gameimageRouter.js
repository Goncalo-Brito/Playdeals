/**
 * Game Image Router Module
 *
 * This module defines the routes for handling game image-related HTTP requests.
 * It uses Express.js to create routes and map them to the appropriate controller methods.
 */

const express = require("express");
const gameimageController = require("../controllers/gameimageController");

const router = express.Router();

/**
 * Route to handle general game image operations.
 * 
 * @route GET / - Retrieves all game images.
 * @route POST / - Uploads a new game image.
 */
router
    .route("/")
    .get(gameimageController.getAll)  // Get all game images
    .post(gameimageController.create); // Upload a new game image

/**
 * Route to handle specific game image operations based on ID.
 * 
 * @route GET /:id - Retrieves a game image by ID.
 * @route PUT /:id - Updates a game image by ID.
 * @route DELETE /:id - Deletes a game image by ID.
 */
router
    .route("/:id")
    .get(gameimageController.getById)  // Get game image by ID
    .put(gameimageController.updateById) // Update game image by ID
    .delete(gameimageController.deleteById); // Delete game image by ID

module.exports = router;
