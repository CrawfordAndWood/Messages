const mongoose = require("mongoose");

const AreaHistorySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "area",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = AreaHistory = mongoose.model("areaHistory", AreaHistorySchema);
