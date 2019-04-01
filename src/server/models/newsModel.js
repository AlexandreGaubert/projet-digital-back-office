var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var newsSchema = new Schema({
  title: String,
  body: String,
  date: String,
  color: String
});

module.exports = mongoose.model("news", newsSchema);
