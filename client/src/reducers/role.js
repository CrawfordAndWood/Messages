import { sortTableColumn } from "../utils/tableFunctions";
import {
  ADD_EMPTY_ROLE,
  GET_ROLE,
  GET_ROLES,
  UPDATE_ROLE,
  SORT,
  LOAD,
} from "../actions/types";

const initialState = {
  role: null,
  roles: [],
  sortColumn: "",
  sortDescending: true,
  rolesLoading: true,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_EMPTY_ROLE:
      return {
        ...state,
        roles: [payload, ...state.roles],
        rolesLoading: false,
        canAddNewRow: false,
      };
    case UPDATE_ROLE:
      return {
        ...state,
        roles: [...state.roles, payload],
        rolesLoading: false,
        canAddNewRole: true,
        searchTerm: null,
      };
    case GET_ROLE:
      return {
        ...state,
        role: payload,
        rolesLoading: false,
        canAddNewRole: true,
      };
    case LOAD:
      return {
        ...state,
        rolesLoading: true,
      };
    case GET_ROLES:
      return {
        ...state,
        roles: payload
          .slice()
          .sort(sortTableColumn(state.sortColumn, state.sortDescending)),
        rolesLoading: false,
        canAddNewRole: true,
      };

    case SORT:
      return {
        ...state,
        rolesLoading: false,
        roles: state.roles
          .slice()
          .sort(sortTableColumn(payload, !state.sortDescending)),
        sortColumn: payload,
        sortDescending: !state.sortDescending,
      };
    default:
      return state;
  }
}
