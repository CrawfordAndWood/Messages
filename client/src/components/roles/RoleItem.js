import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./role.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTrash } from "@fortawesome/free-solid-svg-icons";

const RoleItem = ({ role }) => {
  return (
    <tr>
      <td>{role.name}</td>
      <td className="role-table-save">
        <FontAwesomeIcon icon={faCheckCircle} />
      </td>
      <td className="role-table-delete">
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
};

RoleItem.propTypes = {
  role: PropTypes.object.isRequired
};

export default RoleItem;
