const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
var cors = require('cors');
const User = require('./models/User');
const verifyToken = require('./middleware/auth');
const uniqueString = require('./models/Token')
const bcrypt = require('bcrypt');


dotenv.config();

const PORT = process.env.PORT || 6001
const app = express();
app.use(express.json()); // parses incoming data (instructions and informations) coming from request.body
app.use(cors())
//Routes
app.use("/auth", authRoutes)

app.use("/notes", notesRoutes)


app.get("/auth/:id/verify/:token", async (req, res) => {
	console.log("Inside register function");

	// Log the request URL or any unique identifier
	console.log("Request URL:", req.url);

	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const secret = await uniqueString.findOne({
			userId: user._id,
			eToken: req.params.token,
		});

		console.log("Secret:", secret);

		//   if (!secret) {
		// 	return res.status(400).json({ error: "Invalid link" });
		//   }

		console.log(`before: ${user.verified}`);
		await User.updateOne({ _id: user._id, verified: true });
		await user.save();
		console.log(`after: ${user.verified}`);

		if (secret) {
			await uniqueString.deleteOne({ _id: secret._id });
		}

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});



app.post("/auth/resetPassword/:resetToken", async (req, res) => {
	const { resetToken } = req.params;
	const { confirmPassword } = req.body;

	try {
		
		// Find the user with the provided reset token
		const user = await User.findOne({
			resetPasswordToken: resetToken,

		});
		console.log(`user before : ${user}`)
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
		console.log(`user after : ${user}`)
		await user.save();
		return res.json({
			success: true,
			message: "Password reset successfully",
		});
	} catch (error) {
		console.log(error);
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
	console.log(`${err}: did not connect`)
})

