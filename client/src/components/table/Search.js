import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { getData, resetSearch } from "../../actions/view";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const Search = ({
  getData,
  resetSearch,
  view: { route, search, page, limit },
}) => {
  const [searchInput, setsearchInput] = useState({
    term: search,
  });
  const { term } = searchInput;

  const onSearchChange = (e) => {
    setsearchInput({
      ...searchInput,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getData(route, searchInput.term, page, limit);
  };

  const onReset = () => {
    setsearchInput({
      ...searchInput,
      term: "",
    });
    resetSearch(route, limit);
  };

  return (
    <Fragment>
      <table className="search-table">
        <tbody>
          <tr>
            <td className="search-bar">
              <input
                autoComplete="off"
                className="searchInput"
                type="text"
                placeholder="Search..."
                name="term"
                value={term}
                onChange={(e) => onSearchChange(e)}
              />
              <FontAwesomeIcon
                icon={faSearch}
                size="lg"
                onClick={(e) => onSubmit(e)}
              />
            </td>
            <td>
              <a href="#" onClick={() => onReset()}>
                clear search{" "}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  view: state.view,
});

export default connect(mapStateToProps, {
  getData,
  resetSearch,
})(Search);
