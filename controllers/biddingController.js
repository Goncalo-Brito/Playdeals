const Bidding = require("../models/Bidding");

exports.getAll = async (req, res, next) => {
    try {
        const [biddings, _] = await Bidding.getAll();
        res.status(200).json({ biddings: biddings });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
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

    let bidding = new Bidding(biddingvalue, userID, auctionID);

    try {
        await bidding.create();
        res.status(201).json({ success: true, message: "Bidding created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating Bidding." });
    }
};

exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await Bidding.deleteById(id);
    } catch (error) {
        console.error(error);
        next(error);
    }
};