import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserPlus,
  faAddressCard,
  faTasks,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import "./dashboard.scss";

const DashboardActions = () => {
  return (
    <div className="action-list">
      <Link to="/edit-user">
        <div
          className="action-item"
          data-tip="Edit Your Profile"
          data-type="success"
        >
          <FontAwesomeIcon icon={faAddressCard} size="lg" />
        </div>
      </Link>
      <Link to="/roles">
        <div
          className="action-item"
          data-tip="Manage Roles"
          data-type="success"
        >
          <FontAwesomeIcon icon={faTasks} size="lg" />
        </div>
      </Link>
      <Link to="/users">
        <div
          className="action-item"
          data-tip="Manage Users"
          data-type="success"
        >
          <FontAwesomeIcon icon={faUser} size="lg" />
        </div>
      </Link>
      <Link to="/history">
        <div className="action-item" data-tip="Event Log" data-type="success">
          <FontAwesomeIcon icon={faHistory} size="lg" />
        </div>
      </Link>
      <ReactTooltip />
    </div>
  );
};

export default DashboardActions;
