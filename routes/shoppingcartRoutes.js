/**
 * Shopping Cart Router Module
 *
 * This module defines the routes for handling shopping cart-related HTTP requests.
 * It uses Express.js to create routes and map them to the appropriate controller methods.
 */

const express = require("express");
const shoppingcartController = require("../controllers/shoppingcartController");

const router = express.Router();

/**
 * Route to handle general shopping cart operations.
 * 
 * @route GET / - Retrieves all shopping cart items.
 * @route POST / - Adds a new item to the shopping cart.
 */
router
    .route("/")
    .get(shoppingcartController.getAll)  // Get all shopping cart items
    .post(shoppingcartController.create); // Add a new item to the shopping cart

/**
 * Route to handle specific shopping cart item operations based on ID.
 * 
 * @route DELETE /:id - Deletes a specific shopping cart item by ID.
 */
router
    .route("/:id")
    .delete(shoppingcartController.deleteById); // Delete shopping cart item by ID

/**
 * Route to delete all shopping cart items for a specific user.
 * 
 * @route DELETE /delete/:UserID - Deletes all shopping cart items for a given user.
 */
router
    .route("/delete/:UserID")
    .delete(shoppingcartController.deleteCartItems); // Delete all cart items for a user

module.exports = router;
