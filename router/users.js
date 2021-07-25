const express = require("express");
const users = require("../models/users");
const router = express.Router();
const User = require("../models/users");
//==========================================================================
// get all

router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ mesage: err.message });
	}
});
//==========================================================================
//get one
router.get("/:id", getUser, (req, res) => {
	res.json(res.user);
});
//==========================================================================
//create one
router.post("/", async (req, res) => {
	const users = new User({
		name: req.body.name,
		email: req.body.email,
		hardware: req.body.hardware,
		software: req.body.software,
	});
	try {
		const newUser = await users.save();
		res.status(201).json(newUser);
	} catch (err) {
		res.status(401).json({ mesage: err.mesage });
	}
});
//==========================================================================
//==========================================================================
//update one
router.patch("/:id", (req, res) => {});
//==========================================================================
//==========================================================================
//delete one
router.delete("/:id", getUser, async (req, res) => {
	try {
		await res.user.remove();
		res.json({ message: "remove" });
	} catch (err) {
		res.status(501).json({ mesage: err.mesage });
	}
});
//==========================================================================

async function getUser(req, res, next) {
	let users;
	try {
		users = await User.findById(req.params.id);
		if (users == null) {
			return res.status(404).json({ messasge: "cannot find user 111" });
		}
	} catch (err) {
		return res.status(504).json({ messasge: "cannot find user  22" });
	}
	res.user = users;
	next();
}
//=====================================

module.exports = router;
