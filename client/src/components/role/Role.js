import React, { useState, Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRoles, createRole } from "../../actions/role";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./role.scss";

const Role = ({ role: { role, loading }, getRoles, createRole, history }) => {
  const [formData, setFormData] = useState({
    name: ""
  });

  useEffect(() => {
    getRoles();
    setFormData({
      name: loading || !role.name ? "" : role.name
    });
  }, [loading]);

  const { name } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createRole(formData, history, true);
  };
  return (
    <Fragment>
      <div>
        <h2>Role Management</h2>
        <p>
          Below is going to be a table where we can add, edit and delete roles.
          I can have one save changes button that changes colour if any changes
          have been made
        </p>
      </div>
      <div className="table-outer">
        <table className="table table-editable roles-table">
          <thead>
            <tr>
              <th>Roles</th>
              <th>Save</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                This one needs to be wider and we're looping through all roles
              </td>
              <td className="role-table-save">
                <FontAwesomeIcon icon={faCheckCircle} />
              </td>
              <td className="role-table-delete">
                <FontAwesomeIcon icon={faTrash} />
              </td>{" "}
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  role: state.role,
  roles: state.roles
});

Role.propTypes = {
  name: PropTypes.string.isRequired
};

export default connect(mapStateToProps, { getRoles, createRole })(
  withRouter(Role)
);
