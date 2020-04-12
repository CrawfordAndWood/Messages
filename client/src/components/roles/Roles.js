import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import RoleItem from "./RoleItem";
import {
  getRoles,
  addEmptyRole,
  sortbyName,
  search,
  resetSearch,
} from "../../actions/role";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faChevronCircleDown,
  faChevronCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import "./role.scss";

const Roles = ({
  getRoles,
  addEmptyRole,
  sortbyName,
  search,
  resetSearch,
  role: { roles, loading, canAddNewRole, sortDescending, searchTerm },
}) => {
  let searching = false;

  const [searchInput, setsearchInput] = useState({
    term: searchTerm,
  });
  const { term } = searchInput;
  useEffect(() => {
    getRoles();
  }, []);

  const onSearchChange = (e) => {
    setsearchInput({
      ...searchInput,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    search(searchInput);
  };

  const onReset = () => {
    setsearchInput({
      ...searchInput,
      term: "",
    });
    resetSearch();
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div>
            <form onSubmit={(e) => onSubmit(e)}>
              <input
                className="formInput"
                type="text"
                placeholder="Search Roles"
                name="term"
                value={term}
                onChange={(e) => onSearchChange(e)}
              />
              <button type="submit">Search</button>
              <button type="button" onClick={() => onReset()}>
                Reset
              </button>
            </form>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>
                  Name
                  <FontAwesomeIcon
                    onClick={() => sortbyName()}
                    className="table-sort-icon"
                    icon={
                      sortDescending ? faChevronCircleDown : faChevronCircleUp
                    }
                    size="lg"
                  />
                </th>
                <th
                  className={
                    canAddNewRole ? "role-table-save" : "role-table-disabled"
                  }
                  onClick={() => (canAddNewRole ? addEmptyRole() : null)}
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
                  <tr>
                    <td>
                      <small>Paging</small>
                    </td>
                  </tr>
                </Fragment>
              ) : (
                <tr>
                  <td>No Roles found...</td>
                </tr>
              )}
            </tbody>
          </table>
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
});

export default connect(mapStateToProps, {
  getRoles,
  addEmptyRole,
  sortbyName,
  search,
  resetSearch,
})(Roles);
