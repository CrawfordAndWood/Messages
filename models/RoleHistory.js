const mongoose = require("mongoose");

const RoleHistorySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = RoleHistory = mongoose.model("roleHistory", RoleHistorySchema);
