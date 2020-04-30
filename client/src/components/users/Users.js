import React, { Fragment, useEffect } from "react";
import "./users.scss";
import {
  getUsers,
  addEmptyUser,
  resetSearch,
  sort,
  updatePage,
  updateLimit,
} from "../../actions/user";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import SortColumn from "../table/SortColumn";
import Pagination from "../table/Pagination";
import Search from "../table/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import UserItems from "./UserItems";
import { getRoles } from "../../actions/role";

const Users = ({
  getRoles,
  getUsers,
  addEmptyUser,
  resetSearch,
  sort,
  updatePage,
  updateLimit,
  view: { canAddNewRow },
  user: { loading, users, sortDescending },
  role: { rolesLoading, roles },
}) => {
  useEffect(() => {
    getRoles("", 1, 100, false);
    getUsers();
  }, []);
  return (
    <Fragment>
      <Search searchFn={getUsers} resetFn={resetSearch} />
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <table className="table user-management-table">
            <thead>
              <tr>
                <th>
                  Email
                  <SortColumn
                    columnName={"email"}
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
                <th>
                  Postcode
                  <SortColumn
                    columnName={"postcode"}
                    sortFn={sort}
                    sortDescending={sortDescending}
                  />
                </th>
                <th>Role</th>
                <th
                  className={
                    canAddNewRow ? "user-table-save" : "user-table-disabled"
                  }
                  onClick={() => (canAddNewRow ? addEmptyUser() : null)}
                >
                  <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody className="users">
              {users !== undefined ? (
                <Fragment>
                  {users.map((user) => (
                    <UserItems key={user._id} user={user} roles={roles} />
                  ))}
                </Fragment>
              ) : (
                <tr>
                  <td>No Users found...</td>
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
  user: state.user,
  role: state.role,
});

export default connect(mapStateToProps, {
  getRoles,
  getUsers,
  addEmptyUser,
  resetSearch,
  sort,
  updatePage,
  updateLimit,
})(Users);
