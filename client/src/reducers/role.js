import { sortTableColumn } from "../utils/tableFunctions";
import {
  ADD_ROLE,
  ROLE_ERROR,
  GET_ROLE,
  GET_ROLES,
  UPDATE_ROLE,
  ADD_EMPTY_ROW,
  SORT_BY_NAME,
  SEARCH,
  RESET_SEARCH,
  LOAD,
} from "../actions/types";
import { JsonWebTokenError } from "jsonwebtoken";

const initialState = {
  role: null,
  roles: [],
  loading: true,
  error: {},
  canAddNewRole: true,
  sortDescending: true,
  sortColumn: "name",
  searchTerm: "",
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_EMPTY_ROW:
      return {
        ...state,
        roles: [...state.roles, payload],
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
    case SEARCH:
      return {
        ...state,
        searchTerm: payload,
        //You shouldn't just auto filter cos you'll have it jump the fuckl about
        //instead do some results found shit
        roles: state.roles.filter((r) =>
          r.name.toLowerCase().includes(payload)
        ),
      };
    case RESET_SEARCH:
      return {
        ...state,
        searchTerm: null,
      };
    case ROLE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case SORT_BY_NAME:
      return {
        ...state,
        loading: false,
        roles: state.roles
          .slice()
          .sort(sortTableColumn(payload, !state.sortDescending)),
        sortColumn: payload,
        sortDescending: !state.sortDescending,
      };
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
