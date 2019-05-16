var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
  section: String,
  poste: String,
  firstname: String,
  lastname: String,
  photo: String
});

module.exports = mongoose.model("employee", employeeSchema);
