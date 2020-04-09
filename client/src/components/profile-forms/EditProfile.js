import React, { useState, Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    addresslineone: "",
    addresslinetwo: "",
    postcode: "",
    social: "",
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      addresslineone:
        loading || !profile.addresslineone ? "" : profile.addresslineone,
      addresslinetwo:
        loading || !profile.addresslinetwo ? "" : profile.addresslinetwo,
      postcode: loading || !profile.postcode ? "" : profile.postcode,
      social: loading || !profile.social ? "" : profile.social,
    });
  }, [loading]);

  const { addresslineone, addresslinetwo, postcode, social } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h2>Edit Your Profile</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          {" "}
          <input
            className="formInput"
            type="text"
            placeholder="Address Line 1"
            name="addresslineone"
            value={addresslineone}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          {" "}
          <input
            className="formInput"
            type="text"
            placeholder="Address Line 2"
            name="addresslinetwo"
            value={addresslinetwo}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          {" "}
          <input
            className="formInput"
            type="text"
            placeholder="Postcode"
            name="postcode"
            value={postcode}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <button
            className="btn btn-secondary"
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
                className="formInput"
                type="text"
                placeholder="Social"
                name="social"
                value={social}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}
        <button type="Submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/dashboard">Dashboard</Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
