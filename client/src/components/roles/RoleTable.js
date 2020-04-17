import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import RoleItem from "./RoleItem";
import SortColumn from "../table/SortColumn";
import Pagination from "../table/Pagination";
import Search from "../table/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./role.scss";

const Roles = ({ table: { items, loading, canAddNewItem } }) => {
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
              {items.length > 0 ? (
                <Fragment>
                  {items.map((item) => (
                    <RoleItem key={item._id} role={item} />
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
  view: state.view,
});

export default connect(mapStateToProps, {
  getItems,
  addEmptyItem,
})(Roles);
