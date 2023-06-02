const express = require('express');
const { login, register, getUser } = require('../controllers/auth');
const verifyToken = require('../middleware/auth')


const router = express.Router();

router.use("/login", login);
router.use("/register", register);
router.use("/getuser", verifyToken, getUser);

module.exports = router;
