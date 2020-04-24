import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_ROLES,
  ROLE_ERROR,
  ADD_EMPTY_ROLE,
  ADD_EMPTY_ROW,
  SORT,
  SEARCH,
  RESET_SEARCH,
  LOAD,
  UPDATE_LIMIT,
  UPDATE_PAGE,
  ITEM_COUNT,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  GET_DATA,
} from "./types";

export const countRoles = (searchTerm = "") => async (dispatch) => {
  try {
    const res = await axios.get(`api/roles/count/${searchTerm}`);
    //dispatch({ type: ROLE_COUNT, payload: res.data });
    dispatch({ type: ITEM_COUNT, payload: res.data });
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

//Get current users profile
export const getRoles = (search = "", page = 1, limit = 10) => async (
  dispatch
) => {
  try {
    dispatch({ type: LOAD });
    dispatch({ type: SEARCH, payload: search });
    dispatch({ type: GET_DATA });
    dispatch(countRoles(search));
    console.log(search, page, limit);
    const res = await axios.get(`api/roles/${search}/${page}/${limit}`);
    dispatch({ type: GET_ROLES, payload: res.data });
    dispatch({ type: UPDATE_LIMIT, payload: limit });
    dispatch({ type: UPDATE_PAGE, payload: page });
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

    const res = await axios.post(`/api/roles`, formData, config);
    dispatch({ type: GET_ROLES, payload: res.data });
    dispatch({ type: GET_DATA });
    dispatch(setAlert(edit ? "Role Updated" : "Role Created", "success"));

    if (!edit) {
      dispatch({ type: INCREMENT_COUNT });
    }
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
export const deleteRole = (search, page, limit, rowData) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (rowData.id !== "temp") {
      await axios.delete(`/api/roles/${rowData.id}`, config);
      dispatch(setAlert("Role Deleted", "success"));
      dispatch({ type: DECREMENT_COUNT });
    }
    dispatch(getRoles(search, page, limit));
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
  console.log("adding role");
  const newRole = { _id: "temp", name: "" };
  dispatch({ type: ADD_EMPTY_ROLE, payload: newRole });
  dispatch({ type: ADD_EMPTY_ROW });
};

export const sort = () => (dispatch) => {
  console.log("sorting");
  //const dispatchFn = name === sortColumn ? SORT_BY_COLUMN : SORT_BY_NEW_COLUMN;
  dispatch({ type: SORT });
};

export const resetSearch = () => (dispatch) => {
  dispatch({ type: LOAD });
  dispatch(getRoles("", 1, 10));
  dispatch({ type: RESET_SEARCH });
  dispatch({ type: UPDATE_PAGE, payload: 1 });
};

export const updateLimit = (search, newLimit) => (dispatch) => {
  dispatch(getRoles(search, 1, newLimit));
  dispatch({ type: UPDATE_PAGE, payload: 1 });
  dispatch({ type: UPDATE_LIMIT, payload: newLimit });
};

export const updatePage = (search, page, limit) => (dispatch) => {
  dispatch(getRoles(search, page, limit));
  dispatch({ type: UPDATE_PAGE, payload: page });
};
