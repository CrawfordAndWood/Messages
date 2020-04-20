import { sortTableColumn } from "../utils/tableFunctions";
import {
  ADD_ROLE,
  GET_ROLE,
  GET_ROLES,
  UPDATE_ROLE,
  DELETE_ROLE,
} from "../actions/types";

const initialState = {
  role: null,
  roles: [],
  loading: true,
  error: {},
  canAddNewRole: true,
  sortDescending: true,
  sortColumn: "name",
  searchTerm: "",
  limit: 10,
  page: 1,
  roleCount: 0,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_EMPTY_ROW:
      return {
        ...state,
        roles: [payload, ...state.roles],
        loading: false,
        canAddNewRole: false,
      };
    case ADD_ROLE:
    case UPDATE_ROLE:
      return {
        ...state,
        roles: [...state.roles, payload],
        loading: false,
        canAddNewRole: true,
        searchTerm: null,
      };
    case GET_ROLE:
      return {
        ...state,
        role: payload,
        loading: false,
        canAddNewRole: true,
      };
    case GET_ROLES:
      return {
        ...state,
        roles: payload
          .slice()
          .sort(sortTableColumn(state.sortColumn, state.sortDescending)),
        loading: false,
        canAddNewRole: true,
      };
    default:
      return state;
  }
}
