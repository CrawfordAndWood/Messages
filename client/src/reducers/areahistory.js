import { sortTableColumn } from "../utils/tableFunctions";
import {
  GET_AREA_HISTORY,
  SORT_BY_NEW_AREA_HISTORY,
  SORT_BY_AREA_HISTORY,
  LOAD,
} from "../actions/types";

const initialState = {
  areahistory: [],
  sortColumn: "date",
  sortDescending: false,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_AREA_HISTORY:
      return {
        ...state,
        areahistory: payload
          .slice()
          .sort(sortTableColumn(state.sortColumn, state.sortDescending)),
        loading: false,
      };
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case SORT_BY_AREA_HISTORY:
      return {
        ...state,
        loading: false,
        areahistory: state.areahistory
          .slice()
          .sort(sortTableColumn(payload, !state.sortDescending)),
        sortDescending: !state.sortDescending,
      };
    case SORT_BY_NEW_AREA_HISTORY:
      return {
        ...state,
        loading: false,
        areahistory: state.areahistory
          .slice()
          .sort(sortTableColumn(payload, true)),
        sortDescending: true,
        sortColumn: payload,
      };
    default:
      return state;
  }
}
