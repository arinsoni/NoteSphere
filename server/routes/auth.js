const express = require("express");
const {
  login,
  getUser,
  deleteUser,
  checkuserstatus,
  requestPasswordReset,
  requestForgotPassword,
  updateMail,
  info,
  registerOTP,
  registerVerification,
  resendOTP
} = require("../controllers/auth");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.use("/login", login);
router.use("/register-otp", registerOTP);
router.use("/register-verification", registerVerification);
router.use("/register-resend-otp", resendOTP);

router.use("/getuser", verifyToken, getUser);
router.delete("/deleteuser", verifyToken, deleteUser);
router.use("/checkuserstatus", verifyToken, checkuserstatus);
router.use("/reset-password", verifyToken, requestPasswordReset);
router.use("/forgot-password", requestForgotPassword);
router.use("/update-mail", verifyToken, updateMail);
router.use("/info", verifyToken, info);


module.exports = router;
