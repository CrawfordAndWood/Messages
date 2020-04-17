import React, { Fragment } from "react";

export const Search = () => {
  const onSearchChange = (e) => {
    setsearchInput({
      ...searchInput,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    search(searchInput, page, limit);
  };

  const onReset = () => {
    setsearchInput({
      ...searchInput,
      term: "",
    });
    resetSearch();
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
                placeholder="Search Roles"
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
