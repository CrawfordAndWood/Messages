import { sortTableColumn } from "../utils/tableFunctions";
import {
  GET_HOUSEHOLD_HISTORY,
  SORT_BY_NEW_HOUSEHOLD_HISTORY,
  SORT_BY_HOUSEHOLD_HISTORY,
  LOAD,
} from "../actions/types";

const initialState = {
  householdhistory: [],
  sortColumn: "date",
  sortDescending: false,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_HOUSEHOLD_HISTORY:
      return {
        ...state,
        householdhistory: payload
          .slice()
          .sort(sortTableColumn(state.sortColumn, state.sortDescending)),
        loading: false,
      };
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case SORT_BY_HOUSEHOLD_HISTORY:
      return {
        ...state,
        loading: false,
        householdhistory: state.householdhistory
          .slice()
          .sort(sortTableColumn(payload, !state.sortDescending)),
        sortDescending: !state.sortDescending,
      };
    case SORT_BY_NEW_HOUSEHOLD_HISTORY:
      return {
        ...state,
        loading: false,
        householdhistory: state.householdhistory
          .slice()
          .sort(sortTableColumn(payload, true)),
        sortDescending: true,
        sortColumn: payload,
      };
    default:
      return state;
  }
}
