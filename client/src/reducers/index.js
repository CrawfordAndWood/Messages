import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import role from "./role";
import view from "./view";
import user from "./user";
import userhistory from "./userhistory";

export default combineReducers({
  alert,
  auth,
  profile,
  role,
  view,
  user,
  userhistory,
});
