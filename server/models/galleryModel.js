var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var gallerySchema = new Schema({
  name: String,
  images: [String]
});

module.exports = mongoose.model("gallery", gallerySchema);
