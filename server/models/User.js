const express = require('express');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  
    lastName: {
        type: String,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        unique: true
    },
    password:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    }, 
);

const User = mongoose.model("User", userSchema);
module.exports = User;