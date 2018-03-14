const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const User = require(__dirname + "/dbmodels/user");

const auth = require(__dirname + "/routes/auth");

mongoose.connect(process.env.DBURL);

app.set("views", __dirname + "/views");
app.set("view engine", "pug");
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/auth", auth);

app.get("/", (req, res) => {
  res.render("landing");
});

app.listen(process.env.PORT, () => console.log("Listening on Port: " + process.env.PORT));
