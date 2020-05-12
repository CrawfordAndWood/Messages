const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//a basket of goods goes to one household
//a basket of goods is delivered by a user
const AreaSchema = new Schema({
  code: {
    type: String,
  },
  name: {
    type: String,
  },
  postcodes: [String],
});

module.exports = Area = mongoose.model("area", AreaSchema);
