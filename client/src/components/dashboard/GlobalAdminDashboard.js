import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserFriends,
  faAddressCard,
  faTasks,
  faHistory,
  faHome,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import "./dashboard.scss";

const GlobalDashboardActions = () => {
  return (
    <div className="dashboard action-list">
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
      <Link to="/groups">
        <div className="action-item" data-tip="Groups" data-type="success">
          <FontAwesomeIcon icon={faUserFriends} size="lg" />
        </div>
      </Link>
      <Link to="/areas">
        <div className="action-item" data-tip="Areas" data-type="success">
          <FontAwesomeIcon icon={faMap} size="lg" />
        </div>
      </Link>
      <ReactTooltip />
    </div>
  );
};

export default GlobalDashboardActions;
