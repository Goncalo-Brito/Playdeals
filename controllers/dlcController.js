const DLC = require("../models/DLC");

exports.getAll = async (req, res, next) => {
    try {
        const [DLCs, _] = await DLC.getAll();
        res.status(200).json({ dlcs: DLCs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [result] = await DLC.getById(req.params.id);
        const dlc = result[0];

        if (!dlc) {
            return res.status(404).json({ message: "Dlc not found" });
        }

        res.status(200).json({ dlc });
    } catch (error) {
        console.error("Error in getById:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

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