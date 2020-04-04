import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import RoleItem from "./RoleItem";
import { getRoles } from "../../actions/role";
import "./role.scss";

const Roles = ({ getRoles, role: { roles, loading } }) => {
  useEffect(() => {
    getRoles();
    console.log(loading);
  }, [getRoles]);

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
                <th />
                <th />
              </tr>
            </thead>
            <tbody className="roles">
              {roles.length > 0 ? (
                roles.map(role => <RoleItem key={role._id} role={role} />)
              ) : (
                <h4>No Roles found...</h4>
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
  role: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  role: state.role,
  roles: state.roles
});

export default connect(mapStateToProps, { getRoles })(Roles);
