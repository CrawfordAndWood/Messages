import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_ROLE,
  GET_ROLES,
  ADD_ROLE,
  UPDATE_ROLE,
  ROLE_ERROR,
  DELETE_ROLE,
  ADD_EMPTY_ROW,
  SORT_BY_NAME,
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
    console.log("err", errors);
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
      const res = await axios.delete(`/api/roles/${rowData.id}`, config);
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
  //payload will be defined in action or util as const sortByKey = key => (a, b) => a[key] > b[key] ? 1 : -1 and then const payload = sortByKey(name)
  //I could need a disctionary for sortorder -1 up 0 null 1 down
  //below is sort descending function. This should be available to the reducer.
  //can I keep a dictionary of functions? const sortingFn = -1, 0, 1
  //There should always be a default sort on a table?
  // const sortByKey = (key) => (a, b) => (a[key] > b[key] ? 1 : -1);
  // const sortOrderInstruction = sortByKey("name");

  dispatch({ type: SORT_BY_NAME, payload: "name" });
};
