const HouseholdHistory = require("../models/HouseholdHistory");
const Household = require("../models/Household");
const Role = require("../models/Roles");

class HouseholdHistoryService {
  constructor() {}
  /*Count Household History */
  async countHouseholdHistoryItems(term = null) {
    try {
      if (term === null) {
        const householdHistoryCount = await HouseholdHistory.countDocuments();
        return householdHistoryCount;
      }
      const regTerm = new RegExp(term, "i");
      let householdIds = await Household.find({ name: regTerm }).select("_id");
      let householdHistoryCount = await HouseholdHistory.countDocuments({
        $or: [
          { description: regTerm },
          { updatedBy: { $in: householdIds } },
          { household: { $in: householdIds } },
        ],
      });
      return householdHistoryCount;
    } catch (error) {
      console.log(error.message);
    }
  }

  /*Get Household History*/
  async getHouseholdHistory(params) {
    try {
      if (params.term === undefined) {
        let householdHistory = await HouseholdHistory.find()
          .populate("updatedBy", ["name"])
          .sort("-date")
          .skip(Number(params.page - 1) * Number(params.limit))
          .limit(Number(params.limit));

        return householdHistory;
      }
      let term = new RegExp(params.term, "i");
      //get the ids of the households matching the search term
      let householdIds = await Household.find({ name: term }).select("_id");
      let householdHistory = await HouseholdHistory.find({
        $or: [
          { description: term },
          { updatedBy: { $in: householdIds } },
          { household: { $in: householdIds } },
        ],
      })
        .populate("household", ["name"])
        .populate("updatedBy", ["name"])
        .skip(Number(params.page - 1) * Number(params.limit))
        .limit(Number(params.limit));

      return householdHistory;
    } catch (error) {
      console.log(error.message);
    }
  }

  /* Post Household History */
  async addHouseholdHistory(historyArgs) {
    let history = new HouseholdHistory(historyArgs);
    await history.save();
    return history;
  }
}

module.exports = HouseholdHistoryService;
