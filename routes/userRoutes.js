/**
 * User Router Module
 *
 * This module defines the routes for handling user-related HTTP requests.
 * It uses Express.js to create routes and map them to the appropriate controller methods.
 */

const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

/**
 * Route to handle general user operations.
 * 
 * @route GET / - Retrieves all users.
 * @route POST / - Creates a new user.
 */
router
    .route("/")
    .get(userController.getAll)  // Get all users
    .post(userController.create); // Create a new user

/**
 * Route to handle specific user operations based on ID.
 * 
 * @route GET /:id - Retrieves a user by ID.
 * @route PUT /:id - Updates a user by ID.
 * @route DELETE /:id - Deletes a user by ID.
 */
router
    .route("/:id")
    .get(userController.getById)  // Get user by ID
    .put(userController.updateById) // Update user by ID
    .delete(userController.deleteById); // Delete user by ID

/**
 * Route to handle user login operations.
 * 
 * @route POST /login - Authenticates a user based on credentials.
 */
router.post("/login", userController.getLogin); // Handle user login

module.exports = router;
