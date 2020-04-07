import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faAddressCard,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import "./dashboard.scss";

const DashboardActions = () => {
  return (
    <div className="action-list">
      <Link to="/edit-profile">
        <div
          className="action-item"
          data-tip="Edit Profile"
          data-type="success"
        >
          <FontAwesomeIcon icon={faAddressCard} size="lg" />
        </div>
      </Link>

      <div className="action-item" data-tip="Add New User" data-type="success">
        <FontAwesomeIcon icon={faUserPlus} size="lg" />
        <Link to="/add-new-user"></Link>
      </div>
      <Link to="/roles">
        <div
          className="action-item"
          data-tip="Manage Roles"
          data-type="success"
        >
          <FontAwesomeIcon icon={faTasks} size="lg" />
        </div>
      </Link>
      <ReactTooltip />
    </div>
  );
};

export default DashboardActions;
