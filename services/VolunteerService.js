const User = require("../models/User");
const AreaService = require("../services/areaService");
const UserService = require("../services/UserService");
const VolunteerHistoryService = require("../services/VolunteerHistoryService");
const uuid = require("uuid");

const areaService = new AreaService();
const userService = new UserService();
const volunteerHistoryService = new VolunteerHistoryService();

//TODO: Ability to lock user or reset password - keep using userservice

class VolunteerService {
  constructor() {}
  /*Count Volunteer  */
  async countVolunteers(areaId, term = null) {
    let pcodes = areaService.getAreaByID(areaId).postcodes;
    if (term === null) {
      const volunteerCount = await User.countDocuments({
        postcode: { $in: pcodes },
      });
      return volunteerCount;
    }
    const regTerm = new RegExp(term, "i");
    const volunteerCount = await User.countDocuments({
      $and: [
        {
          postcode: { $in: pcodes },
          $or: [{ code: regTerm }, { name: regTerm }],
        },
      ],
    });
    return volunteerCount;
  }

  /*Get Volunteer */
  async getVolunteers(params) {
    if (params.term === undefined) {
      let pcodes = areaService.getAreaByID(params.areaId).postcodes;
      let volunteer = await User.find({ postcode: { $in: pcodes } })
        .skip(Number(params.page - 1) * Number(params.limit))
        .limit(Number(params.limit));
      return volunteer;
    }
    let term = new RegExp(params.term, "i");
    let volunteers = await User.find({
      $and: [
        { postcode: { $in: pcodes }, $or: [{ code: term }, { name: term }] },
      ],
    })
      .skip(Number(params.page - 1) * Number(params.limit))
      .limit(Number(params.limit));
    return volunteers;
  }

  /* Post Volunteer  */
  async addVolunteer(volunteerArgs) {
    try {
      const volunteer = userService.createOrUpdateUser(volunteerArgs);
      return volunteer;
    } catch (error) {
      console.log(error);
    }
  }

  //Reset Password

  async resetVolunteerPassword(volunteerArgs) {
    try {
      const volunteerResult = userService.resetPassword(volunteerArgs);
      return volunteerResult;
    } catch (error) {
      console.log(error);
    }
  }
  /*Delete Volunteer*/
  async deleteVolunteer(params) {
    try {
      const { id, adminId } = params;
      let volunteer = await Use.findOneAndRemove({ _id: id });
      //add to history
      let volunteerHistoryFields = {
        description:
          "Volunteer Deleted - " + volunteer.code + " " + volunteer.name,
        updatedBy: adminId,
        date: new Date(),
      };
      console.log("Volunteer service adding hist ", volunteerHistoryFields);
      await volunteerHistoryService.addVolunteerHistory(volunteerHistoryFields);
      return true;
    } catch (error) {
      console.log("deletevolunteer err", error);
    }
  }
}

module.exports = VolunteerService;
