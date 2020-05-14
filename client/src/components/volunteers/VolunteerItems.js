import React, { Fragment, useState } from "react";
import "./volunteers.scss";
import "../table/table.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTrash,
  faSave,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import {
  adminCreateVolunteer,
  deleteVolunteer,
  resetPassword,
} from "../../actions/volunteer";

const VolunteerItems = ({
  volunteer,
  adminCreateVolunteer,
  deleteVolunteer,
  resetPassword,
  view: { search, limit, page },
  auth: { activeUserId },
}) => {
  const [rowData, setRowData] = useState({
    id: volunteer._id,
    adminId: activeUserId,
    postcode: volunteer.postcode,
    email: volunteer.email,
    name: volunteer.name,
    editing: false,
    term: search,
    limit: limit,
    page: page,
  });
  const { email, postcode, name, roleId, id, editing } = rowData;

  const onChange = (e) => {
    setRowData({ ...rowData, [e.target.name]: e.target.value, editing: true });
  };
  const onSaveVolunteer = (e) => {
    e.preventDefault();

    if (
      volunteer.name == rowData.name &&
      volunteer.email == rowData.email &&
      volunteer.postcode === rowData.postcode
    ) {
      return false;
    }
    adminCreateVolunteer(rowData, volunteer._id !== "temp");
    setRowData({ ...rowData, _id: volunteer._id, editing: false });
  };

  return (
    <tr key={volunteer._id}>
      <td>
        <input
          className="volunteerInput"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
        />
      </td>
      <td>
        <input
          className="volunteerInput"
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
      </td>
      <td>
        <input
          className="volunteerInput"
          type="text"
          placeholder="Postcode"
          name="postcode"
          value={postcode === null ? "" : postcode}
          onChange={(e) => onChange(e)}
        />
      </td>

      <td onClick={() => resetPassword(rowData)}>
        {" "}
        <FontAwesomeIcon
          className={id !== "temp" ? "volunteer-table-reset-pass" : ""}
          icon={faRedo}
        />
      </td>
      <td
        className={
          editing || name === "" ? "item-table-editing" : "item-table-save"
        }
        onClick={(e) => onSaveVolunteer(e)}
      >
        <FontAwesomeIcon
          icon={editing || name === "" ? faSave : faCheckCircle}
        />
      </td>
      <td
        className="item-table-delete"
        onClick={() => deleteVolunteer(search, page, limit, rowData)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
};

const mapStateToProps = (state) => ({
  view: state.view,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  adminCreateVolunteer,
  deleteVolunteer,
  resetPassword,
})(VolunteerItems);
