import React, { Fragment, useEffect } from "react";
import {
  getAreas,
  addEmptyArea,
  resetSearch,
  sort,
  updatePage,
  updateLimit,
} from "../../actions/area";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import SortColumn from "../table/SortColumn";
import Pagination from "../table/Pagination";
import Search from "../table/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import AreaItems from "./AreaItems";
import { getRoles } from "../../actions/role";
import "./areas.scss";

const Areas = ({
  getAreas,
  addEmptyArea,
  resetSearch,
  sort,
  updatePage,
  updateLimit,
  view: { canAddNewRow },
  area: { loading, areas, sortDescending },
}) => {
  useEffect(() => {
    getAreas();
    console.log(canAddNewRow, "new r?");
  }, []);
  return (
    <Fragment>
      <Search searchFn={getAreas} resetFn={resetSearch} />
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <table className="table area-management-table">
            <thead>
              <tr>
                <th>
                  Code
                  <SortColumn
                    columnName={"code"}
                    sortFn={sort}
                    sortDescending={sortDescending}
                  />
                </th>
                <th>
                  Name
                  <SortColumn
                    columnName={"name"}
                    sortFn={sort}
                    sortDescending={sortDescending}
                  />
                </th>
                <th>Postcodes</th>
                <th
                  className={
                    canAddNewRow ? "area-table-save" : "area-table-disabled"
                  }
                  onClick={() => (canAddNewRow ? addEmptyArea() : null)}
                >
                  <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody className="areas">
              {areas !== undefined ? (
                <Fragment>
                  {areas.map((area) => (
                    <AreaItems key={area._id} area={area} />
                  ))}
                </Fragment>
              ) : (
                <tr>
                  <td>No Areas found...</td>
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
  area: state.area,
});

export default connect(mapStateToProps, {
  getRoles,
  getAreas,
  addEmptyArea,
  resetSearch,
  sort,
  updatePage,
  updateLimit,
})(Areas);
