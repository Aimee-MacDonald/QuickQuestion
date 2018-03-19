const express = require("express");
const router = express.Router();

const Poll = require("../dbmodels/poll");

router.post("/new", (req, res, next) => {
  let poll = new Poll({
    question: req.body.question,
    answers: req.body.answers
  });

  poll.save(err => {
    if(err) throw err;
  });

  res.redirect("/");
});

module.exports = router;
