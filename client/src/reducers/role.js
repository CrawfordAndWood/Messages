import {
  ADD_ROLE,
  ROLE_ERROR,
  GET_ROLE,
  GET_ROLES,
  UPDATE_ROLE,
  ADD_EMPTY_ROW,
} from "../actions/types";

const initialState = {
  role: null,
  roles: [],
  loading: true,
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_EMPTY_ROW:
    case ADD_ROLE:
    case UPDATE_ROLE:
      return {
        ...state,
        roles: [...state.roles, payload],
        loading: false,
      };
    case GET_ROLE:
      return {
        ...state,
        role: payload,
        loading: false,
      };
    case GET_ROLES:
      return {
        ...state,
        roles: payload,
        loading: false,
      };
    case ROLE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
