import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import RoleItem from "./RoleItem";
import SortColumn from "../table/SortColumn";
import Pagination from "../table/Pagination";
import Search from "../table/Search";
import { getRoles } from "../../actions/role";
import { sort } from "../../actions/view";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./role.scss";

const Roles = ({
  search,
  resetSearch,
  updateLimit,
  updatePage,
  countRoles,
  role: {
    roles,
    loading,
    canAddNewRole,
    sortDescending,
    searchTerm,
    limit,
    page,
    roleCount,
  },
  table: { items },
}) => {
  const [searchInput, setsearchInput] = useState({
    term: searchTerm,
    limit: limit,
    page: page,
  });

  const { term } = searchInput;
  useEffect(() => {
    getItems("roles");
  }, []);

  return (
    <Fragment>
      <Search />

      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <table className="table">
            <thead>
              <tr>
                <th>
                  Name
                  <SortColumn />
                </th>
                <th
                  className={
                    canAddNewRole ? "role-table-save" : "role-table-disabled"
                  }
                  onClick={() => (canAddNewItem ? addEmptyItem() : null)}
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
          <Pagination />
        </Fragment>
      )}
    </Fragment>
  );
};

Roles.propTypes = {
  getRoles: PropTypes.func.isRequired,
  role: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  role: state.role,
  table: state.table,
});

export default connect(mapStateToProps, {
  getItems,
  addEmptyRole,
})(Roles);
