const GiftCard = require("../models/GiftCard");

exports.getAll = async (req, res, next) => {
    try {
        const [GiftCards, _] = await GiftCard.getAll();
        res.status(200).json({ giftcards : GiftCards });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[cardsinfo, _]] = await GiftCard.getById(req.params.id);
        res.render("cardpage", { cardsinfo });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[cardsinfo, _]] = await GiftCard.getById(req.params.id);
        res.render("cartpage", { cardsinfo });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[cardsinfo, _]] = await GiftCard.getById(req.params.id);
        res.render("profilepage", { cardsinfo });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[cardsinfo, _]] = await GiftCard.getById(req.params.id);
        res.render("payment", { cardsinfo });
    } catch (error) {
        console.log(error);
        next(error);
    }
};