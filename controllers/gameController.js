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
        const [result] = await Game.getById(req.params.id);
        const game = result[0];

        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }

        res.status(200).json({ game });
    } catch (error) {
        console.error("Error in getById:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.create = async (req, res, next) => {
    let { gamename, gamecompany, gameprice, gamereleasedate, gamePEGI, gameplatform, gamediscount, featuredgame, gamestatus, gamedescription } = req.body;

    let game = new Game(gamename, gamecompany, gameprice, gamereleasedate, gamePEGI, gameplatform, gamediscount, featuredgame, gamestatus, gamedescription);

    try {
        await game.create();
        res.status(201).json({ message: "Game created successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating Game.");
        next(error);
    }
};

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

        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const [result] = await Game.deleteById(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Game not found' });
        }

        res.status(200).json({ message: 'Game deleted successfully' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};


