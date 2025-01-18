const PurchaseLog = require("../models/PurchaseLog");

exports.getAll = async (req, res, next) => {
    try {
        const [PurchaseLogs, _] = await PurchaseLog.getAll();
        res.render("profilepage", { PurchaseLogs });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.create = async (req, res, next) => {
    let { purchasedate, purchaseprice, itemkey, userID, gameID, dlcID, giftcardID } = req.body;

    let PurchaseLog = new PurchaseLog(purchasedate, purchaseprice, itemkey, userID, gameID, dlcID, giftcardID);

    PurchaseLog = await PurchaseLog.create();

    res.send("Profile Picture created: " + PurchaseLog);
}

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

exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await PurchaseLog.deleteById(id);
    } catch (error) {
        console.error(error);
        next(error);
    }
};