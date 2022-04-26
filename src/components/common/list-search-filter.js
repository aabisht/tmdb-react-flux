import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InputText from "./inputText";

function ListSearchFilter(props) {
  const [searchValue, setSearchValue] = useState(""),
    [searchResults, setSearchResults] = useState(props.listData);

  useEffect(() => {
    setSearchResults(props.listData);
  }, [props.listData]);

  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value);
    setSearchResults(
      props.listData.filter((result) => {
        return result[props.searchFilterParameter].match(
          new RegExp(event.target.value, "gi")
        );
      })
    );
  };

  const getSearchListItemName = (searchListItem, name, otherName) => {
    return otherName && otherName.length > 0
      ? searchListItem[name]
        ? searchListItem[name]
        : searchListItem[otherName]
      : searchListItem[name];
  };

  return (
    <div className="list-search-filter-wrapper">
      <div className="ps-2 pe-2">
        <InputText
          label={props.searchInputLabel}
          id={props.searchInputId}
          name={props.searchInputId}
          type="text"
          placeholder={props.searchInputLabel}
          formGroupClassName="mb-3"
          labelClassName="d-none"
          onChange={onSearchValueChange}
          value={searchValue}
          hasIcon="true"
          iconPosition="right"
          iconText={[
            <span className="material-icons-outlined" key={props.searchInputId}>
              search
            </span>,
          ]}
        />
      </div>
      {searchResults.length > 0 ? (
        <ul className="list-unstyled dropdown-list-wrappper search-list-wrapper">
          {searchResults.map((searchResult, index) => {
            return (
              <li data="search" key={index}>
                <button
                  type="button"
                  className="btn d-block w-100"
                  onClick={() => {
                    props.selectList(searchResult);
                  }}
                >
                  {getSearchListItemName(
                    searchResult,
                    props.searchListViewParameter1,
                    props.searchListViewParameter2
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-center no-record">No record found</div>
      )}
    </div>
  );
}

ListSearchFilter.prototype = {
  listData: PropTypes.object.isRequired,
  searchInputId: PropTypes.string.isRequired,
  searchInputLabel: PropTypes.string.isRequired,
  searchListViewParameter1: PropTypes.string.isRequired,
  searchListViewParameter2: PropTypes.string,
  searchFilterParameter: PropTypes.string.isRequired,
  selectList: PropTypes.func.isRequired,
};

export default ListSearchFilter;
