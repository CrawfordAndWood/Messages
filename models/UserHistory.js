const mongoose = require("mongoose");

const UserHistorySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  userRole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = UserHistory = mongoose.model("userHistory", UserHistorySchema);
