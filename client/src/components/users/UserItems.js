import React, { Fragment, useState } from "react";
import "./users.scss";
import "../table/table.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTrash,
  faSave,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { adminCreateUser, deleteUser, resetPassword } from "../../actions/user";

const UserItems = ({
  user,
  adminCreateUser,
  deleteUser,
  resetPassword,
  roles,
  view: { search, limit, page },
  auth: { activeUserId },
}) => {
  const [rowData, setRowData] = useState({
    id: user._id,
    adminId: activeUserId,
    postcode: user.postcode,
    email: user.email,
    name: user.name,
    roleId: user.role,
    editing: false,
    term: search,
    limit: limit,
    page: page,
  });
  const { email, postcode, name, roleId, id, editing } = rowData;

  const onChange = (e) => {
    setRowData({ ...rowData, [e.target.name]: e.target.value, editing: true });
  };
  const onSaveUser = (e) => {
    e.preventDefault();

    if (
      user.name == rowData.name &&
      user.email == rowData.email &&
      user.postcode === rowData.postcode &&
      user.role === rowData.roleId
    ) {
      return false;
    }
    adminCreateUser(rowData, user._id !== "temp");
    setRowData({ ...rowData, _id: user._id, editing: false });
  };

  return (
    <tr key={user._id}>
      <td>
        <input
          className="userInput"
          type="email"
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
        {
          <select
            onChange={(e) => onChange(e)}
            name="roleId"
            defaultValue={user.role}
          >
            {user.role === undefined ? <option></option> : ""}
            {roles.map((role) => (
              <option
                className="role-asignment-option"
                key={role._id}
                value={role._id}
              >
                {role.name}
              </option>
            ))}
          </select>
        }
      </td>
      <td onClick={() => resetPassword(rowData)}>
        {" "}
        <FontAwesomeIcon
          className={id !== "temp" ? "user-table-reset-pass" : ""}
          icon={faRedo}
        />
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
        onClick={() => deleteUser(search, page, limit, rowData)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
};

const mapStateToProps = (state) => ({
  view: state.view,
  role: state.role,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  adminCreateUser,
  deleteUser,
  resetPassword,
})(UserItems);
