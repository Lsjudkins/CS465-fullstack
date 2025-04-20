require('../models/user');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: ''
    });

    // Set hashed password
    user.setPassword(req.body.password);

    try {
        const savedUser = await user.save();
        const token = savedUser.generateJWT();
        return res.status(200).json({ token });
    } catch (err) {
        return res.status(400).json(err);
    }
};

const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res
            .status(404)
            .json(err);
        }

        if (user) {
            const token = user.generateJWT();
            res
                .status(200)
                .json({ token });
        } else {
            res.status(401).json(info);
        }
    })(req, res);
};

module.exports = {
    register,
    login
};
