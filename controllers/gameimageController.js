const GameImage = require("../models/GameImage");

exports.getAll = async (req, res, next) => {
    try {
        const [GameImages, _] = await GameImage.getAll();
        res.status(200).json({ gameimages: GameImages });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

exports.getById = async (req, res, next) => {
    try {
        const [[game, _]] = await GameImage.getById(req.params.id);
        res.render("staffpage", { game });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[game, _]] = await GameImage.getById(req.params.id);
        res.render("adddlcpage", { game });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[game, _]] = await GameImage.getById(req.params.id);
        res.render("updatedlcpage", { game });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[game, _]] = await GameImage.getById(req.params.id);
        res.render("homepage", { game });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[game, _]] = await GameImage.getById(req.params.id);
        res.render("gamepage", { game });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[game, _]] = await GameImage.getById(req.params.id);
        res.render("cartpage", { game });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[game, _]] = await GameImage.getById(req.params.id);
        res.render("profile", { game });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[game, _]] = await GameImage.getById(req.params.id);
        res.render("dlcpage", { game });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.create = async (req, res, next) => {
    let { imageextention, imagesource, imagename, gameID } = req.body;

    let gameimage = new gameimage(imageextention, imagesource, imagename, gameID);

    gameimage = await GameImage.create();

    res.send("Image created: " + gameimage);
}

exports.updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const [result] = await GameImage.updateById(id, updatedData);
        res.send("Image updated: " + gameimage);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await GameImage.deleteById(id);
    } catch (error) {
        console.error(error);
        next(error);
    }
};