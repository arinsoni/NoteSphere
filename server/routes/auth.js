const express = require('express');
const { login, register, getUser, deleteUser } = require('../controllers/auth');
const verifyToken = require('../middleware/auth')


const router = express.Router();

router.use("/login", login);
router.use("/register", register);
router.use("/getuser", verifyToken, getUser);
router.delete('/deleteUser', verifyToken, deleteUser);

module.exports = router;
