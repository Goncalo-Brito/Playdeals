const Auction = require("../models/Auction");

exports.getAll = async (req, res, next) => {
    try {
        const [auctions, _] = await Auction.getAll();
        res.status(200).json({ auctions: auctions });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [result] = await Auction.getById(req.params.id);
        const auction = result[0];

        if (!auction) {
            return res.status(404).json({ message: "Auction not found" });
        }

        res.status(200).json({ auction });
    } catch (error) {
        console.error("Error in getById:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.create = async (req, res, next) => {
    let { initialvalue, status, startdate, enddate, description } = req.body;

    let auction = new auction(initialvalue, status, startdate, enddate, description);

    auction = await Auction.create();

    res.send("Auction created: " + auction);
}

exports.updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const [result] = await Auction.updateById(id, updatedData);
        res.send("Auction updated: " + auction);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await Auction.deleteById(id);
    } catch (error) {
        console.error(error);
        next(error);
    }
};