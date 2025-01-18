const express = require("express");
const dlcController = require("../controllers/dlcController");

const router = express.Router();

router
    .route("/")
    .get(dlcController.getAll)
    .post(dlcController.create);

router
    .route("/:id")
    .get(dlcController.getById)
    .put(dlcController.updateById)
    .delete(dlcController.deleteById);

module.exports = router;
