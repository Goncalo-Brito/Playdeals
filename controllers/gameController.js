const Game = require("../models/Game");

exports.getAll = async (req, res, next) => {
    try {
        const [Games, _] = await Game.getAll();
        res.status(200).json({ games: Games });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

exports.getById = async (req, res, next) => {
    try {
        const [[game, _]] = await Game.getById(req.params.id);
        res.render("staffpage", { game });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[game, _]] = await Game.getById(req.params.id);
        res.render("adddlcpage", { game });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[game, _]] = await Game.getById(req.params.id);
        res.render("updatedlcpage", { game });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[game, _]] = await Game.getById(req.params.id);
        res.render("gamepage", { game });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[game, _]] = await Game.getById(req.params.id);
        res.render("cartpage", { game });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[game, _]] = await Game.getById(req.params.id);
        res.render("profile", { game });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[game, _]] = await Game.getById(req.params.id);
        res.render("dlcpage", { game });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[game, _]] = await Game.getById(req.params.id);
        res.render("payment", { game });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.create = async (req, res, next) => {
    let { gamename, gamecompany, gameprice, gamereleasedate, gamePEGI, gameplatform, gamediscount, featuredgame, gamestatus, gamedescription } = req.body;

    let game = new Game(gamename, gamecompany, gameprice, gamereleasedate, gamePEGI, gameplatform, gamediscount, featuredgame, gamestatus, gamedescription);

    try {
        await game.create();
        res.send("Game created: " + gamename);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const [result] = await Game.updateById(id, updatedData);
        res.send("Game updated: " + game);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await Game.deleteById(id);
    } catch (error) {
        console.error(error);
        next(error);
    }
};