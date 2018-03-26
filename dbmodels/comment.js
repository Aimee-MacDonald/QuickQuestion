const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var schema = new Schema({
  pollid: {type: Number, required: true},
  comments: [{
    username: {type: String, required: true},
    comment: {type: String, required: true}
  }]
});

module.exports = mongoose.model("Comment", schema);
