const mongoose = require("mongoose");

// create a schema for data base
//==========================================
const userSchema = new mongoose.Schema({
	name: { type: String, require: true },
	email: { type: String, require: true },
	password: { type: String, require: true },
	hardware: { type: String },
	software: { type: String },
});

module.exports = mongoose.model("User", userSchema);
