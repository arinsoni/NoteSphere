const express = require('express');
const { login, register } = require('../controllers/auth');


const router = express.Router();

router.use("/login", login);
router.use("/register", register);

module.exports = router;
