/**
 * Controller for handling operations related to purchase logs.
 * @module purchaseLogController
 */

const PurchaseLog = require("../models/PurchaseLog");

/**
 * Retrieves all purchase logs from the database and returns them as a JSON response.
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to a response with the list of purchase logs.
 */
exports.getAll = async (req, res, next) => {
    try {
        const [PurchaseLogs, _] = await PurchaseLog.getAll();
        res.status(200).json({
            success: true,
            data: PurchaseLogs,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error obtaining purchase logs.",
            error: error.message,
        });
    }
};

/**
 * Generates a random item key for a new purchase log.
 * @function
 * @returns {string} - A random string representing the item key.
 */
const generateItemKey = () => {
    return Math.random().toString(36).substr(2, 16); 
};

/**
 * Creates a new purchase log and stores it in the database.
 * @function
 * @param {Object} req - The request object containing the purchase log data.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to a response confirming the creation of the purchase log.
 */
exports.create = async (req, res, next) => {
    let { UserID, GameID, DLCID, GiftCardID, PurchasePrice } = req.body;

    let ItemKey = req.body.ItemKey || generateItemKey(); 

    let date = new Date();
    let PurchaseDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; 

    let purchaselog = new PurchaseLog(PurchaseDate, PurchasePrice, ItemKey, UserID, GameID, DLCID, GiftCardID);

    try {
        await purchaselog.create();
        res.status(201).json({ success: true, message: "Purchase log created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating purchase log." });
    }
};

/**
 * Updates a purchase log by its ID.
 * @function
 * @param {Object} req - The request object containing the updated data and the ID of the purchase log.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to a response confirming the update of the purchase log.
 */
exports.updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const [result] = await PurchaseLog.updateById(id, updatedData);
        res.send("Profile Picture updated: " + PurchaseLog);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/**
 * Deletes a purchase log by its ID.
 * @function
 * @param {Object} req - The request object containing the ID of the purchase log.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to a response confirming the deletion of the purchase log.
 */
exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await PurchaseLog.deleteById(id);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
