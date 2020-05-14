import { combineReducers } from "redux";
import alert from "./alert";
import area from "./area";
import areaHistory from "./areahistory";
import auth from "./auth";
import household from "./household";
import householdhistory from "./householdhistory";
import profile from "./profile";
import role from "./role";
import view from "./view";
import user from "./user";
import userhistory from "./userhistory";
import volunteer from "./volunteer";

export default combineReducers({
  alert,
  area,
  areaHistory,
  auth,
  household,
  householdhistory,
  profile,
  role,
  view,
  user,
  userhistory,
  volunteer,
});
