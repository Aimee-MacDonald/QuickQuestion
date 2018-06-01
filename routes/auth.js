const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../dbmodels/user");

router.post("/register", function(req, res, next){
  User.find({email: req.body.email}, (err, docs) => {
    if(err) throw err;

    if(docs.length > 0){
      res.status(422).send("User Already Exists");
    } else {
      var user = new User({
        email: req.body.email,
        password: req.body.password
      });

      user.save(err => {
        if(err) throw err;

        User.find({email: req.body.email}, (err, docs) => {
          if(err) throw err;

          if(docs.length > 0)
            req.login(docs[0].password, (err, resp) => {if(err) throw err});

          res.status(200).send("User Registered");
        });
      });
    }
  });
});

router.post("/login", function(req, res, next){
  User.find({email: req.body.email}, (err, docs) => {
    if(err) throw err;

    if(docs.length > 0){
      bcrypt.compare(req.body.password, docs[0].password, (err, resp) => {
        if(err) throw err;

        if(resp){
          req.login(docs[0]._id, err => {if(err) throw err});
          res.status(200).send("User Logged In");
        } else {
          res.status(401).send("Wrong Credentials");
        }
      });
    } else {
      res.status(404).send("No Such User");
    }
  });
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

router.get("/login/twitter", passport.authenticate("twitter"));

router.get('/login/twitter/return',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
