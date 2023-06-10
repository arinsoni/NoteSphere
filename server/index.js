const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
var cors = require('cors');
const User = require('./models/User');
const verifyToken = require('./middleware/auth');

dotenv.config();

const PORT = process.env.PORT || 6001
const app = express();
app.use(express.json()); // parses incoming data (instructions and informations) coming from request.body
app.use(cors())
//Routes
app.use("/auth", authRoutes)
app.use("/notes", notesRoutes)




//MongoDB setup
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {
    app.listen(PORT, ()=> console.log(`Server PORT ${PORT}`)) 
}).catch((err) => {
    console.log(`${err}: did not connect`)
})

