require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
//==============================================================
// loging
router.post("/login", async (req, res) => {
	try {
		const user1 = await User.findOne({ email: req.body.email }).exec();
		if (user1 === null) {
			return res.status(401).send("cant find user name");
		}
		if (await bcrypt.compare(req.body.password, user1.password)) {
			//=====================
			const truser = { name: user1.name };
			const accessToken = jwt.sign(truser, process.env.ACCESS_TOKEN);
			res.json({ accessToken: accessToken });
			//==================================
		} else {
			res.send("wrong password");
		}
	} catch (err) {
		res.status(500).send("err" + err);
	}
});

//==========================================================================
//create one
router.post("/", async (req, res) => {
	try {
		const hashPass = await bcrypt.hash(req.body.password, 10);
		//======================
		const users = new User({
			name: req.body.name,
			email: req.body.email,
			password: hashPass,
			hardware: req.body.hardware,
			software: req.body.software,
		});
		//console.log("pass= " + req.body.password);
		//console.log("hashpass= " + hashPass);

		//=====================
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

function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split("")[1];
	if (token == null) {
		return res.sendStatus(401);
	}
	jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
}
//=====================================

module.exports = router;
