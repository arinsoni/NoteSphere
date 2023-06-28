const express = require("express");
const User = require("../models/User");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Notes = require("../models/Notes");
const uniqueString = require("../models/Token");
const crypto = require("crypto");
const sendEmail = require("../sendEmails");

// REGISTER
const register = async (req, res) => {
  let success = false;
  try {
    const { name, lastName, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({
          success,
          error: "Sorry! A user with same email address already exist",
        });
    }

    const newUser = new User({
      name,
      lastName,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    const secret = await new uniqueString({
      userId: newUser._id,
      eToken: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.BASE_URL}auth/${newUser._id}/verify/${secret.eToken}`;
    await sendEmail(newUser.email, "Verify Email", url);
    success = true;
    res.status(201).json({ success, savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//LOGIN
const login = async (req, res) => {
  let success = false;
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("login: " + user )
    if (!user) {
      return res
        .status(400)
        .json({ message: "User doesn't exist" });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return res
        .status(400)
        .json({ message: "Please try to login with correct credentials" });
    }
    
    
    if (!user.verified) {
      console.log("False hai")
      return res
        .status(400)
        .send({ message: "An Email sent to your account please verify" });
    }
    

    const data = {
      user: {
        id: user.id,
      },
    };
    const token = JWT.sign(data, process.env.JWT_SECRET);
    delete user.password;
    success = true;
    // let secret = await uniqueString.findOne({ userId: user._id });

    res.status(200).json({ success, token, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET USER
const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//Delete A User

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { accDeletePassword } = req.body;
    const user = await User.findById(req.user.id);
    console.log("acc deketion" + accDeletePassword)
    if (!user) {
      return res
        .status(400)
        .json({ message: "No user find" });
    }

    
    const isCorrect = await bcrypt.compare(accDeletePassword, user.password);
    if (!isCorrect) {
      return res
        .status(400)
        .json({ message: "Your password is incorrect" });
    }
    await Notes.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const checkuserstatus = async (req, res) => {
  try {
    // Retrieve the user from the database based on the token
    const user = await User.findById(req.user.id);
    if (user) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// resetpass

const generateOTP = () => {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false });
    }

    // const resetToken = crypto.randomBytes(20).toString("hex");
    // user.resetPasswordToken = resetToken;
    // await user.save();
    const otp = generateOTP(); // Generate the OTP (implement this function)
    user.resetPasswordOTP = otp; // Store the OTP in the user document
    await user.save();

    // const url = `${process.env.BASE_URL}auth/reset-password/${resetToken}`;
    await sendEmail(user.email, "Token Reset", otp);
    res
      .status(200)
      .json({ success: true, message: "Password reset request sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// forgot password
const requestForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false });
    }

    const createPasswordToken = crypto.randomBytes(20).toString("hex");
    user.requestForgotPassword = createPasswordToken;
    await user.save();
    const url = `${process.env.BASE_URL}auth/create-password/${createPasswordToken}`;
    await sendEmail(user.email, "Change password", url);
    res
      .status(200)
      .json({ success: true, message: "Change password req has been sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//update mail id
const updateMail = async (req, res) => {
  let success = false;
  try {
    const { oldMailId, newMailId } = req.body;

    const user = await User.findOne({ email: oldMailId });
    if(!user){
      return res
        .status(400)
        .json({ message: "No User found with this Mail-Id" })
    }

    user.email = newMailId;
    await user.save();
    success = true;
    return res
      .status(200)
      .json({ message: "E-mail Id updated Successfully", success })

  } catch (error) {
    console.log(error)
    res 
      .status(400)
      .json({ message: error.message })
  }
}

module.exports = {
  register,
  login,
  getUser,
  deleteUser,
  checkuserstatus,
  requestPasswordReset,
  requestForgotPassword,
  updateMail
};
