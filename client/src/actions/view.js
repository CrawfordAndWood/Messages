/*
This class is for common table actions. It will be injected into each individual action class
These actions are not passed into components. They are passed into other action classes.
Instead, those functions are passed into the component by the parent.  
*/
import axios from "axios";
import { setAlert } from "./alert";
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
  GET_DATA,
  SET_ROUTE,
  SET_SORT_COLUMN,
} from "./types";

export const countItems = (route, search = "") => async (dispatch) => {
  try {
    const res = await axios.get(`api/${route}/count/${search}`);
    console.log("counted", res.data);
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

export const getData = (route, search = "", page = 1, limit = 10) => async (
  dispatch
) => {
  //TODO factor out params into single options object.
  try {
    if (route === null) return false;
    dispatch({ type: LOAD });
    dispatch({ type: SEARCH, payload: search });
    dispatch({ type: UPDATE_PAGE, payload: 1 });

    await dispatch(countItems(route, search));
    const res = await axios.get(`/api/${route}/${search}/${page}/${limit}`);
    dispatch({ type: GET_DATA, payload: res.data });
    dispatch({ type: SET_ROUTE, payload: route });
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

// Create or update item.
export const createItem = (formData, route, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("firing off", edit);
    const res = await axios.post(`/api/${route}`, formData, config);
    await dispatch({ type: GET_DATA, payload: res.data });
    await dispatch(setAlert(edit ? "Item Updated" : "Item Created", "success"));
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
export const deleteItem = (route, search, page, limit, rowData) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (rowData.id !== "temp") {
      await axios.delete(`/api/${route}/${rowData.id}`, config);
      dispatch(setAlert("Item Deleted", "success"));
      dispatch({ type: DECREMENT_COUNT });
    }
    dispatch(getData(route, search, page, limit));
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

export const addEmptyItem = (item) => (dispatch) => {
  dispatch({ type: ADD_EMPTY_ROW, payload: item });
};

export const sort = (name, sortColumn) => (dispatch) => {
  const dispatchFn = name === sortColumn ? SORT_BY_COLUMN : SORT_BY_NEW_COLUMN;
  dispatch({ type: dispatchFn, payload: name });
};

export const resetSearch = (route, limit) => (dispatch) => {
  dispatch(getData(route, "", 1, limit));
  dispatch({ type: RESET_SEARCH });
};

export const updateLimit = (route, search, newLimit) => (dispatch) => {
  dispatch(getData(route, search, 1, newLimit));
  dispatch({ type: UPDATE_PAGE, payload: 1 });
  dispatch({ type: UPDATE_LIMIT, payload: newLimit });
};

export const updatePage = (route, search, page, limit) => (dispatch) => {
  dispatch(getData(route, search, page, limit));
  dispatch({ type: UPDATE_PAGE, payload: page });
};

export const setDefaultColumn = (name) => (dispatch) => {
  dispatch({ type: SET_SORT_COLUMN, payload: name });
};
