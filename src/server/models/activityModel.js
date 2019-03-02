var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var activitySchema = new Schema({
  name: String,
  salle: String,
  beginAt: String,
  endAt: String,
  date: String
});

module.exports = mongoose.model("activity", activitySchema);
