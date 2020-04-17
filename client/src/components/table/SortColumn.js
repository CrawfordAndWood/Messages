import React, { Fragment } from "react";
import { connect } from "react-redux";

export const SortColumn = ({
  name,
  sort,
  sortDescending,
  table: { sortColumn },
}) => {
  return (
    <FontAwesomeIcon
      onClick={() => sort(name, sortColumn)}
      className="table-sort-icon"
      icon={sortDescending ? faChevronCircleDown : faChevronCircleUp}
      size="lg"
    />
  );
};
const mapStateToProps = (state) => ({
  table: state.table,
});

export default connect(mapStateToProps, {
  sort,
})(SortColumn);
