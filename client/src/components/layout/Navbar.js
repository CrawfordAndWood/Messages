import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import FontAwesome from "react-fontawesome";
import "./Nav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faSignOutAlt,
  faUserPlus,
  faDoorOpen
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Fragment>
      <Link to="/dashboard">
        <div className="navLink">
          <span>
            {" "}
            <FontAwesomeIcon icon={faTachometerAlt} />
            Dashboard
          </span>
        </div>
      </Link>
      <div className="navLink">
        <a onClick={logout} href="#">
          <span>
            {" "}
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </span>
        </a>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link to="/register">
        <div className="navLink">
          <span>
            <FontAwesomeIcon icon={faUserPlus} />
            Register
          </span>
        </div>
      </Link>
      <Link to="/login">
        <div className="navLink">
          <span>
            <FontAwesomeIcon icon={faDoorOpen} />
            Login
          </span>
        </div>
      </Link>
    </Fragment>
  );
  return (
    <nav className="navbar">
      <div className="title">
        <Link to="/">Messages</Link>
      </div>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
