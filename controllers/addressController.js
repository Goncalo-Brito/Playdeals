const Address = require("../models/Address");

exports.getAll = async (req, res, next) => {
    try {
        const [addresses, _] = await Address.getAll();
        res.render("staffpage", { addresses });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[address, _]] = await Address.getById(req.params.id);
        res.render("settings", { address });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.create = async (req, res, next) => {
    let { country, street, postalCode } = req.body;

    let address = new address(country, street, postalCode);

    address = await Address.create();

    res.send("Address created: " + address);
}

exports.updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const [result] = await Address.updateById(id, updatedData);
        res.send("Address updated: " + address);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await Address.deleteById(id);
    } catch (error) {
        console.error(error);
        next(error);
    }
};