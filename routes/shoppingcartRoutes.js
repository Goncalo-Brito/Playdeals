const express = require("express");
const shoppingcartController = require("../controllers/shoppingcartController");

const router = express.Router();

router
    .route("/")
    .get(shoppingcartController.getAll)
    .post(shoppingcartController.create);

router
    .route("/:id")
    .delete(shoppingcartController.deleteCartItems);

module.exports = router;
