const express = require('express');
const { login, register, getUser, deleteUser, checkuserutatus, requestPasswordReset } = require('../controllers/auth');
const verifyToken = require('../middleware/auth');




const router = express.Router();

router.use("/login", login);
router.use("/register", register);
router.use("/getuser", verifyToken, getUser);
router.delete('/deleteuser', verifyToken, deleteUser);
router.use('/checkuserutatus', verifyToken, checkuserutatus);
router.use('/reset-password', verifyToken, requestPasswordReset);




module.exports = router;
