import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import UserDetails from "./UserDetails";
import UserPass from "./UserPass";

const EditUser = ({ auth: { loading } }) => {
  const [editingPassword, setEditingPassword] = useState({
    editingPassword: false,
  });

  const toggleEditingPassword = () => {
    setEditingPassword(!editingPassword);
  };

  useEffect(() => {
    setEditingPassword(false);
  }, [loading]);

  return (
    <Fragment>
      <h2>Edit Profile</h2>
      <button
        type="button"
        className={editingPassword ? "btn btn-secondary" : "btn btn-primary"}
        onClick={() => toggleEditingPassword(false)}
      >
        Edit Details
      </button>
      <button
        type="button"
        className={!editingPassword ? "btn btn-secondary" : "btn btn-primary"}
        onClick={() => toggleEditingPassword(true)}
      >
        Update Password
      </button>
      {!editingPassword ? <UserDetails /> : <UserPass />}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(EditUser);
