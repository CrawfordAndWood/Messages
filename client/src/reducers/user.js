import { sortTableColumn } from "../utils/tableFunctions";
import {
  ADD_EMPTY_USER,
  GET_USER,
  GET_USERS,
  UPDATE_USER,
  SORT,
  LOAD,
  SORT_BY_USER,
  SORT_BY_NEW_USER,
} from "../actions/types";

const initialState = {
  user: null,
  users: [],
  sortColumn: "",
  sortDescending: true,
  loading: true,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_EMPTY_USER:
      return {
        ...state,
        users: [payload, ...state.users],
        loading: false,
        canAddNewRow: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        users: [...state.users, payload],
        loading: false,
        canAddNewUSer: true,
        searchTerm: null,
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false,
        canAddNewUser: true,
      };
    case GET_USERS:
      return {
        ...state,
        users: payload
          .slice()
          .sort(sortTableColumn(state.sortColumn, state.sortDescending)),
        loading: false,
        canAddNewUser: true,
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
        users: state.users
          .slice()
          .sort(sortTableColumn(payload, !state.sortDescending)),
        sortColumn: payload,
        sortDescending: !state.sortDescending,
      };
    case SORT_BY_USER:
      return {
        ...state,
        loading: false,
        users: state.users
          .slice()
          .sort(sortTableColumn(payload, !state.sortDescending)),
        sortDescending: !state.sortDescending,
      };
    case SORT_BY_NEW_USER:
      return {
        ...state,
        loading: false,
        users: state.users.slice().sort(sortTableColumn(payload, true)),
        sortDescending: true,
        sortColumn: payload,
      };
    default:
      return state;
  }
}
