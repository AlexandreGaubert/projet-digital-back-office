var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var residentSchema = new Schema({
  firstname: String,
  lastname: String,
  photo: String,
  room: String,
  gender: String
});

module.exports = mongoose.model("resident", residentSchema);
