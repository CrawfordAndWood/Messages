import React, { Fragment, useState } from "react";
import "./role.scss";
import "../table/table.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTrash,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { createRole, deleteRole } from "../../actions/role";

const RoleItem = ({
  num,
  role,
  createRole,
  deleteRole,
  view: { search, route, limit, page },
}) => {
  const [rowData, setRowData] = useState({
    id: role._id,
    code: role.code,
    name: role.name,
    editing: false,
    term: search,
    limit: limit,
    page: page,
  });
  const { code, name, id, editing } = rowData;

  const onChange = (e) => {
    setRowData({ ...rowData, [e.target.name]: e.target.value, editing: true });
  };

  const onSaveRole = (e) => {
    e.preventDefault();
    if (role.name == rowData.name && role.code == rowData.code) return false;
    createRole(rowData, role._id !== "temp");
    setRowData({ ...rowData, _id: role._id, editing: false });
  };

  return (
    <tr key={role._id}>
      <td>{num}</td>
      <td>
        <input
          className="roleInput"
          type="text"
          placeholder="Code"
          name="code"
          value={code}
          onChange={(e) => onChange(e)}
        />
      </td>
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
          editing || name === "" ? "item-table-editing" : "item-table-save"
        }
        onClick={(e) => onSaveRole(e)}
      >
        <FontAwesomeIcon
          icon={editing || name === "" ? faSave : faCheckCircle}
        />
      </td>
      <td
        className="item-table-delete"
        onClick={() => deleteRole(search, page, limit, rowData)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
};

const mapStateToProps = (state) => ({
  view: state.view,
});

export default connect(mapStateToProps, {
  createRole,
  deleteRole,
})(RoleItem);
