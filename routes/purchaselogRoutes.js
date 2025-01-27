const express = require("express");
const purchaselogController = require("../controllers/purchaselogController");

const router = express.Router();

router
    .route("/")
    .get(purchaselogController.getAll)
    .post(purchaselogController.create);

router
    .route("/:id")
    .put(purchaselogController.updateById)
    .delete(purchaselogController.deleteById);

module.exports = router;
