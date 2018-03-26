const express = require("express");
const router = express.Router();

const Poll = require("../dbmodels/poll");
const Comment = require("../dbmodels/comment")

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

    doc.answers.forEach((a, i) => {
      if(a.answer === req.body.choice){
        doc.answers[i].score++;
      }
    });

    doc.save();
  });
});

router.post("/comment", (req, res, next) => {
  Comment.findOne({pollid: req.body.pollid}, (err, doc) => {
    if(err) throw err;

    if(doc){
      let comment = {
        'username': req.body.un,
        'comment': req.body.comment
      }
      doc.comments.push(comment);
      doc.save();
      res.sendStatus(200);
    } else {
      let comment = new Comment({
        'pollid': req.body.pollid,
        'comments': [{
          'username': req.body.un,
          'comment': req.body.comment
        }]
      });
      comment.save();
      res.sendStatus(200);
    }
  });
});

router.get("/getComments", (req, res, next) => {
  Comment.findOne({pollid: req.query.pollid}, (err, doc) => {
    if(err) throw err;
    res.send(doc);
  });
});

module.exports = router;
