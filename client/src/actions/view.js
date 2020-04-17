/*
This class is for common table actions. It will be injected into each individual action class
These actions are not passed into components. They are passed into other action classes.
Instead, those functions are passed into the component by the parent.  
*/
import axios from "axios";
import { setAlert } from "./alert";
import {
  ITEM_ERROR,
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
} from "./types";

export const countItems = (route, search = "") => async (dispatch) => {
  try {
    const res = await axios.get(`api/${route}/count/${search}`);
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

export const getItems = (route, search = "", page = 1, limit = 10) => async (
  dispatch
) => {
  try {
    const res = await axios.get(`api/${route}/${search}/${page}/${limit}`);
    await dispatch(countItems(route, search));
    dispatch({ type: GET_ITEMS, payload: res.data });
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

// Create or update item
export const createItem = (
  formData,
  route,
  page = 1,
  limit = 10,
  edit = false
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `/api/${route}/${page}/${limit}`,
      formData,
      config
    );
    await dispatch({ type: GET_ITEMS, payload: res.data });
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
export const deleteItem = (route, rowData) => async (dispatch) => {
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
    dispatch(updateLimit(10));
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

export const addEmptyItem = (item) => (dispatch) => {
  dispatch({ type: ADD_EMPTY_ROW, payload: item });
};

export const sort = (name, sortColumn) => (dispatch) => {
  const dispatchFn = name === sortColumn ? SORT_BY_COLUMN : SORT_BY_NEW_COLUMN;
  dispatch({ type: dispatchFn, payload: name });
};

export const search = (route, searchTerm, page, limit) => async (dispatch) => {
  try {
    dispatch({ type: LOAD });
    dispatch({ type: SEARCH });
    dispatch({ type: UPDATE_PAGE, payload: 1 });

    await dispatch(countItems(searchTerm.term));

    const res = await axios.get(
      `/api/${route}/${searchTerm.term}/${page}/${limit}`
    );
    dispatch({ type: GET_ITEMS, payload: res.data });
  } catch (error) {
    dispatch({
      type: ITEM_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const resetSearch = () => (dispatch) => {
  dispatch({ type: LOAD });
  dispatch(countItems());
  dispatch(updateLimit(10));
  dispatch({ type: RESET_SEARCH });
};

export const updateLimit = (newLimit) => (dispatch) => {
  dispatch(getItems(1, newLimit));
  dispatch({ type: UPDATE_PAGE, payload: 1 });
  dispatch({ type: UPDATE_LIMIT, payload: newLimit });
};

export const updatePage = (page) => (dispatch) => {
  dispatch({ type: UPDATE_PAGE, payload: page });
};
