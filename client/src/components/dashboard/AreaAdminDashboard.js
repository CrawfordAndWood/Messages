import React, { Fragment, useEffect, useState } from "react";
import { getAdminAreas, updateArea } from "../../actions/area";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import "./dashboard.scss";

const AreaAdminDashboardActions = ({
  updateArea,
  getAdminAreas,
  auth: { user, loading },
  area: { area, areas },
}) => {
  useEffect(() => {
    if (areas !== null && areas.length < 1) getAdminAreas(user);
  }, []);

  const onChange = (e) => {
    let matchingArea = areas.filter((a) => a._id === e.target.value);
    updateArea(matchingArea[0]);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {area !== null ? (
            <select
              onChange={(e) => onChange(e)}
              name="areaId"
              defaultValue={area !== null ? area._id : ""}
              selected={area !== null ? area._id : ""}
            >
              {areas.map((a) => (
                <option
                  className="role-asignment-option"
                  key={a._id}
                  value={a._id}
                >
                  {a.name}
                </option>
              ))}
            </select>
          ) : (
            ""
          )}
          <p></p>
          <div className="dashboard action-list">
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

export default connect(mapStateToProps, { getAdminAreas, updateArea })(
  AreaAdminDashboardActions
);
