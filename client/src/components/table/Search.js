import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const Search = ({
  searchFn,
  searchArgs,
  view: { search, page, limit },
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
    if (searchArgs === undefined) {
      return searchFn(searchInput.term, page, limit);
    }
    console.log(searchArgs, "sar");
    return searchFn(searchArgs, searchInput.term, page, limit);
  };

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      onSubmit(e);
    }
  };

  const onReset = () => {
    setsearchInput({
      ...searchInput,
      term: "",
    });

    if (searchArgs === undefined) {
      return searchFn("", 1, limit);
    }
    console.log(searchArgs, "sar");
    return searchFn(searchArgs, "", 1, limit);
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
                onKeyDown={(e) => onEnter(e)}
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

export default connect(mapStateToProps, {})(Search);
