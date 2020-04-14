import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_ROLES,
  ROLE_ERROR,
  ADD_EMPTY_ROW,
  SORT_BY_NAME,
  SEARCH,
  RESET_SEARCH,
  LOAD,
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
    if (rowData.id !== "temp") {
      await axios.delete(`/api/roles/${rowData.id}`, config);
      dispatch(setAlert("Role Deleted", "success"));
    }
    dispatch(getRoles());
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

export const addEmptyRole = () => (dispatch) => {
  const newRole = { _id: "temp", name: "" };
  dispatch({ type: ADD_EMPTY_ROW, payload: newRole });
};

export const sortbyName = () => (dispatch) => {
  dispatch({ type: SORT_BY_NAME, payload: "name" });
};

export const search = (searchTerm) => async (dispatch) => {
  try {
    dispatch({ type: LOAD });
    dispatch({ type: SEARCH });
    const res = await axios.get(`/api/roles/${searchTerm.term}`);
    dispatch({ type: GET_ROLES, payload: res.data });
  } catch (error) {
    console.log("error,", error);
    dispatch({
      type: ROLE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const resetSearch = () => (dispatch) => {
  dispatch({ type: LOAD });
  dispatch(getRoles());
  dispatch({ type: RESET_SEARCH });
};
