import { sortTableColumn } from "../utils/tableFunctions";
import {
  TABLE_ERROR,
  ADD_EMPTY_ROW,
  EDIT_ROW,
  ADD_ITEM,
  DELETE_ITEM,
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
} from "../actions/types";

const initialState = {
  canAddNewRow: true,
  error: {},
  itemCount: 0,
  data: {},
  limit: 10,
  loading: true,
  page: 1,
  searchTerm: "",
  sortDescending: true,
  sortColumn: "",
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_EMPTY_ROW:
      return {
        ...state,
        loading: false,
        canAddNewRow: false,
      };
    case ITEM_COUNT:
      return {
        ...state,
        itemCount: payload,
      };
    case SEARCH:
      return {
        ...state,
        searchTerm: payload,
      };
    case RESET_SEARCH:
      return {
        ...state,
        searchTerm: "",
      };
    case TABLE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case SORT_BY_COLUMN:
      return {
        ...state,
        loading: false,
        items: state.items
          .slice()
          .sort(sortTableColumn(payload, !state.sortDescending)),
        sortDescending: !state.sortDescending,
      };
    case SORT_BY_NEW_COLUMN:
      return {
        ...state,
        loading: false,
        items: state.items.slice().sort(sortTableColumn(payload, true)),
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