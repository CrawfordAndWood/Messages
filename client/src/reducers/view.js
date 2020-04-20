import { sortTableColumn } from "../utils/tableFunctions";
import {
  VIEW_ERROR,
  ADD_EMPTY_ROW,
  EDIT_ROW,
  ADD_ITEM,
  DELETE_ITEM,
  GET_DATA,
  SORT_BY_COLUMN,
  SORT_BY_NEW_COLUMN,
  SEARCH,
  RESET_SEARCH,
  LOAD,
  UPDATE_PAGE,
  UPDATE_LIMIT,
  ITEM_COUNT,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  SET_ROUTE,
  SET_SORT_COLUMN,
} from "../actions/types";

const initialState = {
  canAddNewRow: true,
  error: {},
  itemCount: 0,
  data: {},
  tableData: {},
  limit: 10,
  loading: true,
  page: 1,
  route: "",
  search: "",
  sortDescending: true,
  sortColumn: "",
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_EMPTY_ROW:
      return {
        ...state,
        data: [payload, ...state.data],
        loading: false,
        canAddNewRow: false,
      };
    case GET_DATA:
      return {
        ...state,
        data: payload
          .slice()
          .sort(sortTableColumn(state.sortColumn, state.sortDescending)),
        loading: false,
        canAddNewRow: true,
      };
    // case GET_DATA:
    //   return {
    //     ...state,
    //     roles: payload
    //       .slice()
    //       .sort(sortTableColumn(state.sortColumn, state.sortDescending)),
    //     loading: false,
    //     canAddNewRole: true,
    //   };
    case ITEM_COUNT:
      return {
        ...state,
        itemCount: payload,
      };
    case SEARCH:
      return {
        ...state,
        search: payload,
      };
    case RESET_SEARCH:
      return {
        ...state,
        search: "",
        canAddNewRole: true,
      };
    case SET_ROUTE:
      return {
        ...state,
        route: payload,
      };
    case VIEW_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case SET_SORT_COLUMN:
      return {
        ...state,
        sortColumn: payload,
      };
    case SORT_BY_COLUMN:
      return {
        ...state,
        loading: false,
        data: state.data
          .slice()
          .sort(sortTableColumn(payload, !state.sortDescending)),
        sortDescending: !state.sortDescending,
      };
    case SORT_BY_NEW_COLUMN:
      return {
        ...state,
        loading: false,
        data: state.data.slice().sort(sortTableColumn(payload, true)),
        sortDescending: true,
        sortColumn: payload,
      };
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_LIMIT:
      return {
        ...state,
        limit: payload,
      };
    case UPDATE_PAGE:
      return {
        ...state,
        page: payload,
      };
    case INCREMENT_COUNT:
      return {
        ...state,
        itemCount: state.itemCount + 1,
      };
    case DECREMENT_COUNT:
      return {
        ...state,
        itemCount: state.itemCount - 1,
      };
    default:
      return state;
  }
}
