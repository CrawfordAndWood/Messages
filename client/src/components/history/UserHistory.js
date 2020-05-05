//I need to read the user history table and return the results

import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import {
  getUserHistory,
  updateLimit,
  updatePage,
  resetSearch,
  sort,
} from "../../actions/userhistory";
import Moment from "react-moment";
import SortColumn from "../table/SortColumn";
import Pagination from "../table/Pagination";
import Search from "../table/Search";

const UserHistory = ({
  getUserHistory,
  updateLimit,
  updatePage,
  resetSearch,
  sort,
  userhistory: { loading, sortDescending, userhistory },
}) => {
  useEffect(() => {
    getUserHistory();
  }, []);
  return (
    <Fragment>
      <Search searchFn={getUserHistory} resetFn={resetSearch} />
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <table className="table user-history-table">
            <thead>
              <tr>
                <th>
                  Date
                  <SortColumn
                    columnName={"date"}
                    sortFn={sort}
                    sortDescending={sortDescending}
                  />
                </th>
                <th>
                  Name
                  <SortColumn
                    columnName={"name"}
                    sortFn={sort}
                    sortDescending={sortDescending}
                  />
                </th>
                <th>
                  Action
                  <SortColumn
                    columnName={"action"}
                    sortFn={sort}
                    sortDescending={sortDescending}
                  />
                </th>
                <th>
                  Updated By
                  <SortColumn
                    columnName={"updatedBy"}
                    sortFn={sort}
                    sortDescending={sortDescending}
                  />
                </th>
              </tr>
            </thead>
            <tbody className="user-histoy">
              {userhistory !== undefined ? (
                <Fragment>
                  {userhistory.map((hist) => (
                    <tr key={hist._id}>
                      <td>
                        <Moment format="DD/MM/YYYY HH:mm" date={hist.date} />
                      </td>
                      <td>{hist.user !== null ? hist.user.name : ""}</td>
                      <td>
                        {hist.description !== null ? hist.description : ""}
                      </td>
                      <td>
                        {hist.updatedBy !== null &&
                        hist.hasOwnProperty("updatedBy")
                          ? hist.updatedBy.name
                          : ""}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ) : (
                <tr>
                  <td>No User History found...</td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination updatePageFn={updatePage} updateLimitFn={updateLimit} />
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  view: state.view,
  userhistory: state.userhistory,
});

export default connect(mapStateToProps, {
  getUserHistory,
  updatePage,
  updateLimit,
  resetSearch,
  sort,
})(UserHistory);
