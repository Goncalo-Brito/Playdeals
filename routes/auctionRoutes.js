const express = require("express");
const auctionController = require("../controllers/auctionController");

const router = express.Router();

router
    .route("/")
    .get(auctionController.getAll)
    .post(auctionController.create);

router
    .route("/:id")
    .get(auctionController.getById)
    .put(auctionController.updateById)
    .delete(auctionController.deleteById);

module.exports = router;