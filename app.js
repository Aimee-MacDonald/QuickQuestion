const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const csurf = require("csurf");

const User = require(__dirname + "/dbmodels/user");
const Poll = require(__dirname + "/dbmodels/poll")

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
  res.render("landing", {csrfToken: req.csrfToken()});
  /*
  if(req.query.pollid){
    Poll.find({pollid: req.query.pollid}, (err, docs) => {
      if(err) throw err;

      if(docs.length > 0){
        p = JSON.stringify({
          "pollid": req.query.pollid,
          "question": docs[0].question,
          "answers": docs[0].answers
        });

        if(req.isAuthenticated()){
          res.render("loggedin", {csrfToken: req.csrfToken(), poll: p});
        } else {
          res.render("landing", {csrfToken: req.csrfToken(), poll: p});
        }
      } else {
        if(req.isAuthenticated()){
          res.render("loggedin", {csrfToken: req.csrfToken()});
        } else {
          res.render("landing", {csrfToken: req.csrfToken()});
        }
      }
    });
  } else {
    if(req.isAuthenticated()){
      res.render("loggedin", {csrfToken: req.csrfToken()});
    } else {
      res.render("landing", {csrfToken: req.csrfToken()});
    }
  }
  */
});

app.listen(process.env.PORT, () => console.log("Listening on Port: " + process.env.PORT));

passport.serializeUser(function(uid, done){
  done(null, uid);
});

passport.deserializeUser(function(uid, done){
  done(null, uid);
});
