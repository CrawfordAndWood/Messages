const mongoose = require("mongoose");

const HouseholdHistorySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  household: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "household",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = HouseholdHistory = mongoose.model(
  "householdHistory",
  HouseholdHistorySchema
);
