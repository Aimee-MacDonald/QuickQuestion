const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../dbmodels/user");

router.post("/register", function(req, res, next){
  User.find({email: req.body.em}, (err, docs) => {
    if(err) throw err;

    if(docs.length > 0){
      console.log("User Already Exists");
      res.redirect("/");
    } else {
      var user = new User({
        email: req.body.em,
        password: req.body.pw
      });

      user.save(err => {
        if(err) throw err;

        User.find({email: req.body.em}, (err, docs) => {
          if(err) throw err;

          if(docs.length > 0)
            req.login(docs[0].password, (err, resp) => {if(err) throw err});

          res.redirect("/");
        });
      });
    }
  });
});

router.post("/login", function(req, res, next){
  User.find({email: req.body.em}, (err, docs) => {
    if(err) throw err;

    if(docs.length > 0){
      bcrypt.compare(req.body.pw, docs[0].password, (err, resp) => {
        if(err) throw err;

        if(resp){
          req.login(docs[0]._id, err => {if(err) throw err});
          res.redirect("/");
        } else {
          res.redirect("/");
        }
      });
    } else {
      res.redirect("/");
    }
  });
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
