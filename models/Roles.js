const mongoose = require("mongoose");

const RolesSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = Roles = mongoose.model("role", RolesSchema);
