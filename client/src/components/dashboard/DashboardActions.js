import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import "./dashboard.scss";

const DashboardActions = () => {
  return (
    <div className="action-list">
      <div className="action-item" data-tip="Edit Profile" data-type="success">
        <Link to="/edit-profile">
          {" "}
          <FontAwesomeIcon icon={faAddressCard} size="lg" />
        </Link>
      </div>
      <div className="action-item" data-tip="Add New User" data-type="success">
        <FontAwesomeIcon icon={faUserPlus} size="lg" />
        <Link to="/add-new-user"></Link>
      </div>
      <ReactTooltip />
    </div>
  );
};

export default DashboardActions;
