const RoleHistory = require("../models/RoleHistory");

class RoleHistoryService {
  constructor() {}
  /*Count Role History */
  async countRoleHistory(term = null) {
    if (term === null) {
      const roleHistoryCount = await RoleHistory.countDocuments();
      return roleHistoryCount;
    }
    const regTerm = new RegExp(term, "i");
    //issue - I need to be able to get the user from the id. so the term also needs to search users by the search term
    //so I may just grab the user service
    //and add up the hits that come from that
    const roleHistoryCount = await RoleHistory.countDocuments({
      $or: [
        { description: regTerm },
        { updatedBy: regTerm },
        { role: regTerm },
      ],
    });
    return roleHistoryCount;
  }

  /*Get Role History*/
  async getRoleHistory(params) {
    if (params.term === undefined) {
      let roleHistory = await RoleHistory.find()
        .skip(Number(params.page - 1) * Number(params.limit))
        .limit(Number(params.limit));
      return roleHistory;
    }
    let term = new RegExp(params.term, "i");
    let roleHistory = await RoleHistory.find({
      $or: [{ description: term }, { updatedBy: term }, { role: term }],
    })
      .skip(Number(params.page - 1) * Number(params.limit))
      .limit(Number(params.limit));
    return roleHistory;
  }

  /* Post Role History */
  async addRoleHistory(historyArgs) {
    let history = new RoleHistory(historyArgs);
    await history.save();
    return history;
  }
}

module.exports = RoleHistoryService;
