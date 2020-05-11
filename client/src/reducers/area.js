import { sortTableColumn } from "../utils/tableFunctions";
import {
  ADD_EMPTY_AREA,
  GET_AREA,
  GET_AREAS,
  UPDATE_AREA,
  SORT,
  LOAD,
  SORT_BY_AREA,
  SORT_BY_NEW_AREA,
} from "../actions/types";

const initialState = {
  area: null,
  areas: [],
  sortColumn: "",
  sortDescending: true,
  loading: true,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_EMPTY_AREA:
      return {
        ...state,
        areas: [payload, ...state.areas],
        loading: false,
        canAddNewRow: true,
      };
    case UPDATE_AREA:
      return {
        ...state,
        areas: [...state.areas, payload],
        loading: false,
        canAddNewUSer: true,
        searchTerm: null,
      };
    case GET_AREA:
      return {
        ...state,
        area: payload,
        loading: false,
        canAddNewarea: true,
      };
    case GET_AREAS:
      return {
        ...state,
        areas: payload
          .slice()
          .sort(sortTableColumn(state.sortColumn, state.sortDescending)),
        loading: false,
        canAddNewarea: true,
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
        areas: state.areas
          .slice()
          .sort(sortTableColumn(payload, !state.sortDescending)),
        sortColumn: payload,
        sortDescending: !state.sortDescending,
      };
    case SORT_BY_AREA:
      return {
        ...state,
        loading: false,
        areas: state.areas
          .slice()
          .sort(sortTableColumn(payload, !state.sortDescending)),
        sortDescending: !state.sortDescending,
      };
    case SORT_BY_NEW_AREA:
      return {
        ...state,
        loading: false,
        areas: state.areas.slice().sort(sortTableColumn(payload, true)),
        sortDescending: true,
        sortColumn: payload,
      };
    default:
      return state;
  }
}
