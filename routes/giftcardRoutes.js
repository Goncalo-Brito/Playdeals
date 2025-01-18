const express = require("express");
const giftcardController = require("../controllers/giftcardController");

const router = express.Router();

router
    .route("/")
    .get(giftcardController.getAll)

router
    .route("/:id")
    .get(giftcardController.getById)

module.exports = router;
