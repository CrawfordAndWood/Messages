import axios from "axios";
import {
  GET_HOUSEHOLD_HISTORY,
  SORT_BY_NEW_HOUSEHOLD_HISTORY,
  SORT_BY_HOUSEHOLD_HISTORY,
  ITEM_COUNT,
  VIEW_ERROR,
  RESET_SEARCH,
  UPDATE_LIMIT,
  UPDATE_PAGE,
  GET_DATA,
  SEARCH,
  LOAD,
  SET_SORT_COLUMN,
} from "./types";

export const countHouseholdHistory = (search = "") => async (dispatch) => {
  try {
    const res = await axios.get(`api/householdhistory/count/${search}`);
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

export const getHouseholdHistory = (
  search = "",
  page = 1,
  limit = 10
) => async (dispatch) => {
  //TODO factor out params into single options object.
  try {
    dispatch({ type: LOAD });
    dispatch({ type: SEARCH, payload: search });
    dispatch(countHouseholdHistory(search));
    const res = await axios.get(
      `/api/householdhistory/${search}/${page}/${limit}`
    );
    dispatch({ type: GET_HOUSEHOLD_HISTORY, payload: res.data });
    dispatch({ type: UPDATE_LIMIT, payload: limit });
    dispatch({ type: UPDATE_PAGE, payload: page });
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

export const sort = (name, sortColumn) => (dispatch) => {
  const dispatchFn =
    name === sortColumn
      ? SORT_BY_HOUSEHOLD_HISTORY
      : SORT_BY_NEW_HOUSEHOLD_HISTORY;
  dispatch({ type: dispatchFn, payload: name });
  dispatch({ type: SET_SORT_COLUMN, payload: name });
};

export const resetSearch = (limit) => (dispatch) => {
  dispatch(getHouseholdHistory("", 1, limit));
  dispatch({ type: RESET_SEARCH });
};

export const updateLimit = (search, newLimit) => (dispatch) => {
  dispatch(getHouseholdHistory(search, 1, newLimit));
  dispatch({ type: UPDATE_PAGE, payload: 1 });
  dispatch({ type: UPDATE_LIMIT, payload: newLimit });
};

export const updatePage = (search, page, limit) => (dispatch) => {
  dispatch(getHouseholdHistory(search, page, limit));
  dispatch({ type: UPDATE_PAGE, payload: page });
};
