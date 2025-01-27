const express = require("express");
const gameimageController = require("../controllers/gameimageController");

const router = express.Router();

router
    .route("/")
    .get(gameimageController.getAll)
    .post(gameimageController.create);

router
    .route("/:id")
    .get(gameimageController.getById)
    .put(gameimageController.updateById)
    .delete(gameimageController.deleteById);

module.exports = router;
