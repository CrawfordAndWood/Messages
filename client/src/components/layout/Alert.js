import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <Fragment>
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        <FontAwesomeIcon
          icon={alert.alertType === "success" ? faCheckCircle : faTimesCircle}
        />
        {alert.msg}
      </div>
    </Fragment>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
