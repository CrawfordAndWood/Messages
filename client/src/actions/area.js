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
  SET_SORT_COLUMN,
  GET_AREAS,
  GET_DATA,
  ADD_EMPTY_AREA,
  SORT_BY_AREA,
  SORT_BY_NEW_AREA,
  AREA_LOADED,
} from "./types";

export const countAreas = (search = "") => async (dispatch) => {
  try {
    const res = await axios.get(`api/areas/count/${search}`);
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

export const getAreas = (search = "", page = 1, limit = 10) => async (
  dispatch
) => {
  //TODO factor out params into single options object.
  try {
    dispatch({ type: LOAD });
    dispatch({ type: SEARCH, payload: search });
    dispatch(countAreas(search));
    const res = await axios.get(`/api/areas/${search}/${page}/${limit}`);
    console.log(res.data);
    dispatch({ type: GET_AREAS, payload: res.data });
    dispatch({ type: UPDATE_LIMIT, payload: limit });
    dispatch({ type: UPDATE_PAGE, payload: page });
    console.log("getting data");
    dispatch({ type: GET_DATA });
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

export const adminCreateArea = (formData, edit = false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/areas`, formData, config);

    dispatch(setAlert(res.data.Message, "success"));
    if (!edit) {
      dispatch({ type: GET_DATA });
      dispatch({ type: INCREMENT_COUNT });
      dispatch(getAreas("", 1, 10));
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
export const createArea = (formData, edit = false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/areas`, formData, config);
    dispatch({ type: GET_AREAS, payload: res.data });
    dispatch({ type: GET_DATA });
    dispatch(setAlert(edit ? "Area Updated" : "Area Created", "success"));
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
export const deleteArea = (search, page, limit, rowData) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (rowData.id !== "temp") {
      await axios.delete(`/api/areas/${rowData.id}/${rowData.adminId}`, config);
      dispatch(setAlert("Area Deleted", "success"));
      dispatch({ type: DECREMENT_COUNT });
    }
    dispatch(getAreas(search, page, limit));
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

export const addEmptyArea = () => (dispatch) => {
  const newArea = {
    _id: "temp",
    postcode: "",
    email: "",
    name: "",
    roleId: "",
  };
  dispatch({ type: ADD_EMPTY_AREA, payload: newArea });
  dispatch({ type: ADD_EMPTY_ROW });
};

export const sort = (name, sortColumn) => (dispatch) => {
  const dispatchFn = name === sortColumn ? SORT_BY_AREA : SORT_BY_NEW_AREA;
  dispatch({ type: dispatchFn, payload: name });
  dispatch({ type: SET_SORT_COLUMN, payload: name });
};

export const resetSearch = (limit) => (dispatch) => {
  dispatch(getAreas("", 1, limit));
  dispatch({ type: RESET_SEARCH });
};

export const updateAreaDetails = (route, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/areas/update/${route}`,
      formData,
      config
    );
    console.log("deets up", res.data);
    dispatch(setAlert(res.data.Message, res.data.Status));

    dispatch({ type: AREA_LOADED, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const updateLimit = (search, newLimit) => (dispatch) => {
  dispatch(getAreas(search, 1, newLimit));
  dispatch({ type: UPDATE_PAGE, payload: 1 });
  dispatch({ type: UPDATE_LIMIT, payload: newLimit });
};

export const updatePage = (search, page, limit) => (dispatch) => {
  dispatch(getAreas(search, page, limit));
  dispatch({ type: UPDATE_PAGE, payload: page });
};

export const setDefaultColumn = (name) => (dispatch) => {
  dispatch({ type: SET_SORT_COLUMN, payload: name });
};
