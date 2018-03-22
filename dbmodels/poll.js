const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var schema = new Schema({
  pollid: {type: String, required: true},
  question: {type: String, required: true},
  answers: [
    {answer: {type: String, required: true},
    score: {type: Number, required: true}}
  ],
  total: {type: Number, required: true}
});

module.exports = mongoose.model("Poll", schema);
