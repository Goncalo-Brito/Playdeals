const DLC = require("../models/DLC");

exports.getAll = async (req, res, next) => {
    try {
        const [DLCs, _] = await DLC.getAll();
        res.render("discoverygames", { DLCs });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[dlc, _]] = await DLC.getById(req.params.id);
        res.render("dlcpage", { dlc });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[dlc, _]] = await DLC.getById(req.params.id);
        res.render("staffpage", { dlc });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[dlc, _]] = await DLC.getById(req.params.id);
        res.render("gamepage", { dlc });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[dlc, _]] = await DLC.getById(req.params.id);
        res.render("homepage", { dlc });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[dlc, _]] = await DLC.getById(req.params.id);
        res.render("profilepage", { dlc });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[dlc, _]] = await DLC.getById(req.params.id);
        res.render("payment", { dlc });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[dlc, _]] = await DLC.getById(req.params.id);
        res.render("cartpage", { dlc });
    } catch (error) {
        console.log(error);
        next(error);
    }
}



exports.create = async (req, res, next) => {
    let { commenttext, userID, biddingID } = req.body;

    let dlc = new dlc(commenttext, userID, biddingID);

    dlc = await DLC.create();

    res.send("DLC created: " + dlc);
}

exports.updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const [result] = await DLC.updateById(id, updatedData);
        res.send("DLC updated: " + dlc);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await DLC.deleteById(id);
    } catch (error) {
        console.error(error);
        next(error);
    }
};