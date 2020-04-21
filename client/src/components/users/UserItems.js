import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import "./users.scss";
import "../table/table.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTrash,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { createItem, deleteItem } from "../../actions/view";

const UserItems = ({
  user,
  createItem,
  deleteItem,
  roles,
  view: { search, route, limit, page },
}) => {
  const [rowData, setRowData] = useState({
    id: user._id,
    postcode: user.postcode,
    email: user.email,
    name: user.name,
    role: user.role,
    editing: false,
    term: search,
    limit: limit,
    page: page,
  });
  const { email, postcode, name, role, id, editing } = rowData;

  const onChange = (e) => {
    setRowData({ ...rowData, [e.target.name]: e.target.value, editing: true });
  };

  const onSaveUser = (e) => {
    e.preventDefault();
    console.log("save edit2");

    if (
      user.name == rowData.name &&
      user.email == rowData.email &&
      user.postcode === rowData.postcode &&
      user.role === rowData.role
    )
      return false;
    console.log("save edit3");

    createItem(rowData, route, user._id !== "temp");
    setRowData({ ...rowData, _id: user._id, editing: false });
  };

  return (
    <tr key={user._id}>
      <td>
        <input
          className="userInput"
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
        />
      </td>
      <td>
        <input
          className="userInput"
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
      </td>
      <td>
        <input
          className="userInput"
          type="text"
          placeholder="Postcode"
          name="postcode"
          value={postcode === null ? "" : postcode}
          onChange={(e) => onChange(e)}
        />
      </td>
      <td>
        {" "}
        <select onChange={(e) => onChange(e)} defaultValue={""}>
          {roles.map((role) => (
            <option key={role._id}>{role.name}</option>
          ))}
          {/* <option value="roleid1">Global Admin</option>
          <option value="roleid2">Group Admin</option>
          <option value="roleid3">Project Admin</option> */}
        </select>{" "}
      </td>
      <td
        className={
          editing || name === "" ? "item-table-editing" : "item-table-save"
        }
        onClick={(e) => onSaveUser(e)}
      >
        <FontAwesomeIcon
          icon={editing || name === "" ? faSave : faCheckCircle}
        />
      </td>
      <td
        className="item-table-delete"
        onClick={() => deleteItem(route, search, page, limit, rowData)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
};

const mapStateToProps = (state) => ({
  view: state.view,
});

export default connect(mapStateToProps, { createItem, deleteItem })(UserItems);
