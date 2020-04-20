import React, { Fragment } from "react";
import { connect } from "react-redux";
import { sort } from "../../actions/view";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faChevronCircleUp,
} from "@fortawesome/free-solid-svg-icons";

export const SortColumn = ({
  /*props passed down*/ name,
  /*redux actions*/ sort,
  /*redux state props*/
  view: { sortColumn, sortDescending },
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
  view: state.view,
});

export default connect(mapStateToProps, {
  sort,
})(SortColumn);
