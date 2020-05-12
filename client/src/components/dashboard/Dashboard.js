import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import DashbordActions from "./DashboardActions";
import GlobalAdminDashboard from "./GlobalAdminDashboard";

const Dashboard = ({ auth: { user, loading } }) => {
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h2>Dashboard</h2>
      <p>Welcome {user && user.name}, choose an action from below.</p>
      <div className="dashboard">
        {" "}
        {user.role.code === "GLA" ? <GlobalAdminDashboard /> : ""}
        <DashbordActions />
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps)(Dashboard);
