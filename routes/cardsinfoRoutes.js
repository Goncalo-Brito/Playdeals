const express = require("express");
const cardsinfoController = require("../controllers/cardsinfoController");

const router = express.Router();

router
    .route("/")
    .post(cardsinfoController.create);

router
    .route("/:id")
    .get(cardsinfoController.getById)
    .put(cardsinfoController.updateById)
    .delete(cardsinfoController.deleteById);

module.exports = router;
