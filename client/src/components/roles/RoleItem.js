import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./role.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTrash,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { createRole, deleteRole } from "../../actions/role";

const RoleItem = ({ role, createRole, deleteRole }) => {
  const [rowData, setRowData] = useState({
    id: role._id,
    name: role.name,
    editing: false,
  });
  const { name, id, editing } = rowData;

  const onChange = (e) => {
    setRowData({ ...rowData, [e.target.name]: e.target.value, editing: true });
  };

  const onSaveRole = (e) => {
    e.preventDefault();
    createRole(rowData, role._id !== 0);
    setRowData({ ...rowData, _id: role._id, editing: false });
  };

  return (
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
      <td
        className={
          editing || name === "" ? "role-table-editing" : "role-table-save"
        }
        onClick={(e) => onSaveRole(e)}
      >
        <FontAwesomeIcon
          icon={editing || name === "" ? faSave : faCheckCircle}
        />
      </td>
      <td className="role-table-delete" onClick={() => deleteRole(rowData)}>
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
};

RoleItem.propTypes = {
  role: PropTypes.object.isRequired,
};

export default connect(null, { createRole, deleteRole })(RoleItem);
