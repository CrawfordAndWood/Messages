const UserHistory = require("../models/UserHistory");
const User = require("../models/User");
const Role = require("../models/Roles");

class UserHistoryService {
  constructor() {}
  /*Count User History */
  async countUserHistoryItems(term = null) {
    try {
      if (term === null) {
        const userHistoryCount = await UserHistory.countDocuments();
        return userHistoryCount;
      }
      const regTerm = new RegExp(term, "i");
      let userIds = await User.find({ name: regTerm }).select("_id");
      let userHistoryCount = await UserHistory.countDocuments({
        $or: [
          { description: regTerm },
          { updatedBy: { $in: userIds } },
          { user: { $in: userIds } },
        ],
      });
      return userHistoryCount;
    } catch (error) {
      console.log(error.message);
    }
  }

  /*Get User History*/
  async getUserHistory(params) {
    try {
      if (params.term === undefined) {
        let userHistory = await UserHistory.find()
          .populate("user", ["name"])
          .populate("updatedBy", ["name"])
          .sort("-date")
          .skip(Number(params.page - 1) * Number(params.limit))
          .limit(Number(params.limit));

        return userHistory;
      }
      let term = new RegExp(params.term, "i");
      //get the ids of the users matching the search term
      let userIds = await User.find({ name: term }).select("_id");
      let userHistory = await UserHistory.find({
        $or: [
          { description: term },
          { updatedBy: { $in: userIds } },
          { user: { $in: userIds } },
        ],
      })
        .populate("user", ["name"])
        .populate("updatedBy", ["name"])
        .skip(Number(params.page - 1) * Number(params.limit))
        .limit(Number(params.limit));

      return userHistory;
    } catch (error) {
      console.log(error.message);
    }
  }

  /* Post User History */
  async addUserHistory(historyArgs) {
    let history = new UserHistory(historyArgs);
    await history.save();
    return history;
  }
}

module.exports = UserHistoryService;
