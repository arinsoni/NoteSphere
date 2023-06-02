const express = require('express');
const User = require('../models/User');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
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
        if(user){
            return res.status(400).json({error: "Sorry! A user with same email address already exist"  })
        }

        const newUser = new User ({
            firstName, 
            lastName, 
            email, 
            password: passwordHash
        });

        const savedUser = await newUser.save();
        res.status(201).json({ savedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const {
            email, 
            password
        } = req.body;
    
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
              id: user.id
            }
          }
        const token = JWT.sign(data, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (error) {
       res.status(500).json({ message: error.message });
    }
}

module.exports = {
    register,
    login
};
