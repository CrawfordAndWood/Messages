const AreaHistory = require("../models/AreaHistory");
const Area = require("../models/Area");
const Role = require("../models/Roles");

class AreaHistoryService {
  constructor() {}
  /*Count Area History */
  async countAreaHistoryItems(term = null) {
    try {
      if (term === null) {
        const areaHistoryCount = await AreaHistory.countDocuments();
        return areaHistoryCount;
      }
      const regTerm = new RegExp(term, "i");
      let areaIds = await Area.find({ name: regTerm }).select("_id");
      let areaHistoryCount = await AreaHistory.countDocuments({
        $or: [
          { description: regTerm },
          { updatedBy: { $in: areaIds } },
          { area: { $in: areaIds } },
        ],
      });
      return areaHistoryCount;
    } catch (error) {
      console.log(error.message);
    }
  }

  /*Get Area History*/
  async getAreaHistory(params) {
    try {
      if (params.term === undefined) {
        let areaHistory = await AreaHistory.find()
          .populate("updatedBy", ["name"])
          .sort("-date")
          .skip(Number(params.page - 1) * Number(params.limit))
          .limit(Number(params.limit));

        return areaHistory;
      }
      let term = new RegExp(params.term, "i");
      //get the ids of the areas matching the search term
      let areaIds = await Area.find({ name: term }).select("_id");
      let areaHistory = await AreaHistory.find({
        $or: [
          { description: term },
          { updatedBy: { $in: areaIds } },
          { area: { $in: areaIds } },
        ],
      })
        .populate("area", ["name"])
        .populate("updatedBy", ["name"])
        .skip(Number(params.page - 1) * Number(params.limit))
        .limit(Number(params.limit));

      return areaHistory;
    } catch (error) {
      console.log(error.message);
    }
  }

  /* Post Area History */
  async addAreaHistory(historyArgs) {
    let history = new AreaHistory(historyArgs);
    await history.save();
    return history;
  }
}

module.exports = AreaHistoryService;
