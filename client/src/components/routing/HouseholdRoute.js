import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const HouseholdRoute = ({
  component: Component,
  auth: { isAuthenticated, user },
  household: { household },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated &&
      household !== null &&
      user !== null &&
      user.role !== null &&
      user.role.code === "H" ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
  household: state.household,
});

export default connect(mapStateToProps)(HouseholdRoute);
