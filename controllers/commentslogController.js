const CommentsLog = require("../models/CommentsLog");

exports.getById = async (req, res, next) => {
    try {
        const [[commentslog, _]] = await CommentsLog.getById(req.params.id);
        res.render("auctionpage", { commentslog });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.create = async (req, res, next) => {
    let { commenttext, userID, biddingID } = req.body;

    let commentslog = new commentslog(commenttext, userID, biddingID);

    commentslog = await CommentsLog.create();

    res.send("Comment created: " + commentslog);
}

exports.updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const [result] = await CommentsLog.updateById(id, updatedData);
        res.send("Comment updated: " + commentslog);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await CommentsLog.deleteById(id);
    } catch (error) {
        console.error(error);
        next(error);
    }
};