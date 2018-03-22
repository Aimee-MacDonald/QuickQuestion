const express = require("express");
const router = express.Router();

const Poll = require("../dbmodels/poll");

router.post("/new", (req, res, next) => {
  Poll.count().exec((err, count) => {
    if(err) throw err;

    let poll = new Poll({
      'pollid': count,
      'question': req.body.question,
      'answers': [],
      'total': 0
    });

    req.body.answers.forEach(i => {
      poll.answers.push({
        'answer': i,
        'score': 0
      });
    });

    poll.save(err => {
      if(err) throw err;
    });
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

router.post("/vote", (req, res, next) => {
  Poll.findOne({pollid: req.body.pollid}, (err, doc) => {
    if(err) throw err;
    doc.total++;
    doc.answers[0].score++;
    doc.save();
  });
});

module.exports = router;
