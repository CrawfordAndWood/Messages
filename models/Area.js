const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AreaSchema = new Schema({
  code: {
    type: String,
  },
  name: {
    type: String,
  },
  postcodes: [String],
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = Area = mongoose.model("area", AreaSchema);
