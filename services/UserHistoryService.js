const UserHistory = require("../models/UserHistory");

class UserHistoryService {
  constructor() {}
  /*Count User History */
  async countUserHistoryItems(term = null) {
    if (term === null) {
      const userHistoryCount = await UserHistory.countDocuments();
      return userHistoryCount;
    }
    const regTerm = new RegExp(term, "i");
    //issue - I need to be able to get the user from the id. so the term also needs to search users by the search term
    //so I may just grab the user service
    //and add up the hits that come from that
    const userHistoryCount = await UserHistory.countDocuments({
      $or: [
        { description: regTerm },
        { updatedBy: regTerm },
        { user: regTerm },
      ],
    });
    return userHistoryCount;
  }

  /*Get User History*/
  async getUserHistory(params) {
    if (params.term === undefined) {
      let userHistory = await UserHistory.find()
        .populate("user", ["name"])
        .populate("updatedBy", ["name"])
        .skip(Number(params.page - 1) * Number(params.limit))
        .limit(Number(params.limit));
      console.log(userHistory);
      return userHistory;
    }
    let term = new RegExp(params.term, "i");
    let userHistory = await UserHistory.find({
      $or: [{ description: term }, { updatedBy: term }, { role: term }],
    })
      .populate("user", ["name"])
      .populate("updatedBy", ["name"])
      .skip(Number(params.page - 1) * Number(params.limit))
      .limit(Number(params.limit));
    return userHistory;
  }

  /* Post User History */
  async addUserHistory(historyArgs) {
    console.log("adding user history", historyArgs);
    let history = new UserHistory(historyArgs);
    await history.save();
    return history;
  }
}

module.exports = UserHistoryService;
