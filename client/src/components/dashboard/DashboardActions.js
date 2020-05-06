import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserFriends,
  faAddressCard,
  faTasks,
  faHistory,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import "./dashboard.scss";

const DashboardActions = ({ auth: { user } }) => {
  return (
    <div className="action-list">
      {/* Global Admin section */}
      {/* Group Admin section */}
      {/* Project Admin section */}
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
      <Link to="/households">
        <div className="action-item" data-tip="Houeholds" data-type="success">
          <FontAwesomeIcon icon={faHome} size="lg" />
        </div>
      </Link>
      <ReactTooltip />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(DashboardActions);
