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

const RoleItem = ({
  role,
  createRole,
  deleteRole,
  roleRed: { limit, page },
}) => {
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
    if (role.name == rowData.name) return false;
    createRole(rowData, page, limit, role._id !== "temp");
    setRowData({ ...rowData, _id: role._id, editing: false });
  };

  return (
    <tr>
      <td>
        <input
          className="roleInput"
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

const mapStateToProps = (state) => ({
  roleRed: state.role,
});

export default connect(mapStateToProps, { createRole, deleteRole })(RoleItem);
