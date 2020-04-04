const mongoose = require("mongoose");

const RolesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = Roles = mongoose.model("roles", RolesSchema);
