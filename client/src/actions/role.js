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
  UPDATE_LIMIT,
  UPDATE_PAGE,
} from "./types";

//Get current users profile
export const getRoles = (page = 1, limit = 10, search = null) => async (
  dispatch
) => {
  try {
    //this needs to take in currentPage and limit
    //if currentpage and limit are not null then
    const res = await axios.get(`api/roles/${page}/${limit}`);
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

export const search = (searchTerm, limit, page) => async (dispatch) => {
  try {
    console.log(searchTerm);
    dispatch({ type: LOAD });
    dispatch({ type: SEARCH });
    const res = await axios.get(
      `/api/roles/${searchTerm.term}/${page}/${limit}`
    );
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

export const updateLimit = (newLimit) => (dispatch) => {
  //set the roles per page
  dispatch({ type: UPDATE_LIMIT, payload: newLimit });
  //then we need to get the no.roles we want. It should be the search function
  //dispatch(getRoles(pageNo = ))
};

export const updatePage = (page, limit) => (dispatch) => {
  console.log("pageno act", page, limit);
  dispatch(getRoles(page, limit));
  dispatch({ type: UPDATE_PAGE, payload: page });
};
