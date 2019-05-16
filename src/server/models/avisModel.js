var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var avisSchema = new Schema({
  resident: Object,
  type: String,
  messages: [
    {from: String, content: String}
  ],
  solved: Boolean,
  date: String,
  newMessageFromFoyer: Number,
  newMessageFromResident: Number
});

module.exports = mongoose.model("avis", avisSchema);
