import { sortTableColumn } from "../utils/tableFunctions";
import {
  ADD_EMPTY_USER,
  GET_USER,
  GET_USERS,
  UPDATE_USER,
  SORT,
} from "../actions/types";

const initialState = {
  user: null,
  users: [],
  sortColumn: "",
  sortDescending: true,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_EMPTY_USER:
      return {
        ...state,
        users: [payload, ...state.data],
        loading: false,
        canAddNewRow: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        users: [...state.users, payload],
        loading: false,
        canAddNewRole: true,
        searchTerm: null,
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false,
        canAddNewRole: true,
      };
    case GET_USERS:
      return {
        ...state,
        users: payload
          .slice()
          .sort(sortTableColumn(state.sortColumn, state.sortDescending)),
        loading: false,
        canAddNewRole: true,
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
    default:
      return state;
  }
}
