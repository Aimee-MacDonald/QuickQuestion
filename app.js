const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const csurf = require("csurf");

const User = require(__dirname + "/dbmodels/user");

const auth = require(__dirname + "/routes/auth");
const api = require(__dirname + "/routes/api");

mongoose.connect(process.env.DBURL);

app.set("views", __dirname + "/views");
app.set("view engine", "pug");
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(csurf());

app.use("/auth", auth);
app.use("/api", api);

app.get("/", (req, res) => {
  res.render("landing", {loginflag: req.isAuthenticated(), csrfToken: req.csrfToken()});
});

app.listen(process.env.PORT, () => console.log("Listening on Port: " + process.env.PORT));

passport.serializeUser(function(uid, done){
  done(null, uid);
});

passport.deserializeUser(function(uid, done){
  done(null, uid);
});
