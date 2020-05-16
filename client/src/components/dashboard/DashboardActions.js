import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faHome } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import "./dashboard.scss";

const DashboardActions = () => {
  return (
    <div className="dashboard action-list">
      <div>
        <Link to="/edit-user">
          <div
            className="action-item"
            data-tip="Edit Your Profile"
            data-type="success"
          >
            <FontAwesomeIcon icon={faAddressCard} size="lg" />
          </div>
        </Link>
      </div>
      <Link to="/households">
        <div className="action-item" data-tip="Houeholds" data-type="success">
          <FontAwesomeIcon icon={faHome} size="lg" />
        </div>
      </Link>
      <ReactTooltip />
    </div>
  );
};

export default DashboardActions;
