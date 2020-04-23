import { sortTableColumn } from "../utils/tableFunctions";
import {
  ADD_EMPTY_ROLE,
  GET_ROLE,
  GET_ROLES,
  UPDATE_ROLE,
  SORT,
} from "../actions/types";

const initialState = {
  role: null,
  roles: [],
  sortColumn: "",
  sortDescending: true,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_EMPTY_ROLE:
      return {
        ...state,
        data: [payload, ...state.data],
        loading: false,
        canAddNewRow: false,
      };
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

    case SORT:
      return {
        ...state,
        loading: false,
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
