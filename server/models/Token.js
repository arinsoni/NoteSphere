const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "User",
		unique: true,
	},
	eToken: { type: String, required: true },
	createdAt: { type: Date, default: Date.now,  },
});

const uniqueString = mongoose.model('uniqueString', tokenSchema);

module.exports = uniqueString;

