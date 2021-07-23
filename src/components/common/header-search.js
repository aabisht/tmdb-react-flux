import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

function HeaderSearch() {
  const history = useHistory();
  const location = useLocation();
  const textInput = useRef(null);
  const routeTo = location.pathname.indexOf("/search") === -1 ? location : "/";

  const [headerSearchValue, updateHeaderSearchValue] = useState("");
  const [headerSearchClear, updateHeaderSearchClear] = useState(false);

  let closeIconClass = "form-group";
  if (headerSearchClear) {
    closeIconClass += " has-icons icon-right";
  }

  useEffect(() => {
    document.body.addEventListener("click", handleSearchCloseOnBodyClick);
    document
      .querySelectorAll(".header-logo-menu-wrapper")[0]
      .addEventListener("click", handleSearchCloseOnMenuClick);
    return () => {
      window.removeEventListener("click", handleSearchCloseOnBodyClick);
      document
        .querySelectorAll(".header-logo-menu-wrapper")[0]
        .removeEventListener("click", handleSearchCloseOnMenuClick);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const focusSearchInput = (_this) => {
    for (let sibling of _this.parentNode.children) {
      sibling.classList.contains("show")
        ? sibling.classList.remove("show")
        : sibling.classList.add("show");

      sibling.classList.contains("search-form-group-wrapper") &&
      sibling.classList.contains("show")
        ? textInput.current.focus()
        : textInput.current.blur();
    }
  };

  const handleSearchToggle = (event) => {
    Object.keys(document.querySelectorAll(".dropdown-btn")).forEach(
      (objectKey) => {
        let _element = document.querySelectorAll(".dropdown-btn")[objectKey];
        Object.keys(_element.parentNode.children).forEach((siblingsKey) => {
          _element.parentNode.children[siblingsKey].classList.remove("show");
        });
      }
    );

    if (!document.body.classList.contains("search-active")) {
      event.stopPropagation();
      let _this = event.currentTarget;
      focusSearchInput(_this);
    }
  };

  const handleSearchInputClick = (event) => {
    event.stopPropagation();
  };

  const handleSearchCloseOnBodyClick = () => {
    if (!document.body.classList.contains("search-active")) {
      for (let element of document.querySelectorAll(".search-btn.show")) {
        element.classList.remove("show");
      }
      for (let element of document.querySelectorAll(
        ".search-form-group-wrapper.show"
      )) {
        element.classList.remove("show");
      }
    }
  };

  const handleSearchCloseOnMenuClick = () => {
    for (let element of document.querySelectorAll(".search-btn.show")) {
      element.classList.remove("show");
    }
    for (let element of document.querySelectorAll(
      ".search-form-group-wrapper.show"
    )) {
      element.classList.remove("show");
    }
    clearSearch();
  };

  const clearSearch = () => {
    textInput.current.value = "";
    updateHeaderSearchValue("");
    updateHeaderSearchClear(false);
    document.body.classList.remove("search-active");
    history.push(routeTo);
  };

  const goToSearch = (inputValue) => {
    updateHeaderSearchClear(true);
    document.body.classList.add("search-active");
    history.push("/search/" + inputValue);
  };

  const handleSearchSubmit = (event) => {
    const inputValue = event.target.value;
    updateHeaderSearchValue(inputValue);
    inputValue.length > 0 ? goToSearch(inputValue) : clearSearch();
  };

  const handleSearchClear = () => {
    textInput.current.focus();
    clearSearch();
  };

  return (
    <div className="header-search-wrapper">
      <button
        type="button"
        className="btn search-btn link-text"
        onClick={handleSearchToggle}
      >
        <span className="material-icons-outlined">search</span>
      </button>
      <div className="search-form-group-wrapper">
        <div className={closeIconClass} onClick={handleSearchInputClick}>
          <input
            type="text"
            className="form-control search-form-control"
            onChange={handleSearchSubmit}
            value={headerSearchValue}
            ref={textInput}
          />
          {headerSearchClear ? (
            <span className="icon-wrapper" onClick={handleSearchClear}>
              <span className="material-icons-outlined">close</span>
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderSearch;
