const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
var cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcrypt');


dotenv.config();

const PORT = process.env.PORT || 6001
const app = express();
app.use(express.json()); // parses incoming data (instructions and informations) coming from request.body
app.use(cors())
//Routes
app.use("/auth", authRoutes)

app.use("/notes", notesRoutes)

app.post("/auth/resetPassword", async (req, res) => {
	// const { resetToken } = req.params;
	const { confirmPassword, password, otp, email } = req.body;

	try {
		
		// Find the user with the provided reset token
		
		const user = await User.findOne({
			email: email,
		});
		const isCorrect = await bcrypt.compare(password, user.password);
		if (user.resetPasswordOTP !== otp){
			return res.status(400).json({ message: "Sorry your OTP is wrong" });
		}
        if (!isCorrect) {
            return res.status(400).json({ message: "Sorry your password is incorrect" });
        }
		// console.log(`user before : ${user}`)
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Invalid or expired reset token",
			});
		}
		// Update the user's password
		const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(confirmPassword, salt);
		user.password = passwordHash;
		user.resetPasswordToken = undefined;
		// console.log(`user after : ${user}`)
		await user.save();
		return res.json({
			success: true,
			message: "Password reset successfully",
		});
	} catch (error) {
		// console.log(error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
});
app.post("/auth/createPassword/:createPasswordToken", async (req, res) => {
	const { createPasswordToken } = req.params;
	const { password } = req.body;

	try {
		
		// Find the user with the provided reset token
		const user = await User.findOne({
			requestForgotPassword: createPasswordToken,

		});
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Invalid or expired reset token",
			});
		}
		// Update the user's password
		const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
		user.password = passwordHash;
		user.requestForgotPassword = undefined;
		// console.log(`user after : ${user}`)
		await user.save();
		return res.json({
			success: true,
			message: "Password reset successfully",
		});
	} catch (error) {
		// console.log(error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
});

//MongoDB setup
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true

}).then(() => {
	app.listen(PORT, () => console.log(`Server PORT ${PORT}`))
}).catch((err) => {
	// console.log(`${err}: did not connect`)
})

module.exports = app;