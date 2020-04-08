import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_ROLE,
  GET_ROLES,
  ADD_ROLE,
  UPDATE_ROLE,
  ROLE_ERROR,
  DELETE_ROLE,
} from "./types";

//Get current users profile
export const getRoles = () => async (dispatch) => {
  try {
    const res = await axios.get("api/roles");
    dispatch({ type: GET_ROLES, payload: res.data });
  } catch (error) {
    dispatch({
      type: ROLE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Create or update role
export const createRole = (formData, edit = false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/roles", formData, config);
    dispatch({ type: GET_ROLES, payload: res.data });
    console.log("payloard returned", res.data);

    dispatch(setAlert(edit ? "Role Updated" : "Role Created", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ROLE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Delete a Role
export const deleteRole = (rowData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.delete(`/api/roles/${rowData.id}`, config);
    //08/04 trying to delete role but it's
    console.log("action res.data", res.data);
    dispatch({ type: DELETE_ROLE, payload: res.data });
    dispatch({ type: GET_ROLES, payload: res.data });
    dispatch(setAlert("Role Deleted", "success"));
  } catch (error) {
    dispatch({
      type: ROLE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
