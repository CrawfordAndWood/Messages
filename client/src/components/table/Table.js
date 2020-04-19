import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import TableItem from "./TableItem";
import Pagination from "./Pagination";
import Search from "./Search";
import {
  addEmptyRow,
  sort,
  search,
  resetSearch,
  updateLimit,
  updatePage,
  countItems,
} from "../../actions/view";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faChevronCircleDown,
  faChevronCircleUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./table.scss";

const Items = ({
  addEmptyRow,
  sortbyName,
  countItems,
  table: {
    canAddNewRow,
    itemCount,
    items,
    limit,
    loading,
    page,
    sortDescending,
    searchTerm,
  },
}) => {
  const [searchInput, setsearchInput] = useState({
    term: searchTerm,
    limit: limit,
    page: page,
  });
  const { term } = searchInput;
  useEffect(() => {
    countItems();
    getRoles();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Search />
          <table className="table">
            <thead>
              <tr>
                <th>
                  Name
                  <FontAwesomeIcon
                    onClick={() => sortbyName("name")}
                    className="table-sort-icon"
                    icon={
                      sortDescending ? faChevronCircleDown : faChevronCircleUp
                    }
                    size="lg"
                  />
                </th>
                <th
                  className={
                    canAddNewRow ? "role-table-save" : "role-table-disabled"
                  }
                  onClick={() => (canAddNewRow ? addEmptyRow() : null)}
                >
                  <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody className="items">
              {items.length > 0 ? (
                <Fragment>
                  {items.map((item) => (
                    <TableItem key={item._id} item={item} />
                  ))}
                </Fragment>
              ) : (
                <tr>
                  <td>No Items found...</td>
                </tr>
              )}
            </tbody>
          </table>
          {items.length > 0 && <Pagination items={items} />}
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  table: state.table,
});

export default connect(mapStateToProps, {
  addEmptyRow,
  sort,
  search,
  resetSearch,
  updateLimit,
  updatePage,
  countItems,
})(Items);
