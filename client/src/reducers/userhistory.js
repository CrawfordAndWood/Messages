import { sortTableColumn } from "../utils/tableFunctions";
import {
  GET_USER_HISTORY,
  SORT_BY_NEW_USER_HISTORY,
  SORT_BY_USER_HISTORY,
  LOAD,
} from "../actions/types";

const initialState = {
  userhistory: [],
  sortColumn: "date",
  sortDescending: false,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_HISTORY:
      return {
        ...state,
        userhistory: payload
          .slice()
          .sort(sortTableColumn(state.sortColumn, state.sortDescending)),
        loading: false,
      };
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case SORT_BY_USER_HISTORY:
      return {
        ...state,
        loading: false,
        userhistory: state.userhistory
          .slice()
          .sort(sortTableColumn(payload, !state.sortDescending)),
        sortDescending: !state.sortDescending,
      };
    case SORT_BY_NEW_USER_HISTORY:
      return {
        ...state,
        loading: false,
        userhistory: state.userhistory
          .slice()
          .sort(sortTableColumn(payload, true)),
        sortDescending: true,
        sortColumn: payload,
      };
    default:
      return state;
  }
}
