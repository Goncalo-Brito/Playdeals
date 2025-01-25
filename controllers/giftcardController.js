const GiftCard = require("../models/GiftCard");

/**
 * Get all gift cards.
 * 
 * Fetches all gift cards from the database and returns them in the response.
 * In case of an error, a 500 status is returned with an error message.
 * 
 * @function getAll
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response with a list of gift cards or an error message.
 */
exports.getAll = async (req, res, next) => {
    try {
        const [GiftCards, _] = await GiftCard.getAll();
        res.status(200).json({ giftcards : GiftCards });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

/**
 * Get gift card info and render the card page.
 * 
 * Fetches a specific gift card by ID and renders the 'cardpage' view.
 * 
 * @function getCardPage
 * @async
 * @param {Object} req - The request object containing the gift card ID.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Renders the 'cardpage' view with gift card info.
 */
exports.getCardPage = async (req, res, next) => {
    try {
        const [[cardsinfo, _]] = await GiftCard.getById(req.params.id);
        res.render("cardpage", { cardsinfo });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * Get gift card info and render the cart page.
 * 
 * Fetches a specific gift card by ID and renders the 'cartpage' view.
 * 
 * @function getCartPage
 * @async
 * @param {Object} req - The request object containing the gift card ID.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Renders the 'cartpage' view with gift card info.
 */
exports.getCartPage = async (req, res, next) => {
    try {
        const [[cardsinfo, _]] = await GiftCard.getById(req.params.id);
        res.render("cartpage", { cardsinfo });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * Get gift card info and render the profile page.
 * 
 * Fetches a specific gift card by ID and renders the 'profilepage' view.
 * 
 * @function getProfilePage
 * @async
 * @param {Object} req - The request object containing the gift card ID.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Renders the 'profilepage' view with gift card info.
 */
exports.getProfilePage = async (req, res, next) => {
    try {
        const [[cardsinfo, _]] = await GiftCard.getById(req.params.id);
        res.render("profilepage", { cardsinfo });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * Get gift card info and render the payment page.
 * 
 * Fetches a specific gift card by ID and renders the 'payment' view.
 * 
 * @function getPaymentPage
 * @async
 * @param {Object} req - The request object containing the gift card ID.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Renders the 'payment' view with gift card info.
 */
exports.getPaymentPage = async (req, res, next) => {
    try {
        const [[cardsinfo, _]] = await GiftCard.getById(req.params.id);
        res.render("payment", { cardsinfo });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
