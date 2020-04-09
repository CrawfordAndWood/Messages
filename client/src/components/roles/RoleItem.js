import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./role.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { createRole, deleteRole, getRoles } from "../../actions/role";

const RoleItem = ({ role, createRole, deleteRole, getRoles }) => {
  const [rowData, setRowData] = useState({
    id: role._id,
    name: role.name,
  });
  const [canAdd, setCanAdd] = useState(true);
  const { name, id } = rowData;
  const [deleted, setDeleted] = useState(false);

  const onChange = (e) => {
    setRowData({ ...rowData, [e.target.name]: e.target.value });
  };

  const onSaveRole = (e) => {
    e.preventDefault();

    if (canAdd) {
      createRole(rowData, role._id !== 0);
      setRowData({ ...rowData, _id: role._id });
    }

    if (role._id === 0) {
      setCanAdd(false);
    }
  };

  const onDeleteRole = (e) => {
    e.preventDefault();
    deleteRole(rowData);
    setDeleted(true);
  };

  return deleted ? null : (
    <tr>
      <td>
        <input
          className="formInput"
          type="text"
          placeholder="Role Name"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
      </td>
      <td className="role-table-save" onClick={(e) => onSaveRole(e)}>
        <FontAwesomeIcon icon={faCheckCircle} />
      </td>
      <td className="role-table-delete" onClick={(e) => onDeleteRole(e)}>
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
};

RoleItem.propTypes = {
  role: PropTypes.object.isRequired,
};

export default connect(null, { createRole, deleteRole, getRoles })(RoleItem);
