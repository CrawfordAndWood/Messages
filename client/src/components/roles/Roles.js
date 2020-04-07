import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import RoleItem from "./RoleItem";
import { getRoles } from "../../actions/role";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./role.scss";
import { loadUser } from "../../actions/auth";

const Roles = ({ getRoles, role: { roles, loading } }) => {
  const [roleData, setRoleData] = useState({ roles: [] });
  const [canAdd, setCanAdd] = useState(true);
  useEffect(() => {
    getRoles();
    setRoleData({ roles: roles });
    console.log("useeffect after del");
  }, [loading]);

  const onAddRow = (e) => {
    e.preventDefault();

    if (canAdd) {
      setCanAdd(false);
      roleData.roles.push({ _id: 0, name: "" });
      setRoleData({ ...roleData });
    }
  };

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
                <th className="role-table-save" onClick={(e) => onAddRow(e)}>
                  <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody className="roles">
              {roleData.roles.length > 0 ? (
                roleData.roles.map((role) => (
                  <RoleItem key={role._id} role={role} canAdd={canAdd} />
                ))
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

export default connect(mapStateToProps, { getRoles })(Roles);
