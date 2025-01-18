const CardsInfo = require("../models/CardsInfo");

exports.getAll = async (req, res, next) => {
    try {
        const [auctions, _] = await CardsInfo.getAll();
        res.render("discoverygames", { auctions });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[cardsinfo, _]] = await CardsInfo.getById(req.params.id);
        res.render("settings", { cardsinfo });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[cardsinfo, _]] = await CardsInfo.getById(req.params.id);
        res.render("payment", { cardsinfo });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.create = async (req, res, next) => {
    let { cardnumber, cardCVC, cardVal, userID } = req.body;

    let cardsinfo = new CardsInfo(cardnumber, cardCVC, cardVal, userID);

    cardsinfo = await CardsInfo.create();

    res.send("Card created: " + cardsinfo);
}

exports.updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const [result] = await CardsInfo.updateById(id, updatedData);
        res.send("Card updated: " + cardsinfo);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await CardsInfo.deleteById(id);
    } catch (error) {
        console.error(error);
        next(error);
    }
};