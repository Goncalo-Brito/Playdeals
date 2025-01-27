const express = require("express");
const gameController = require("../controllers/gameController");

const router = express.Router();

router
    .route("/")
    .get(gameController.getAll)
    .post(gameController.create);

router
    .route("/:id")
    .get(gameController.getById)
    .put(gameController.updateById)
    .delete(gameController.deleteById);

module.exports = router;
