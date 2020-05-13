import React, { Fragment, useState } from "react";
import "../table/table.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTrash,
  faSave,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { adminCreateArea, deleteArea } from "../../actions/area";
import "./areas.scss";
import { resetSearch } from "../../actions/userhistory";

const AreaItems = ({
  area,
  adminCreateArea,
  deleteArea,
  view: { search, limit, page },
  auth: { activeUserId },
}) => {
  const [rowData, setRowData] = useState({
    id: area._id,
    adminId: activeUserId,
    code: area.code,
    name: area.name,
    postcodes: area.postcodes,
    adminEmails:
      area.admins !== undefined
        ? area.admins.map((aa) => `${aa.email}  \n`)
        : "",
    editing: false,
    term: search,
    limit: limit,
    page: page,
  });
  const { code, name, id, postcodes, editing, adminEmails } = rowData;

  const onChange = (e) => {
    setRowData({ ...rowData, [e.target.name]: e.target.value, editing: true });
  };
  const onSaveArea = (e) => {
    e.preventDefault();
    if (
      area.name == rowData.name &&
      area.code === rowData.code &&
      area.postcodes === rowData.postcodes
    ) {
      return false;
    }
    let result = adminCreateArea(rowData, area._id !== "temp");
    setRowData({
      ...rowData,
      _id: area._id,
      editing: false,
    });
    console.log("res", result);
  };

  return (
    <tr key={area._id}>
      <td>
        <input
          className="areaInput"
          type="text"
          placeholder="Code"
          name="code"
          value={code === null ? "" : code}
          onChange={(e) => onChange(e)}
        />
      </td>
      <td>
        <input
          className="areaInput"
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
      </td>
      <td>
        <input
          className="areaInput"
          type="text"
          placeholder="Postcodes"
          name="postcodes"
          value={postcodes}
          onChange={(e) => onChange(e)}
        />
      </td>
      <td>{adminEmails}</td>
      <td
        className={
          editing || name === "" ? "item-table-editing" : "item-table-save"
        }
        onClick={(e) => onSaveArea(e)}
      >
        <FontAwesomeIcon
          icon={editing || name === "" ? faSave : faCheckCircle}
        />
      </td>
      <td
        className="item-table-delete"
        onClick={() => deleteArea(search, page, limit, rowData)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
};

const mapStateToProps = (state) => ({
  view: state.view,
  role: state.role,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  adminCreateArea,
  deleteArea,
})(AreaItems);
