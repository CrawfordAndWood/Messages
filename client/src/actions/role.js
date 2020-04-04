import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_ROLE,
  GET_ROLES,
  ADD_ROLE,
  UPDATE_ROLE,
  ROLE_ERROR
} from "./types";

//Get current users profile
export const getRoles = () => async dispatch => {
  try {
    const res = await axios.get("api/roles");
    dispatch({ type: GET_ROLES, payload: res.data });
  } catch (error) {
    dispatch({
      type: ROLE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Create or update profile
export const createRole = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/role", formData, config);
    dispatch({ type: GET_ROLES, payload: res.data });

    dispatch(setAlert(edit ? "Role Updated" : "Role Created", "success"));
    if (!edit) {
      history.push("/role");
    }
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ROLE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
