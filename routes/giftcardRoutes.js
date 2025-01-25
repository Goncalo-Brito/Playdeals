/**
 * Gift Card Router Module
 *
 * This module defines the routes for handling gift card-related HTTP requests.
 * It uses Express.js to create routes and map them to the appropriate controller methods.
 */

const express = require("express");
const giftcardController = require("../controllers/giftcardController");

const router = express.Router();

/**
 * Route to handle general gift card operations.
 * 
 * @route GET / - Retrieves all gift cards.
 */
router
    .route("/")
    .get(giftcardController.getAll);  // Get all gift cards

/**
 * Route to handle specific gift card operations based on ID.
 * 
 * @route GET /:id - Retrieves a gift card by ID.
 */
router
    .route("/:id")
    .get(giftcardController.getById);  // Get gift card by ID

module.exports = router;
