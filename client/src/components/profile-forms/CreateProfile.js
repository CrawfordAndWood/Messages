import React, { useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    addresslineone: "",
    addresslinetwo: "",
    postcode: "",
    social: ""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const { addresslineone, addresslinetwo, postcode, social } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1>Create Your Profile</h1>
      <form onSubmit={e => onSubmit(e)}>
        <div>
          {" "}
          <input
            type="text"
            placeholder="Address Line 1"
            name="addresslineone"
            value={addresslineone}
            onChange={e => onChange(e)}
          />
        </div>
        <div>
          {" "}
          <input
            type="text"
            placeholder="Address Line 2"
            name="addresslinetwo"
            value={addresslinetwo}
            onChange={e => onChange(e)}
          />
        </div>
        <div>
          {" "}
          <input
            type="text"
            placeholder="Postcode"
            name="postcode"
            value={postcode}
            onChange={e => onChange(e)}
          />
        </div>
        <div>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
          >
            Add Social
          </button>
        </div>
        {displaySocialInputs && (
          <Fragment>
            <div>
              <input
                type="text"
                placeholder="Social"
                name="social"
                value={social}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}
        <button type="Submit">Submit</button>
        <Link to="/dashboard">Dashboard</Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
