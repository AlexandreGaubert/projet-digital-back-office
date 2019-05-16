var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var sectionDescriptionSchema = new Schema({
  section: String,
  description: String
});

module.exports = mongoose.model("sectionDescription", sectionDescriptionSchema);
