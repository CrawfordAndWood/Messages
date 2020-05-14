import React, { Fragment, useEffect } from "react";
import { getAdminAreas } from "../../actions/area";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
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

const AreaAdminDashboardActions = (
  { getAdminAreas, auth: { user, loading } },
  area
) => {
  useEffect(() => {
    getAdminAreas(user);
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="action-list">
            <Link to="/volunteers">
              <div
                className="action-item"
                data-tip="Manage Volunteers"
                data-type="success"
              >
                <FontAwesomeIcon icon={faUser} size="lg" />
              </div>
            </Link>
            {/* <Link to="/areahistory">
      <div
        className="action-item"
        data-tip="Area Event Log"
        data-type="success"
      >
        <FontAwesomeIcon icon={faHistory} size="lg" />
      </div>
    </Link> */}
            <Link to="/groups">
              <div
                className="action-item"
                data-tip="Groups"
                data-type="success"
              >
                <FontAwesomeIcon icon={faUserFriends} size="lg" />
              </div>
            </Link>
            <ReactTooltip />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  area: state.area,
});

export default connect(mapStateToProps, { getAdminAreas })(
  AreaAdminDashboardActions
);
