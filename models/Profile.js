const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  role: {
    type: String
  },
  region: {
    type: String
  },
  assignedHouseholds: [
    {
      address: { type: String }
    }
  ]
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
