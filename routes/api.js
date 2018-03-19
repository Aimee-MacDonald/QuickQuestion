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

router.get("/getRandom", (req, res, next) => {
  Poll.count().exec((err, count) => {
    if(err) throw err;

    let r = Math.floor(Math.random() * count);

    Poll.findOne().skip(r).exec((err, result) => {
      if(err) throw err;

      res.send(result);
    });
  });
});

module.exports = router;
