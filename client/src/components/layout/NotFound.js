import React, { Fragment } from "react";
import { connect } from "react-redux";

const NotFound = isAuthenticated => {
  return (
    <Fragment>
      <h2>Sorry, Not found</h2>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(NotFound);
