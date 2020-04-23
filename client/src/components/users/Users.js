import React, { Fragment, useEffect } from "react";
import "./users.scss";
import { getData, addEmptyItem, setDefaultColumn } from "../../actions/view";
import { getUsers, addEmptyUser } from "../../actions/user";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import SortColumn from "../table/SortColumn";
import Pagination from "../table/Pagination";
import Search from "../table/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import UserItems from "./UserItems";

const Users = ({
  getUsers,
  addEmptyUser,
  view: { loading, canAddNewRow },
  user: { users },
}) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Fragment>
      <Search route="users/user-management" />
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <table className="table user-management-table">
            <thead>
              <tr>
                <th>
                  Email
                  <SortColumn name={"email"} />
                </th>
                <th>
                  Name
                  <SortColumn name={"name"} />
                </th>
                <th>
                  Postcode
                  <SortColumn name={"postcode"} />
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
                    <UserItems key={user._id} user={user} />
                  ))}
                </Fragment>
              ) : (
                <tr>
                  <td>No Users found...</td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination />
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  view: state.view,
  user: state.user,
});

export default connect(mapStateToProps, {
  getUsers,
  addEmptyUser,
})(Users);
