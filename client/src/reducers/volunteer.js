import { sortTableColumn } from "../utils/tableFunctions";
import {
  ADD_EMPTY_VOLUNTEER,
  GET_VOLUNTEER,
  GET_VOLUNTEERS,
  UPDATE_VOLUNTEER,
  SORT,
  LOAD,
  SORT_BY_VOLUNTEER,
  SORT_BY_NEW_VOLUNTEER,
} from "../actions/types";

const initialState = {
  volunteer: null,
  volunteers: [],
  sortColumn: "",
  sortDescending: true,
  loading: true,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_EMPTY_VOLUNTEER:
      return {
        ...state,
        volunteers: [payload, ...state.volunteers],
        loading: false,
        canAddNewRow: true,
      };
    case UPDATE_VOLUNTEER:
      return {
        ...state,
        volunteers: [...state.volunteers, payload],
        loading: false,
        canAddNewUSer: true,
        searchTerm: null,
      };
    case GET_VOLUNTEER:
      return {
        ...state,
        volunteer: payload,
        loading: false,
        canAddNewvolunteer: true,
      };
    case GET_VOLUNTEERS:
      return {
        ...state,
        volunteers: payload
          .slice()
          .sort(sortTableColumn(state.sortColumn, state.sortDescending)),
        loading: false,
        canAddNewvolunteer: true,
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
        volunteers: state.volunteers
          .slice()
          .sort(sortTableColumn(payload, !state.sortDescending)),
        sortColumn: payload,
        sortDescending: !state.sortDescending,
      };
    case SORT_BY_VOLUNTEER:
      return {
        ...state,
        loading: false,
        volunteers: state.volunteers
          .slice()
          .sort(sortTableColumn(payload, !state.sortDescending)),
        sortDescending: !state.sortDescending,
      };
    case SORT_BY_NEW_VOLUNTEER:
      return {
        ...state,
        loading: false,
        volunteers: state.volunteers
          .slice()
          .sort(sortTableColumn(payload, true)),
        sortDescending: true,
        sortColumn: payload,
      };
    default:
      return state;
  }
}
