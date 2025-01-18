const express = require("express");
const commentslogController = require("../controllers/commentslogController");

const router = express.Router();

router
    .route("/")
    .post(commentslogController.create);

router
    .route("/:id")
    .get(commentslogController.getById)
    .put(commentslogController.updateById)
    .delete(commentslogController.deleteById);

module.exports = router;
