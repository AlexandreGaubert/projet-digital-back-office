var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var menuDaySchema = new Schema({
  plat_1: String,
  plat_2: String,
  plat_3: String,
  entree_1: String,
  entree_2: String,
  legumes: String,
  plateau_1: String,
  plateau_2: String
})

var menuSchema = new Schema({
  from: String,
  to: String,
  lundi: menuDaySchema,
  mardi: menuDaySchema,
  mercredi: menuDaySchema,
  jeudi: menuDaySchema,
  vendredi: menuDaySchema,
});

module.exports = mongoose.model("menu", menuSchema);
