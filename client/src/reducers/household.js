import { sortTableColumn } from "../utils/tableFunctions";
import {
  ADD_EMPTY_HOUSEHOLD,
  GET_HOUSEHOLD,
  GET_HOUSEHOLDS,
  UPDATE_HOUSEHOLD,
  SORT,
  LOAD,
  SORT_BY_HOUSEHOLD,
  SORT_BY_NEW_HOUSEHOLD,
} from "../actions/types";

const initialState = {
  household: null,
  households: [],
  sortColumn: "",
  sortDescending: true,
  loading: true,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_EMPTY_HOUSEHOLD:
      return {
        ...state,
        households: [payload, ...state.households],
        loading: false,
        canAddNewRow: true,
      };
    case UPDATE_HOUSEHOLD:
      return {
        ...state,
        households: [...state.households, payload],
        loading: false,
        canAddNewUSer: true,
        searchTerm: null,
      };
    case GET_HOUSEHOLD:
      return {
        ...state,
        household: payload,
        loading: false,
        canAddNewHOUSEHOLD: true,
      };
    case GET_HOUSEHOLDS:
      return {
        ...state,
        households: payload
          .slice()
          .sort(sortTableColumn(state.sortColumn, state.sortDescending)),
        loading: false,
        canAddNewHOUSEHOLD: true,
      };
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case SORT:
      return {
        ...state,
        loading: false,
        households: state.households
          .slice()
          .sort(sortTableColumn(payload, !state.sortDescending)),
        sortColumn: payload,
        sortDescending: !state.sortDescending,
      };
    case SORT_BY_HOUSEHOLD:
      return {
        ...state,
        loading: false,
        households: state.households
          .slice()
          .sort(sortTableColumn(payload, !state.sortDescending)),
        sortDescending: !state.sortDescending,
      };
    case SORT_BY_NEW_HOUSEHOLD:
      return {
        ...state,
        loading: false,
        households: state.households
          .slice()
          .sort(sortTableColumn(payload, true)),
        sortDescending: true,
        sortColumn: payload,
      };
    default:
      return state;
  }
}
