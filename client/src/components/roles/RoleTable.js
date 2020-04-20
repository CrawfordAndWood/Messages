import React, { Fragment, useEffect } from "react";
import { getData, addEmptyItem, setDefaultColumn } from "../../actions/view";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import SortColumn from "../table/SortColumn";
import Pagination from "../table/Pagination";
import Search from "../table/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./role.scss";
import RoleTableItem from "./RoleTableItem";

const RoleTable = ({
  getData,
  addEmptyItem,
  setDefaultColumn,
  view: { data, loading, canAddNewRow },
}) => {
  useEffect(() => {
    getData("roles");
    setDefaultColumn("name");
  }, []);

  return (
    <Fragment>
      <Search route="roles" />
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <table className="table">
            <thead>
              <tr>
                <th>
                  Name
                  <SortColumn name={"name"} />
                </th>
                <th
                  className={
                    canAddNewRow ? "role-table-save" : "role-table-disabled"
                  }
                  onClick={() =>
                    canAddNewRow
                      ? addEmptyItem({ _id: "temp", name: "" })
                      : null
                  }
                >
                  <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody className="roles">
              {data.length > 0 ? (
                <Fragment>
                  {data.map((role) => (
                    <RoleTableItem key={role._id} role={role} />
                  ))}
                </Fragment>
              ) : (
                <tr>
                  <td>No Roles found...</td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination />
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  view: state.view,
});

export default connect(mapStateToProps, {
  getData,
  addEmptyItem,
  setDefaultColumn,
})(RoleTable);
