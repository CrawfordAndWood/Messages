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
  updateLimit,
  updatePage,
} from "../../actions/role";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faChevronCircleDown,
  faChevronCircleUp,
  faSearch,
  faChevronLeft,
  faChevronRight,
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import "./role.scss";

const Roles = ({
  getRoles,
  addEmptyRole,
  sortbyName,
  search,
  resetSearch,
  updateLimit,
  updatePage,
  role: {
    roles,
    loading,
    canAddNewRole,
    sortDescending,
    searchTerm,
    limit,
    page,
  },
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
    search(searchInput, limit, page);
  };

  const onReset = () => {
    setsearchInput({
      ...searchInput,
      term: "",
    });
    resetSearch();
  };

  const onSetPage = (location) => {
    if (location < 1 || location > Math.ceil(roles.length / roles.limit)) {
      return false;
    }
    updatePage(location, limit);
  };

  const onUpdateLimit = (e) => {
    e.preventDefault();
    updateLimit(e.target.value);
  };

  return (
    <Fragment>
      <table className="search-table">
        <tbody>
          <tr>
            <td className="search-bar">
              <input
                autoComplete="off"
                className="searchInput"
                type="text"
                placeholder="Search Roles"
                name="term"
                value={term}
                onChange={(e) => onSearchChange(e)}
              />
              <FontAwesomeIcon
                icon={faSearch}
                size="lg"
                onClick={(e) => onSubmit(e)}
              />
            </td>
            <td>
              <a href="#" onClick={() => onReset()}>
                clear search{" "}
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
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
                </Fragment>
              ) : (
                <tr>
                  <td>No Roles found...</td>
                </tr>
              )}
            </tbody>
          </table>
          <table className="table roles-paging">
            <tbody>
              <tr>
                <td></td>
                <td onClick={() => onSetPage(1)}>
                  <FontAwesomeIcon icon={faChevronCircleLeft} />
                </td>
                <td onClick={() => onSetPage(page - 1)}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </td>
                <td>1 - 10 of 99</td>
                <td onClick={() => onSetPage(page + 1)}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </td>
                <td onClick={() => onSetPage(Math.ceil(roles.length / limit))}>
                  <FontAwesomeIcon icon={faChevronCircleRight} />
                </td>
                <td>
                  <select
                    id="cars"
                    onChange={(e) => onUpdateLimit(e)}
                    selected={limit}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </td>
              </tr>
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
  updateLimit,
  updatePage,
})(Roles);
