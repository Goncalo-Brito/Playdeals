const PurchaseLog = require("../models/PurchaseLog");

exports.getAll = async (req, res, next) => {
    try {
        const [PurchaseLogs, _] = await PurchaseLog.getAll();
        res.status(200).json({
            success: true,
            data: PurchaseLogs,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Erro ao obter os logs de compras.",
            error: error.message,
        });
    }
};

const generateItemKey = () => {
    return Math.random().toString(36).substr(2, 16); 
};

exports.create = async (req, res, next) => {
    let { UserID, GameID, DLCID, GiftCardID, PurchasePrice } = req.body;

    let ItemKey = req.body.ItemKey || generateItemKey(); 

    let date = new Date();
    let PurchaseDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; 

    let purchaselog = new PurchaseLog(PurchaseDate, PurchasePrice, ItemKey, UserID, GameID, DLCID, GiftCardID);

    try {
        await purchaselog.create();
        res.status(201).json({ success: true, message: "PurchaseLog created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating PurchaseLog." });
    }
};

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