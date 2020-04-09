import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import RoleItem from "./RoleItem";
import { getRoles, addEmptyRole } from "../../actions/role";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./role.scss";

const Roles = ({ getRoles, addEmptyRole, role: { roles, loading } }) => {
  useEffect(() => {
    getRoles();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="role-table-save" onClick={() => addEmptyRole()}>
                  <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody className="roles">
              {roles.length > 0 ? (
                roles.map((role) => <RoleItem key={role._id} role={role} />)
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
  roles: state.roles,
});

export default connect(mapStateToProps, { getRoles, addEmptyRole })(Roles);
