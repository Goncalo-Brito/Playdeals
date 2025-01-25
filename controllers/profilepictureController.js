const ProfilePicture = require("../models/ProfilePicture");

/**
 * Get all profile pictures and render the staff page.
 * 
 * Fetches all profile pictures from the database and renders the 'staffpage' view.
 * 
 * @function getAll
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Renders the 'staffpage' view with profile pictures.
 */
exports.getAll = async (req, res, next) => {
    try {
        const [ProfilePictures, _] = await ProfilePicture.getAll();
        res.render("staffpage", { ProfilePictures });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * Get profile picture info and render the profile page.
 * 
 * Fetches a specific profile picture by ID and renders the 'profilepage' view.
 * 
 * @function getProfilePage
 * @async
 * @param {Object} req - The request object containing the profile picture ID.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Renders the 'profilepage' view with profile picture info.
 */
exports.getProfilePage = async (req, res, next) => {
    try {
        const [[profilepicture, _]] = await ProfilePicture.getById(req.params.id);
        res.render("profilepage", { profilepicture });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * Get profile picture info and render the settings page.
 * 
 * Fetches a specific profile picture by ID and renders the 'settings' view.
 * 
 * @function getSettingsPage
 * @async
 * @param {Object} req - The request object containing the profile picture ID.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Renders the 'settings' view with profile picture info.
 */
exports.getSettingsPage = async (req, res, next) => {
    try {
        const [[profilepicture, _]] = await ProfilePicture.getById(req.params.id);
        res.render("settings", { profilepicture });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * Get profile picture info and render the auctions page.
 * 
 * Fetches a specific profile picture by ID and renders the 'auctionspage' view.
 * 
 * @function getAuctionsPage
 * @async
 * @param {Object} req - The request object containing the profile picture ID.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Renders the 'auctionspage' view with profile picture info.
 */
exports.getAuctionsPage = async (req, res, next) => {
    try {
        const [[profilepicture, _]] = await ProfilePicture.getById(req.params.id);
        res.render("auctionspage", { profilepicture });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * Create a new profile picture.
 * 
 * Creates a new profile picture using the provided data and saves it to the database.
 * 
 * @function create
 * @async
 * @param {Object} req - The request object containing the profile picture data.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response indicating the profile picture was created.
 */
exports.create = async (req, res, next) => {
    let { pfpextention, pfpsource, pfpname, gameID } = req.body;

    let profilepicture = new ProfilePicture(pfpextention, pfpsource, pfpname, gameID);

    try {
        await profilepicture.create();
        res.send("Profile Picture created: " + profilepicture);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating Profile Picture.");
    }
};

/**
 * Update a profile picture by its ID.
 * 
 * Updates a profile picture's data by ID with the provided updated data.
 * 
 * @function updateById
 * @async
 * @param {Object} req - The request object containing the profile picture ID and updated data.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response indicating the profile picture was updated.
 */
exports.updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const [result] = await ProfilePicture.updateById(id, updatedData);
        res.send("Profile Picture updated: " + result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/**
 * Delete a profile picture by its ID.
 * 
 * Deletes a profile picture from the database by its ID.
 * 
 * @function deleteById
 * @async
 * @param {Object} req - The request object containing the profile picture ID.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Sends a response indicating the profile picture was deleted.
 */
exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await ProfilePicture.deleteById(id);
        res.send("Profile Picture deleted.");
    } catch (error) {
        console.error(error);
        next(error);
    }
};
