import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import "./role.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTrash,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { createItem, deleteItem } from "../../actions/view";

const RoleTableItem = ({
  role,
  createItem,
  deleteItem,
  view: { limit, page },
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
    createItem(rowData, page, limit, role._id !== "temp");
    setRowData({ ...rowData, _id: role._id, editing: false });
  };

  return (
    <tr key={role._id}>
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
      <td className="item-table-delete" onClick={() => deleteItem(rowData)}>
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
};

RoleItem.propTypes = {
  role: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  view: state.view,
});

export default connect(mapStateToProps, { createItem, deleteItem })(
  RoleTableItem
);