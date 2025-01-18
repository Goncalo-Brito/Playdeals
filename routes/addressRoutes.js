const express = require("express");
const addressController = require("../controllers/addressController");

const router = express.Router();

router
    .route("/")
    .get(addressController.getAll)
    .post(addressController.create);

router
    .route("/:id")
    .get(addressController.getById)
    .put(addressController.updateById)
    .delete(addressController.deleteById);

module.exports = router;