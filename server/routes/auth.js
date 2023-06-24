const express = require('express');
const { login, register, getUser, deleteUser, checkuserstatus, requestPasswordReset, requestForgotPassword } = require('../controllers/auth');
const verifyToken = require('../middleware/auth');




const router = express.Router();

router.use("/login", login);
router.use("/register", register);
router.use("/getuser", verifyToken, getUser);
router.delete('/deleteuser', verifyToken, deleteUser);
router.use('/checkuserstatus', verifyToken, checkuserstatus);
router.use('/reset-password', verifyToken, requestPasswordReset);
router.use('/forgot-password', requestForgotPassword);




module.exports = router;
