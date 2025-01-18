const express = require("express");
const biddingController = require("../controllers/biddingController");

const router = express.Router();

router
    .route("/")
    .post(biddingController.create);

router
    .route("/:id")
    .get(biddingController.getById)
    .delete(biddingController.deleteById);

module.exports = router;
