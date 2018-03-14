const express = require("express");
const router = express.Router();

const User = require("../dbmodels/user");

router.post("/register", function(req, res, next){
  var user = new User({
    email: req.body.em,
    password: req.body.pw
  });

  user.save(err => {
    if(err) throw err;

    res.redirect("/");
  });
});



router.post("/login", function(req, res, next){
  console.log("Login!");
});

module.exports = router;
