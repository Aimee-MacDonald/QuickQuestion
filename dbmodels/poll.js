const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var schema = new Schema({
  pollid: {type: String, required: true},
  question: {type: String, required: true},
  answers: {type: Array, required: true}
});

module.exports = mongoose.model("Poll", schema);
