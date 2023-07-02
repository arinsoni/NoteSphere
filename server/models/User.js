const express = require('express');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  bio: {
    type: String,
    min: 10,
    max: 100
  },
  name: {
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
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: false
  },
  isRegistered: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  requestForgotPassword: String,
  resetPasswordOTP: String,
  registerOTP: String
});

userSchema.pre('remove', async function(next) {
  const userId = this._id;
  
  try {
    // Delete all notes associated with the user
    await mongoose.model('Note').deleteMany({ user: userId });
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
