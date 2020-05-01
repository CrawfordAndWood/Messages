import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { updateUserDetails } from "../../actions/user";

export const UserDetails = ({ updateUserDetails, auth: { user, loading } }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    postcode: "",
  });

  const { id, name, email, postcode } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    updateUserDetails("details", formData);
  };

  useEffect(() => {
    setFormData({
      id: loading || user._id,
      name: loading || !user.name ? "" : user.name,
      email: loading || !user.email ? "" : user.email,
      postcode: loading || !user.postcode ? "" : user.postcode,
    });
  }, [loading]);

  return (
    <Fragment>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="formInput"
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="formInput"
            type="email"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="formInput"
            type="text"
            placeholder="Postcode"
            name="postcode"
            value={postcode}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type="submit" className="btn btn-success" value="Save Changes" />
      </form>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, updateUserDetails })(
  UserDetails
);
