/*
This class is for common table actions. It will be injected into each individual action class
These actions are not passed into components. They are passed into other action classes.
Instead, those functions are passed into the component by the parent.  
*/
import axios from "axios";
import { setAlert } from "./alert";
import { getRoles } from "./role";
import {
  VIEW_ERROR,
  ADD_EMPTY_ROW,
  SEARCH,
  RESET_SEARCH,
  LOAD,
  UPDATE_LIMIT,
  UPDATE_PAGE,
  ITEM_COUNT,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  SORT_BY_COLUMN,
  SORT_BY_NEW_COLUMN,
  SET_SORT_COLUMN,
  GET_USERS,
  GET_DATA,
  ADD_EMPTY_USER,
  SORT_BY_USER,
  SORT_BY_NEW_USER,
} from "./types";

export const countUsers = (search = "") => async (dispatch) => {
  try {
    const res = await axios.get(`api/users/user-management/count/${search}`);
    dispatch({ type: ITEM_COUNT, payload: res.data });
  } catch (error) {
    dispatch({
      type: VIEW_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getUsers = (search = "", page = 1, limit = 10) => async (
  dispatch
) => {
  //TODO factor out params into single options object.
  try {
    dispatch({ type: LOAD });
    dispatch({ type: SEARCH, payload: search });
    dispatch(countUsers(search));
    const res = await axios.get(
      `/api/users/user-management/${search}/${page}/${limit}`
    );
    dispatch({ type: GET_USERS, payload: res.data });
    dispatch({ type: UPDATE_LIMIT, payload: limit });
    dispatch({ type: UPDATE_PAGE, payload: page });
  } catch (error) {
    console.log(error);
    dispatch({
      type: VIEW_ERROR,
      payload: {
        msg: error.response,
        status: error.response.status,
      },
    });
  }
};

export const adminCreateUser = (formData, edit = false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `/api/users/user-management`,
      formData,
      config
    );
    dispatch({ type: GET_USERS, payload: res.data });
    dispatch({ type: GET_DATA });
    dispatch(setAlert(edit ? "User Updated" : "User Created", "success"));
    if (!edit) {
      dispatch({ type: INCREMENT_COUNT });
    }
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: VIEW_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Create or update item.
export const createUser = (formData, edit = false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/users`, formData, config);
    dispatch({ type: GET_USERS, payload: res.data });
    dispatch({ type: GET_DATA });
    dispatch(setAlert(edit ? "User Updated" : "User Created", "success"));
    if (!edit) {
      dispatch({ type: INCREMENT_COUNT });
    }
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: VIEW_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Delete a Role
export const deleteUser = (search, page, limit, rowData) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (rowData.id !== "temp") {
      await axios.delete(`/api/users/user-management/${rowData.id}`, config);
      dispatch(setAlert("User Deleted", "success"));
      dispatch({ type: DECREMENT_COUNT });
    }
    dispatch(getUsers(search, page, limit));
  } catch (error) {
    dispatch({
      type: VIEW_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addEmptyUser = () => (dispatch) => {
  const newUser = {
    _id: "temp",
    postcode: "",
    email: "",
    name: "",
    roleId: "",
  };
  dispatch({ type: ADD_EMPTY_USER, payload: newUser });
  dispatch({ type: ADD_EMPTY_ROW });
};

export const sort = (name, sortColumn) => (dispatch) => {
  console.log(name, sortColumn);
  const dispatchFn = name === sortColumn ? SORT_BY_USER : SORT_BY_NEW_USER;
  dispatch({ type: dispatchFn, payload: name });
  dispatch({ type: SET_SORT_COLUMN, payload: name });
};

export const resetSearch = (limit) => (dispatch) => {
  dispatch(getUsers("", 1, limit));
  dispatch({ type: RESET_SEARCH });
};

export const updateLimit = (search, newLimit) => (dispatch) => {
  dispatch(getUsers(search, 1, newLimit));
  dispatch({ type: UPDATE_PAGE, payload: 1 });
  dispatch({ type: UPDATE_LIMIT, payload: newLimit });
};

export const updatePage = (search, page, limit) => (dispatch) => {
  dispatch(getUsers(search, page, limit));
  dispatch({ type: UPDATE_PAGE, payload: page });
};

export const setDefaultColumn = (name) => (dispatch) => {
  dispatch({ type: SET_SORT_COLUMN, payload: name });
};
