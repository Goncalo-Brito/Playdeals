/**
 * Profile Picture Router Module
 *
 * This module defines the routes for handling profile picture-related HTTP requests.
 * It uses Express.js to create routes and map them to the appropriate controller methods.
 */

const express = require("express");
const profilepictureController = require("../controllers/profilepictureController");

const router = express.Router();

/**
 * Route to handle general profile picture operations.
 * 
 * @route GET / - Retrieves all profile pictures.
 * @route POST / - Uploads a new profile picture.
 */
router
    .route("/")
    .get(profilepictureController.getAll)  // Get all profile pictures
    .post(profilepictureController.create); // Upload a new profile picture

/**
 * Route to handle specific profile picture operations based on ID.
 * 
 * @route GET /:id - Retrieves a profile picture by ID.
 * @route PUT /:id - Updates a profile picture by ID.
 * @route DELETE /:id - Deletes a profile picture by ID.
 */
router
    .route("/:id")
    .get(profilepictureController.getById)  // Get profile picture by ID
    .put(profilepictureController.updateById) // Update profile picture by ID
    .delete(profilepictureController.deleteById); // Delete profile picture by ID

module.exports = router;
