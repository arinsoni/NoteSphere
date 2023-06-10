const express = require('express');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    verified: {
        type: String,
        default: false
    }
},
);

const User = mongoose.model("User", userSchema);
module.exports = User;