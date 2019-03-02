var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var avisSchema = new Schema({
  resident: String,
  type: String,
  messages: [
    {from: String, content: String}
  ],
  solved: Boolean,
  date: String
});

module.exports = mongoose.model("avis", avisSchema);
