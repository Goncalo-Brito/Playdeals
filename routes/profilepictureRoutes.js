const express = require("express");
const profilepictureController = require("../controllers/profilepictureController");

const router = express.Router();

router
    .route("/")
    .get(profilepictureController.getAll)
    .post(profilepictureController.create);

router
    .route("/:id")
    .get(profilepictureController.getById)
    .put(profilepictureController.updateById)
    .delete(profilepictureController.deleteById);

module.exports = router;