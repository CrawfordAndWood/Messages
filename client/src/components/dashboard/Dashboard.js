import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashbordActions from "./DashboardActions";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [loading]);
  return loading || profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h2>Dashboard</h2>
      <p>Welcome {user && user.name}, choose an action from below.</p>
      {profile !== null ? (
        <Fragment>
          <DashbordActions />
        </Fragment>
      ) : (
        <Fragment>
          <p>You haven't yet setup a profile. Please add some info.</p>
          <Link to="/create-profile">Create Profile</Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
