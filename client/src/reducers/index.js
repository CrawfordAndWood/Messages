import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import role from "./role";
import table from "./table";

export default combineReducers({
  alert,
  auth,
  profile,
  role,
  table,
});
