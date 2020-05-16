import React, { Fragment, useEffect } from "react";
import {
  getVolunteers,
  addEmptyVolunteer,
  resetSearch,
  sort,
  updatePage,
  updateLimit,
} from "../../actions/volunteer";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import SortColumn from "../table/SortColumn";
import Pagination from "../table/Pagination";
import Search from "../table/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import VolunteerItems from "./VolunteerItems";
import { getRoles } from "../../actions/role";
import "./volunteers.scss";

const Volunteers = ({
  getVolunteers,
  addEmptyVolunteer,
  resetSearch,
  sort,
  updatePage,
  updateLimit,
  view: { loading, canAddNewRow },
  volunteer: { volunteers, sortDescending },
  area: { area },
}) => {
  useEffect(() => {
    getVolunteers(area.code);
    console.log("current area", area);
  }, []);
  return (
    <Fragment>
      <Search searchFn={getVolunteers} searchArgs={area.code} />
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <table className="table volunteer-management-table">
            <thead>
              <tr>
                <th>
                  Name
                  <SortColumn
                    columnName={"code"}
                    sortFn={sort}
                    sortDescending={sortDescending}
                  />
                </th>
                <th>
                  Email
                  <SortColumn
                    columnName={"name"}
                    sortFn={sort}
                    sortDescending={sortDescending}
                  />
                </th>
                <th>Postcode</th>
                <th
                  className={
                    canAddNewRow
                      ? "volunteer-table-save"
                      : "volunteer-table-disabled"
                  }
                  onClick={() => (canAddNewRow ? addEmptyVolunteer() : null)}
                >
                  <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody className="volunteers">
              {volunteers !== undefined ? (
                <Fragment>
                  {volunteers.map((volunteer) => (
                    <VolunteerItems key={volunteer._id} volunteer={volunteer} />
                  ))}
                </Fragment>
              ) : (
                <tr>
                  <td>No Volunteers found...</td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination updatePageFn={updatePage} updateLimitFn={updateLimit} />
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  area: state.area,
  view: state.view,
  volunteer: state.volunteer,
});

export default connect(mapStateToProps, {
  getRoles,
  getVolunteers,
  addEmptyVolunteer,
  resetSearch,
  sort,
  updatePage,
  updateLimit,
})(Volunteers);
