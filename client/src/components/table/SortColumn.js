import React, { Fragment } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faChevronCircleUp,
} from "@fortawesome/free-solid-svg-icons";

export const SortColumn = ({
  columnName,
  sort,
  sortDescending,
  view: { sortColumn },
}) => {
  return (
    <FontAwesomeIcon
      onClick={() => sort(columnName, sortColumn)}
      className="table-sort-icon"
      icon={sortDescending ? faChevronCircleDown : faChevronCircleUp}
      size="lg"
    />
  );
};
const mapStateToProps = (state) => ({
  view: state.view,
});

export default connect(mapStateToProps, {})(SortColumn);
