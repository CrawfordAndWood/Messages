import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { getData, addEmptyItem } from "../../actions/view";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import RoleItem from "./RoleItem";
import SortColumn from "../table/SortColumn";
import Pagination from "../table/Pagination";
import Search from "../table/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./role.scss";

const RoleTable = ({
  getData,
  addEmptyItem,
  view: { data, loading, canAddNewRow },
}) => {
  useEffect(() => {
    getData("roles");
  }, []);

  return (
    <Fragment>
      <Search route="roles" />
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <table className="table">
            <thead>
              <tr>
                <th>
                  Name
                  <SortColumn name={"name"} />
                </th>
                <th
                  className={
                    canAddNewRow ? "role-table-save" : "role-table-disabled"
                  }
                  onClick={() => (canAddNewRow ? addEmptyItem() : null)}
                >
                  <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody className="roles">
              {data.length > 0 ? (
                <Fragment>
                  {data.map((role) => (
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

const mapStateToProps = (state) => ({
  view: state.view,
});

export default connect(mapStateToProps, {
  getData,
  addEmptyItem,
})(RoleTable);
