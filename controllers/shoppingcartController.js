/**
 * Controller for handling operations related to shopping carts.
 * @module shoppingCartController
 */

const ShoppingCart = require("../models/ShoppingCart");

/**
 * Retrieves all shopping carts from the database and returns them as a JSON response.
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to a response with the list of shopping carts.
 */
exports.getAll = async (req, res, next) => {
    try {
        const [shoppingcarts, _] = await ShoppingCart.getAll();
        res.status(200).json({ shoppingcarts: shoppingcarts });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

/**
 * Creates a new shopping cart entry and stores it in the database.
 * @function
 * @param {Object} req - The request object containing the shopping cart data.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to a response confirming the creation of the shopping cart.
 */
exports.create = async (req, res, next) => {
    let { UserID, GameID, DLCID, GiftCardID } = req.body;

    let date = new Date();

    let DateAdded = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;

    let shoppingcart = new ShoppingCart(UserID, GameID, DLCID, GiftCardID, DateAdded);

    try {
        await shoppingcart.create();
        res.status(201).json({ success: true, message: "Shopping cart created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating shopping cart." });
    }
};

/**
 * Deletes all items in the shopping cart for a specific user, identified by UserID.
 * @function
 * @param {Object} req - The request object containing the UserID in the URL parameters.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to a response confirming the deletion of cart items.
 */
exports.deleteCartItems = async (req, res, next) => {
    const userID = req.params.UserID;

    try {
        await ShoppingCart.deleteCartItems(userID);
        res.status(200).json({ success: true, message: `Cart items deleted for UserID: ${userID}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error deleting cart items." });
    }
};

/**
 * Deletes a shopping cart entry by its ID.
 * @function
 * @param {Object} req - The request object containing the cart ID in the URL parameters.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to a response confirming the deletion of the shopping cart entry.
 */
exports.deleteById = async (req, res, next) => {
    const id = req.params.id;

    try {
        await ShoppingCart.deleteById(id);
        res.status(200).json({ success: true, message: `Cart items deleted for UserID: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error deleting cart items." });
    }
};
