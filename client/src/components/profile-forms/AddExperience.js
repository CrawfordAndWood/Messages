import React from "react";
import { Link, WithRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile;";

const AddExperience = props => {
  return <div></div>;
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(null, addExperience)(AddExperience);
