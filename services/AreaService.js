const Area = require("../models/Area");
const AreaHistoryService = require("../services/AreaHistoryService");
const areaHistoryService = new AreaHistoryService();
const uuid = require("uuid");

class AreaService {
  constructor() {}
  /*Count Area  */
  async countAreas(term = null) {
    if (term === null) {
      const areaCount = await Area.countDocuments();
      return areaCount;
    }
    const regTerm = new RegExp(term, "i");
    const areaCount = await Area.countDocuments({
      $or: [{ code: regTerm }, { name: regTerm }, { postcodes: regTerm }],
    });
    return areaCount;
  }

  /*Get Area */
  async getAreas(params) {
    if (params.term === undefined) {
      let area = await Area.find()
        .skip(Number(params.page - 1) * Number(params.limit))
        .limit(Number(params.limit));
      return area;
    }
    let term = new RegExp(params.term, "i");
    let areas = await Area.find({
      $or: [{ code: term }, { name: term }, { postcodes: term }],
    })
      .skip(Number(params.page - 1) * Number(params.limit))
      .limit(Number(params.limit));
    return areas;
  }

  /* Post Area  */
  async addArea(areaArgs) {
    try {
      let area = new Area(areaArgs);
      area.id = uuid.v4();
      let areaHistoryFields = {
        description: `New Area ${areaArgs.code + areaArgs.name}`,
        updatedBy: areaArgs.adminId,
        date: new Date(),
      };
      await areaHistoryService.addAreaHistory(areaHistoryFields);
      await area.save();
      return area;
    } catch (error) {
      console.log(error);
    }
  }

  /*Update Area*/
  async updateArea(updatedAreaArgs) {
    try {
      //we know id isn't temp
      let { id, code, name, postcodes } = updatedAreaArgs;
      const areaFields = { id, code, name, postcodes: postcodes.split(",") };
      let clashingArea = await Area.findOne({
        $and: [{ code: code }, { name: name }, { postcodes: postcodes }],
      });
      if (clashingArea) {
        let response = {
          Status: "FAILED",
          Message: name + " already exists",
        };
        return response;
      }
      let area = {};
      let existingArea = await Area.findOne({ _id: id });
      if (existingArea) {
        area = await Area.findOneAndUpdate(
          { _id: id },
          { $set: areaFields },
          {
            new: true,
          }
        );
      }

      let desc = `Admin updated area. 
      Old: ${existingArea.code}  ${existingArea.name} 
      New: ${area.code} ${area.name}`;
      //add to history
      let areaHistoryFields = {
        description: desc,
        updatedBy: updatedAreaArgs.adminId,
        date: new Date(),
      };
      await areaHistoryService.addAreaHistory(areaHistoryFields);

      //Prepare response message
      let response = {
        Status: "SUCCESS",
        Message: name + " has been updated",
      };
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createOrUpdateArea(areaArgs) {
    if (areaArgs.id === "temp") {
      let newAreaResult = await this.addArea(areaArgs);
      return newAreaResult;
    }
    let updatedAreaResult = await this.updateArea(areaArgs);
    return updatedAreaResult;
  }

  /*Delete Area*/
  async deleteArea(params) {
    try {
      const { id, adminId } = params;
      let area = await Area.findOneAndRemove({ _id: id });
      //add to history
      let areaHistoryFields = {
        description: "Area Deleted - " + area.code + " " + area.name,
        updatedBy: adminId,
        date: new Date(),
      };
      console.log("Area service adding hist ", areaHistoryFields);
      await areaHistoryService.addAreaHistory(areaHistoryFields);
      return true;
    } catch (error) {
      console.log("deletearea err", error);
    }
  }
}

module.exports = AreaService;
