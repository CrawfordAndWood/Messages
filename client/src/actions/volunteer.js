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
  GET_VOLUNTEERS,
  GET_DATA,
  ADD_EMPTY_VOLUNTEER,
  SORT_BY_VOLUNTEER,
  SORT_BY_NEW_VOLUNTEER,
  VOLUNTEER_LOADED,
} from "./types";

export const countVolunteers = (areaCode, search = "") => async (dispatch) => {
  try {
    console.log("counting volunteer code:", areaCode);
    const res = await axios.get(`api/volunteers/count/${areaCode}/${search}`);
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

export const getVolunteers = (
  areaCode,
  search = "",
  page = 1,
  limit = 10
) => async (dispatch) => {
  //TODO find way of checking local storage to pass area around
  //because when it refreshes we need the area
  try {
    console.log("areacode from component", areaCode, localStorage);
    dispatch({ type: LOAD });
    dispatch({ type: SEARCH, payload: search });
    dispatch(countVolunteers(areaCode, search));
    const res = await axios.get(
      `/api/volunteers/${areaCode}/${search}/${page}/${limit}`
    );
    dispatch({ type: GET_VOLUNTEERS, payload: res.data });
    dispatch({ type: UPDATE_LIMIT, payload: limit });
    dispatch({ type: UPDATE_PAGE, payload: page });
    dispatch({ type: GET_DATA });
  } catch (error) {
    console.log(error.Message);
    dispatch({
      type: VIEW_ERROR,
      payload: {
        msg: error.response,
        status: error.response.status,
      },
    });
  }
};

export const adminCreateVolunteer = (formData, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/volunteers`, formData, config);

    dispatch(setAlert(res.data.Message, "success"));
    if (!edit) {
      dispatch({ type: GET_DATA });
      dispatch({ type: INCREMENT_COUNT });
      dispatch(getVolunteers("", 1, 10));
    } else {
      dispatch(getVolunteers("", 1, 10));
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
export const createVolunteer = (formData, edit = false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/volunteers`, formData, config);
    dispatch({ type: GET_VOLUNTEERS, payload: res.data });
    dispatch({ type: GET_DATA });
    dispatch(
      setAlert(edit ? "Volunteer Updated" : "Volunteer Created", "success")
    );
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
export const deleteVolunteer = (search, page, limit, rowData) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (rowData.id !== "temp") {
      await axios.delete(
        `/api/volunteers/${rowData.id}/${rowData.adminId}`,
        config
      );
      dispatch(setAlert("Volunteer Deleted", "success"));
      dispatch({ type: DECREMENT_COUNT });
    }
    dispatch(getVolunteers(search, page, limit));
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

export const addEmptyVolunteer = () => (dispatch) => {
  const newVolunteer = {
    _id: "temp",
    postcode: "",
    email: "",
    name: "",
    roleId: "",
  };
  dispatch({ type: ADD_EMPTY_VOLUNTEER, payload: newVolunteer });
  dispatch({ type: ADD_EMPTY_ROW });
};

export const sort = (name, sortColumn) => (dispatch) => {
  const dispatchFn =
    name === sortColumn ? SORT_BY_VOLUNTEER : SORT_BY_NEW_VOLUNTEER;
  dispatch({ type: dispatchFn, payload: name });
  dispatch({ type: SET_SORT_COLUMN, payload: name });
};

export const resetSearch = (areacode, limit) => (dispatch) => {
  dispatch(getVolunteers(areacode, "", 1, limit));
  dispatch({ type: RESET_SEARCH });
};

export const updateVolunteerDetails = (route, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/volunteers/update/${route}`,
      formData,
      config
    );
    console.log("deets up", res.data);
    dispatch(setAlert(res.data.Message, res.data.Status));

    dispatch({ type: VOLUNTEER_LOADED, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const updateLimit = (search, newLimit) => (dispatch) => {
  dispatch(getVolunteers(search, 1, newLimit));
  dispatch({ type: UPDATE_PAGE, payload: 1 });
  dispatch({ type: UPDATE_LIMIT, payload: newLimit });
};

export const updatePage = (search, page, limit) => (dispatch) => {
  dispatch(getVolunteers(search, page, limit));
  dispatch({ type: UPDATE_PAGE, payload: page });
};

export const setDefaultColumn = (name) => (dispatch) => {
  dispatch({ type: SET_SORT_COLUMN, payload: name });
};
export const resetPassword = (rowData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      email: rowData.email,
    };
    if (rowData.id !== "temp") {
      await axios.post(
        `/api/users/user-management/passwordReset/${rowData.id}`,
        config
      );
      dispatch(setAlert("Password Reset", "success"));
    }
  } catch (error) {
    const errors = error.response.data.errors;
    errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    dispatch({
      type: VIEW_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
