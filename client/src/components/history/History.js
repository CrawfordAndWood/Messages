/*
This will have a list of tabs along the top for each history type
Default will be the user history 
Load only the user history first
Can I store the last visited page?
*/

import React, { Fragment, useState, useEffect } from "react";
import RoleHistory from "./RoleHistory";
import UserHistory from "./UserHistory";

const History = () => {
  const [selectedHistory, setSelectedHistory] = useState({
    selectedHistory: "",
  });

  useEffect(() => {
    setSelectedHistory("users");
  }, []);

  return (
    <Fragment>
      <h2>History</h2>
      <button
        type="button"
        className={
          selectedHistory === "users" ? "btn btn-primary" : "btn btn-secondary"
        }
        onClick={() => setSelectedHistory("users")}
      >
        Users
      </button>
      <button
        type="button"
        className={
          selectedHistory === "roles" ? "btn btn-primary" : "btn btn-secondary"
        }
        onClick={() => setSelectedHistory("roles")}
      >
        Roles
      </button>
      {selectedHistory === "users" ? <UserHistory /> : ""}
      {selectedHistory === "roles" ? <RoleHistory /> : ""}
    </Fragment>
  );
};

export default History;
