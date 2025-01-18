const User = require("../models/User");

exports.getAll = async (req, res, next) => {
    try {
        const [users, _] = await User.getAll();
        res.render("staffpage", { users });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const [[user, _]] = await User.getById(req.params.id);
        res.render("profilepage", { user });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;  
        const [[user, _]] = await User.getLogin(username, password);
        if (user) {
            res.json({ user }); 
        } else {
            res.status(404).json({ message: "User not found" }); 
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.create = async (req, res, next) => {
    let { username, fname, lname, email, pass, creationdate, usertype } = req.body;

    let user = new user(username, fname, lname, email, pass, creationdate, usertype);

    user = await User.create();

    res.send("User created: " + user);
}

exports.updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const [result] = await User.updateById(id, updatedData);
        res.send("User updated: " + user);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await User.deleteById(id);
    } catch (error) {
        console.error(error);
        next(error);
    }
};