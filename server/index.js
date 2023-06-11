const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
var cors = require('cors');
const User = require('./models/User');
const verifyToken = require('./middleware/auth');
const uniqueString = require('./models/Token')


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
  

//MongoDB setup
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {
    app.listen(PORT, ()=> console.log(`Server PORT ${PORT}`)) 
}).catch((err) => {
    console.log(`${err}: did not connect`)
})

