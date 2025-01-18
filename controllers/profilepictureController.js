const ProfilePicture = require("../models/ProfilePicture");

exports.getAll = async (req, res, next) => {
    try {
        const [ProfilePictures, _] = await ProfilePicture.getAll();
        res.render("staffpage", { ProfilePictures });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[profilepicture, _]] = await ProfilePicture.getById(req.params.id);
        res.render("profilepage", { profilepicture });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[profilepicture, _]] = await ProfilePicture.getById(req.params.id);
        res.render("settings", { profilepicture });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[profilepicture, _]] = await ProfilePicture.getById(req.params.id);
        res.render("auctionspage", { profilepicture });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.create = async (req, res, next) => {
    let { pfpextention, pfpsource, pfpname, gameID } = req.body;

    let profilepicture = new profilepicture(pfpextention, pfpsource, pfpname, gameID);

    profilepicture = await ProfilePicture.create();

    res.send("Profile Picture created: " + profilepicture);
}

exports.updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const [result] = await ProfilePicture.updateById(id, updatedData);
        res.send("Profile Picture updated: " + profilepicture);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await ProfilePicture.deleteById(id);
    } catch (error) {
        console.error(error);
        next(error);
    }
};