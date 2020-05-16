const VolunteerHistory = require("../models/UserHistory");
const User = require("../models/User");

//TODO this is bollocks fix

class VolunteerHistoryService {
  constructor() {}
  /*Count Volunteer History */
  async countVolunteerHistoryItems(term = null) {
    try {
      if (term === null) {
        const volunteerHistoryCount = await VolunteerHistory.countDocuments();
        return volunteerHistoryCount;
      }
      const regTerm = new RegExp(term, "i");
      let volunteerIds = await User.find({ name: regTerm }).select("_id");
      let volunteerHistoryCount = await VolunteerHistory.countDocuments({
        $or: [
          { description: regTerm },
          { updatedBy: { $in: volunteerIds } },
          { volunteer: { $in: volunteerIds } },
        ],
      });
      return volunteerHistoryCount;
    } catch (error) {
      console.log(error.message);
    }
  }

  /*Get Volunteer History*/
  async getVolunteerHistory(params) {
    try {
      if (params.term === undefined) {
        let volunteerHistory = await VolunteerHistory.find()
          .populate("updatedBy", ["name"])
          .sort("-date")
          .skip(Number(params.page - 1) * Number(params.limit))
          .limit(Number(params.limit));

        return volunteerHistory;
      }
      let term = new RegExp(params.term, "i");
      //get the ids of the volunteers matching the search term
      let volunteerIds = await Volunteer.find({ name: term }).select("_id");
      let volunteerHistory = await VolunteerHistory.find({
        $or: [
          { description: term },
          { updatedBy: { $in: volunteerIds } },
          { volunteer: { $in: volunteerIds } },
        ],
      })
        .populate("volunteer", ["name"])
        .populate("updatedBy", ["name"])
        .skip(Number(params.page - 1) * Number(params.limit))
        .limit(Number(params.limit));

      return volunteerHistory;
    } catch (error) {
      console.log(error.message);
    }
  }

  /* Post Volunteer History */
  async addVolunteerHistory(historyArgs) {
    let history = new VolunteerHistory(historyArgs);
    await history.save();
    return history;
  }
}

module.exports = VolunteerHistoryService;
