const User = require("../models/Bidding");

exports.getById = async (req, res, next) => {
    try {
        const [[bidding, _]] = await Bidding.getById(req.params.id);
        res.render("auctionpage", { bidding });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[bidding, _]] = await Bidding.getById(req.params.id);
        res.render("discoveryauctions", { bidding });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.create = async (req, res, next) => {
    let { biddingvalue, userID, auctionID } = req.body;

    let bidding = new bidding(biddingvalue, userID, auctionID);

    bidding = await Bidding.create();

    res.send("Bidding created: " + bidding);
}

exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await Bidding.deleteById(id);
    } catch (error) {
        console.error(error);
        next(error);
    }
};