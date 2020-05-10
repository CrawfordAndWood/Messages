const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const householdSchema = new Schema({
  areaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "area",
  },
  house: {
    type: String,
  },
  street: {
    type: String,
  },
  postcode: {
    type: String,
  },
  occupants: {
    type: Number,
  },
  needs: {
    type: String,
  },
  volunteersCovered: {
    type: Number,
  },
  lastVisit: {
    type: String,
  },
  nextVisit: {
    type: Date,
  },
  lastVisitCoveredNeeds: {
    type: Boolean,
  },
  needsCoveredProportion: {
    type: Number,
  },
});

module.exports = household = mongoose.model("household", householdSchema);
