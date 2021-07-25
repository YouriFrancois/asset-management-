require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// data base
//==============================================================
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connect to database "));
//==============================================================
app.use(express.json());
//Routes
//==================================================
const usersRouter = require("./router/users");
app.use("/users",usersRouter);

//==================================================

app.listen(3000, () => console.log("sever start at port 3000"));
