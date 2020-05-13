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
import {
  adminCreateHousehold,
  deleteHousehold,
} from "../../actions/households";
import "./households.scss";

const HouseholdItems = ({
  household,
  adminCreateHousehold,
  deleteHousehold,
  view: { search, limit, page },
  auth: { activeUserId },
}) => {
  const [rowData, setRowData] = useState({
    id: household._id,
    adminId: activeUserId,
    house: household.house,
    street: household.street,
    postcode: household.postcode,
    occupants: household.occupants,
    needs: household.needs,
    volunteersCovered: household.volunteersCovered,
    lastVisit: household.lastVisit,
    nextVisit: household.nextVisit,
    lastVisitCoveredNeeds: household.lastVisitCoveredNeeds,
    needsCoveredProportion: household.needsCoveredProportion,
    editing: false,
    term: search,
    limit: limit,
    page: page,
  });
  const {
    house,
    street,
    postcode,
    occupants,
    needs,
    volunteersCovered,
    lastVisit,
    nextVisit,
    lastVisitCoveredNeeds,
    needsCoveredProportion,
    id,
    editing,
  } = rowData;

  const [hidingExpanded, setHidingExpanded] = useState({
    hidingExpanded: true,
  });

  const onChange = (e) => {
    setRowData({ ...rowData, [e.target.name]: e.target.value, editing: true });
  };

  const toggleShowExpanded = () => {
    setHidingExpanded(!hidingExpanded);
  };

  const onSaveHousehold = (e) => {
    e.preventDefault();

    if (
      household.house == rowData.house &&
      household.street === rowData.street &&
      household.postcode === rowData.postcode &&
      household.occupants === rowData.occupants &&
      household.needs === rowData.needs &&
      household.volunteersCovered === rowData.volunteersCovered &&
      household.lastVisitCoveredNeeds === rowData.lastVisitCoveredNeeds &&
      household.lastVisit === rowData.lastVisit &&
      household.nextVisit === rowData.nextVisit &&
      household.needsCoveredProportion === rowData.needsCoveredProportion
    ) {
      return false;
    }
    adminCreateHousehold(rowData, household._id !== "temp");
    setRowData({ ...rowData, _id: household._id, editing: false });
  };

  return (
    <Fragment>
      {!hidingExpanded ? (
        <Fragment>
          <tr key={household._id}>
            <td>House</td>
            <td>{house}</td>
            <td>Street</td>
            <td>{street}</td>
          </tr>
          <tr>
            <td>Postcode</td>
            <td>{postcode}</td>
            <td>No. Occupants</td>
            <td>{occupants}</td>
          </tr>
          <tr>
            <td>Needs</td>
            <td>{needs}</td>
          </tr>
          <tr>
            <td>Volunteers Covered</td>
            <td>{volunteersCovered}</td>
            <td>Last Visit Covered Needs</td>
            <td>{lastVisitCoveredNeeds}</td>
          </tr>
          <tr>
            <td>Last Visited</td>
            <td>{lastVisit}</td>
            <td>Next Visit</td>
            <td>{nextVisit}</td>
          </tr>
        </Fragment>
      ) : (
        <tr key={household._id}>
          <td>
            <input
              className="householdInput"
              type="text"
              placeholder="House/No."
              name="house"
              value={house === null ? "" : house}
              onChange={(e) => onChange(e)}
            />
          </td>
          <td>
            <input
              className="householdInput"
              type="text"
              placeholder="Street"
              name="street"
              value={street}
              onChange={(e) => onChange(e)}
            />
          </td>
          <td>
            <input
              className="householdInput"
              type="text"
              placeholder="Postcode"
              name="postcode"
              value={postcode === null ? "" : postcode}
              onChange={(e) => onChange(e)}
            />
          </td>
          <td>
            <input
              className="householdInput"
              type="number"
              placeholder="No. Occupants"
              name="occupants"
              value={occupants}
              onChange={(e) => onChange(e)}
            />
          </td>
          <td>
            <input
              className="householdInput"
              type="text"
              placeholder="Needs"
              name="needs"
              value={needs === null ? "" : needs}
              onChange={(e) => onChange(e)}
            />
          </td>
          <td>
            <input
              className="householdInput"
              type="date"
              placeholder="Last Visited"
              name="lastVisit"
              value={lastVisit}
              onChange={(e) => onChange(e)}
            />
          </td>
          <td
            className={editing ? "item-table-editing" : "item-table-save"}
            onClick={(e) => onSaveHousehold(e)}
          >
            <FontAwesomeIcon icon={editing ? faSave : faCheckCircle} />
          </td>
          <td onClick={() => toggleShowExpanded()}>
            {hidingExpanded ? "More Details" : "Less"}
          </td>
          <td
            className="item-table-delete"
            onClick={() => deleteHousehold(search, page, limit, rowData)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </td>
        </tr>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  view: state.view,
  role: state.role,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  adminCreateHousehold,
  deleteHousehold,
})(HouseholdItems);