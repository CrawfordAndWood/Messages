import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { updateUserDetails } from "../../actions/user";

export const UserPass = ({
  setAlert,
  updateUserDetails,
  auth: { user, loading },
}) => {
  const [formData, setFormData] = useState({
    id: "",
    currentPassword: "",
    newPassword: "",
    newPassword2: "",
  });

  const { id, currentPassword, newPassword, newPassword2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== newPassword2) {
      setAlert("Passwords do not match", "danger");
    }
    updateUserDetails("password", formData);
  };

  useEffect(() => {
    setFormData({
      id: loading || user._id,
      currentPassword: "",
      newPassword: "",
      newPassword2,
    });
  }, [loading]);
  return (
    <Fragment>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="formInput"
            type="password"
            placeholder="Current Password"
            name="currentPassword"
            value={currentPassword}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="formInput"
            type="password"
            placeholder="Enter New Password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="formInput"
            type="password"
            placeholder="Repeat Password"
            name="newPassword2"
            value={newPassword2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <p>
          {" "}
          <small>
            Please enter your password before any changes can be made
          </small>
        </p>
        <input type="submit" className="btn btn-success" value="Save Changes" />
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, updateUserDetails })(
  UserPass
);
