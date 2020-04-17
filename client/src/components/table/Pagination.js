import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

export const Pagination = () => {
  const onSetPage = (location) => {
    if (location < 1 || location > Math.ceil(itemCount / limit)) {
      return false;
    }
    updatePage(location, limit);
  };

  const onUpdateLimit = (e) => {
    e.preventDefault();
    updateLimit(e.target.value);
  };

  return (
    <table className="table items-paging">
      <tbody>
        <tr>
          <td className="pager-padder"></td>
          <td
            className={
              page === 1 ? "pager pager-inactive" : "pager pager-active"
            }
            onClick={() => onSetPage(1)}
          >
            <FontAwesomeIcon icon={faChevronCircleLeft} />
          </td>
          <td
            className={
              page === 1 ? "pager pager-inactive" : "pager pager-active"
            }
            onClick={() => onSetPage(page - 1)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </td>
          <td className="pager-counter">
            {page * limit - limit + 1} -{" "}
            {page * limit > itemCount ? itemCount : page * limit} of {itemCount}
          </td>
          <td
            className={
              page >= Math.ceil(itemCount / limit)
                ? "pager pager-inactive"
                : "pager pager-active"
            }
            onClick={() => onSetPage(page + 1)}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </td>
          <td
            className={
              page >= Math.ceil(itemCount / limit)
                ? "pager pager-inactive"
                : "pager pager-active"
            }
            onClick={() => onSetPage(Math.ceil(itemCount / limit))}
          >
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </td>
          <td className="limit-updater">
            <small>Showing: </small>
            <select
              id="limit-select"
              onChange={(e) => onUpdateLimit(e)}
              selected={limit}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>{" "}
            <small>per page</small>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
