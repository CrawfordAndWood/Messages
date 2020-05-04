//I need to read the user history table and return the results

import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getUserHistory } from "../../actions/userhistory";
import Moment from "react-moment";

const UserHistory = ({
  getUserHistory,
  userhistory: { loading, sortDescending, userhistory },
  view: { search, limit, page },
}) => {
  useEffect(() => {
    getUserHistory();
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <table className="table user-history-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
              <th>Updated By</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="user-histoy">
            {" "}
            {userhistory !== undefined ? (
              <Fragment>
                {userhistory.map((hist) => (
                  <tr key={hist._id}>
                    <td>{hist.user !== null ? hist.user.name : ""}</td>
                    <td>{hist.description}</td>
                    <td>
                      {hist.updatedBy !== null && hist.updatedBy.name !== null
                        ? hist.updatedBy.name
                        : ""}
                    </td>
                    <td>
                      <Moment format="YYYY/MM/DD HH:MM" date={hist.date} />
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
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  view: state.view,
  userhistory: state.userhistory,
});

export default connect(mapStateToProps, { getUserHistory })(UserHistory);
