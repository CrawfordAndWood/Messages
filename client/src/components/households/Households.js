import React, { Fragment, useEffect } from "react";
import {
  getHouseholds,
  addEmptyHousehold,
  resetSearch,
  sort,
  updatePage,
  updateLimit,
} from "../../actions/households";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import SortColumn from "../table/SortColumn";
import Pagination from "../table/Pagination";
import Search from "../table/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import HouseholdItems from "./HouseholdItems";
import { getRoles } from "../../actions/role";
import "./households.scss";

const Households = ({
  getHouseholds,
  addEmptyHousehold,
  resetSearch,
  sort,
  updatePage,
  updateLimit,
  view: { canAddNewRow },
  household: { loading, households, sortDescending },
}) => {
  useEffect(() => {
    getHouseholds();
  }, []);
  return (
    <Fragment>
      <Search searchFn={getHouseholds} resetFn={resetSearch} />
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <table className="table household-management-table">
            <thead>
              <tr>
                <th>
                  House
                  <SortColumn
                    columnName={"house"}
                    sortFn={sort}
                    sortDescending={sortDescending}
                  />
                </th>
                <th>
                  Street
                  <SortColumn
                    columnName={"street"}
                    sortFn={sort}
                    sortDescending={sortDescending}
                  />
                </th>
                <th>
                  Postcode
                  <SortColumn
                    columnName={"postcode"}
                    sortFn={sort}
                    sortDescending={sortDescending}
                  />
                </th>
                <th>
                  Occupants
                  <SortColumn
                    columnName={"occupants"}
                    sortFn={sort}
                    sortDescending={sortDescending}
                  />
                </th>
                <th>
                  Needs
                  <SortColumn
                    columnName={"needs"}
                    sortFn={sort}
                    sortDescending={sortDescending}
                  />
                </th>
                <th>
                  Last Visited
                  <SortColumn
                    columnName={"lastVisit"}
                    sortFn={sort}
                    sortDescending={sortDescending}
                  />
                </th>
                <th
                  className={
                    canAddNewRow
                      ? "household-table-save"
                      : "household-table-disabled"
                  }
                  onClick={() => (canAddNewRow ? addEmptyHousehold() : null)}
                >
                  <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody className="households">
              {households !== undefined ? (
                <Fragment>
                  {households.map((household) => (
                    <HouseholdItems key={household._id} household={household} />
                  ))}
                </Fragment>
              ) : (
                <tr>
                  <td>No Households found...</td>
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
  view: state.view,
  household: state.household,
});

export default connect(mapStateToProps, {
  getRoles,
  getHouseholds,
  addEmptyHousehold,
  resetSearch,
  sort,
  updatePage,
  updateLimit,
})(Households);
