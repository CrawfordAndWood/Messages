import React, { Fragment, useEffect } from "react";
import "./users.scss";
import { getData, addEmptyItem, setDefaultColumn } from "../../actions/view";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import SortColumn from "../table/SortColumn";
import Pagination from "../table/Pagination";
import Search from "../table/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import UserItems from "./UserItems";

const Users = ({
  getData,
  addEmptyItem,
  setDefaultColumn,
  view: { data, loading, canAddNewRow },
}) => {
  useEffect(() => {
    getData("users");
    setDefaultColumn("name");
  }, []);

  return (
    <Fragment>
      <Search route="users" />
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <table className="table">
            <thead>
              <tr>
                {/* <th>
                  Postcode
                  <SortColumn name={"postcode"} />
                </th> */}
                <th>
                  Email
                  <SortColumn name={"email"} />
                </th>
                <th>
                  Name
                  <SortColumn name={"name"} />
                </th>
                <th
                  className={
                    canAddNewRow ? "user-table-save" : "user-table-disabled"
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
            <tbody className="users">
              {data.length > 0 ? (
                <Fragment>
                  {data.map((user) => (
                    <UserItems key={user._id} user={user} />
                  ))}
                </Fragment>
              ) : (
                <tr>
                  <td>No Users found...</td>
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
})(Users);
