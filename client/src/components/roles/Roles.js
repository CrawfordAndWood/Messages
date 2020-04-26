import React, { Fragment, useEffect } from "react";
import { setDefaultColumn } from "../../actions/view";
import {
  getRoles,
  addEmptyRole,
  sort,
  resetSearch,
  updatePage,
  updateLimit,
} from "../../actions/role";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import SortColumn from "../table/SortColumn";
import Pagination from "../table/Pagination";
import Search from "../table/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./role.scss";
import RoleItem from "./RoleItem";

const Roles = ({
  getRoles,
  addEmptyRole,
  updatePage,
  sort,
  resetSearch,
  updateLimit,
  view: { canAddNewRow },
  role: { rolesLoading, roles, sortDescending },
}) => {
  useEffect(() => {
    getRoles();
  }, []);

  return (
    <Fragment>
      <Search searchFn={getRoles} resetFn={resetSearch} />
      {rolesLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <table className="table">
            <thead>
              <tr>
                <th>
                  Name
                  <SortColumn
                    sortFn={sort}
                    sortDescending={sortDescending}
                    columnName={"name"}
                  />
                </th>
                <th
                  className={
                    canAddNewRow ? "role-table-save" : "role-table-disabled"
                  }
                  onClick={() => (canAddNewRow ? addEmptyRole() : null)}
                >
                  <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody className="roles">
              {roles.length > 0 ? (
                <Fragment>
                  {roles.map((role) => (
                    <RoleItem key={role._id} role={role} />
                  ))}
                </Fragment>
              ) : (
                <tr>
                  <td>No Roles found...</td>
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
  role: state.role,
});

export default connect(mapStateToProps, {
  getRoles,
  addEmptyRole,
  sort,
  resetSearch,
  updatePage,
  updateLimit,
  setDefaultColumn,
})(Roles);
