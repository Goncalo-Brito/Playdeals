/**
 * Middleware that checks if the user is authenticated.
 * If the user is authenticated, it proceeds to the next middleware.
 * If not, it redirects the user to the login page.
 * @function
 * @param {Object} req - The request object, containing information about the HTTP request.
 * @param {Object} res - The response object, used to send the HTTP response.
 * @param {function} next - The next middleware function to be called if the user is authenticated.
 */
module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }
};
