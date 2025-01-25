/**
 * Game Router Module
 *
 * This module defines the routes for handling game-related HTTP requests.
 * It uses Express.js to create routes and map them to the appropriate controller methods.
 */

const express = require("express");
const gameController = require("../controllers/gameController");

const router = express.Router();

/**
 * Route to handle general game operations.
 * 
 * @route GET / - Retrieves all games.
 * @route POST / - Creates a new game.
 */
router
    .route("/")
    .get(gameController.getAll)  // Get all games
    .post(gameController.create); // Create a new game

/**
 * Route to handle specific game operations based on ID.
 * 
 * @route GET /:id - Retrieves a game by ID.
 * @route PUT /:id - Updates a game by ID.
 * @route DELETE /:id - Deletes a game by ID.
 */
router
    .route("/:id")
    .get(gameController.getById)  // Get game by ID
    .put(gameController.updateById) // Update game by ID
    .delete(gameController.deleteById); // Delete game by ID

module.exports = router;
