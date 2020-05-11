const Household = require("../models/Household");
const HouseholdHistoryService = require("../services/HouseholdHistoryService");
const householdHistoryService = new HouseholdHistoryService();
const uuid = require("uuid");

class HouseholdService {
  constructor() {}
  /*Count Household  */
  async countHouseholds(term = null) {
    if (term === null) {
      const householdCount = await Household.countDocuments();
      return householdCount;
    }
    const regTerm = new RegExp(term, "i");
    const householdCount = await Household.countDocuments({
      $or: [
        { house: term },
        { street: term },
        { postcode: term },
        { needs: term },
      ],
    });
    return householdCount;
  }

  /*Get Household */
  async getHouseholds(params) {
    if (params.term === undefined) {
      let household = await Household.find()
        .skip(Number(params.page - 1) * Number(params.limit))
        .limit(Number(params.limit));
      return household;
    }
    let term = new RegExp(params.term, "i");
    let households = await Household.find({
      $or: [
        { house: term },
        { street: term },
        { postcode: term },
        { needs: term },
      ],
    })
      .skip(Number(params.page - 1) * Number(params.limit))
      .limit(Number(params.limit));
    return households;
  }

  /* Post Household  */
  async addHousehold(householdArgs) {
    try {
      let household = new Household(householdArgs);
      household.id = uuid.v4();
      let householdHistoryFields = {
        description: `New Household ${householdArgs}`,
        updatedBy: householdArgs.adminId,
        date: new Date(),
      };
      await householdHistoryService.addHouseholdHistory(householdHistoryFields);
      await household.save();
      return household;
    } catch (error) {
      console.log(error);
    }
  }

  /*Update Household*/
  async updateHousehold(updatedHouseholdArgs) {
    try {
      //we know id isn't temp
      let {
        id,
        areaId,
        house,
        street,
        postcode,
        occupants,
        needs,
        volunteersCovered,
        lastVisit,
        nextVisit,
        lastVisitCoveredNeeds,
        needsCoveredProportion,
      } = updatedHouseholdArgs;
      const householdFields = {
        id,
        areaId,
        house,
        street,
        postcode,
        occupants,
        needs,
        volunteersCovered,
        lastVisit,
        nextVisit,
        lastVisitCoveredNeeds,
        needsCoveredProportion,
      };
      let clashingHousehold = await Household.findOne({
        $and: [
          { house: house },
          { street: street },
          { postcode: postcode },
          { needs: needs },
          { lastVisit: lastVisit },
        ],
      });
      if (clashingHousehold) {
        let response = {
          Status: "FAILED",
          Message: " Household already exists",
        };
        return response;
      }
      let household = {};
      let existingHousehold = await Household.findOne({ _id: id });
      if (existingHousehold) {
        household = await Household.findOneAndUpdate(
          { _id: id },
          { $set: householdFields },
          {
            new: true,
          }
        );
      }

      let desc = `Admin updated household. 
      Old: ${existingHousehold}  
      New: ${household}`;
      //add to history
      let householdHistoryFields = {
        description: desc,
        updatedBy: updatedHouseholdArgs.adminId,
        date: new Date(),
      };
      await householdHistoryService.addHouseholdHistory(householdHistoryFields);

      //Prepare response message
      let response = {
        Status: "SUCCESS",
        Message: "Household updated",
      };
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createOrUpdateHousehold(householdArgs) {
    if (householdArgs.id === "temp") {
      let newHouseholdResult = await this.addHousehold(householdArgs);
      return newHouseholdResult;
    }
    let updatedHouseholdResult = await this.updateHousehold(householdArgs);
    return updatedHouseholdResult;
  }

  /*Delete Household*/
  async deleteHousehold(params) {
    try {
      const { id, adminId } = params;
      let household = await Household.findOneAndRemove({ _id: id });
      //add to history
      let householdHistoryFields = {
        description: "Household Deleted - " + household,
        updatedBy: adminId,
        date: new Date(),
      };
      console.log("Household service adding hist ", householdHistoryFields);
      await householdHistoryService.addHouseholdHistory(householdHistoryFields);
      return true;
    } catch (error) {
      console.log("deletehousehold err", error);
    }
  }
}

module.exports = HouseholdService;
