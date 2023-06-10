const express = require('express');
const User = require('../models/User');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Notes = require('../models/Notes');

// REGISTER
const register = async (req, res) => {
    let success = false;
    try {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success, error: "Sorry! A user with same email address already exist" })
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            verified : true
        });

        const savedUser = await newUser.save();
        success = true
        res.status(201).json({ success, savedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//LOGIN
const login = async (req, res) => {
    let success = false;
    try {
        const {
            email,
            password
        } = req.body;


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials email" });
        }
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            return res.status(400).json({ error: "Please try to login with correct credentials pass" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const token = JWT.sign(data, process.env.JWT_SECRET);
        delete user.password;
        success = true
        res.status(200).json({ success, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//GET USER
const getUser = async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.status(201).json(user)

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}


//Delete A User

const deleteUser = async (req, res) => {
    try {
      const userId = req.user.id;
      await Notes.deleteMany({ user: userId });
      await User.findByIdAndDelete(userId);
      res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
module.exports = {
    register,
    login,
    getUser,
    deleteUser
};
