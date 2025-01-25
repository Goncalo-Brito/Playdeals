const ShoppingCart = require("../models/ShoppingCart");

exports.getAll = async (req, res, next) => {
    try {
        const [shoppingcarts, _] = await ShoppingCart.getAll();
        res.status(200).json({ shoppingcarts: shoppingcarts });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

exports.create = async (req, res, next) => {
    let { UserID,  GameID, DLCID, GiftCardID } = req.body;

    let date = new Date();

    let DateAdded = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}`;

    let shoppingcart = new ShoppingCart(UserID,  GameID, DLCID, GiftCardID, DateAdded);

    try {
        await shoppingcart.create();
        res.status(201).json({ success: true, message: "shoppingcart created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating shoppingcart." });
    }
};

exports.deleteCartItems = async (req, res, next) => {
    const userID = req.params.UserID;

    try {
        await ShoppingCart.deleteCartItems(userID);
        res.status(200).json({ success: true, message: `Cart items deleted for UserID: ${userID}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error deleting cart items." });
    }
};

exports.deleteById = async (req, res, next) => {
    const id = req.params.id;

    try {
        await ShoppingCart.deleteById(id);
        res.status(200).json({ success: true, message: `Cart items deleted for UserID: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error deleting cart items." });
    }
};