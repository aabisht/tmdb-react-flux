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

  let handleSearchToggle = (event) => {
    if (!document.body.classList.contains("search-active")) {
      event.stopPropagation();
      let _this = event.currentTarget;

      for (let sibling of _this.parentNode.children) {
        sibling.classList.contains("show")
          ? sibling.classList.remove("show")
          : sibling.classList.add("show");

        if (
          sibling.classList.contains("search-form-group-wrapper") &&
          sibling.classList.contains("show")
        ) {
          textInput.current.focus();
        }
      }
    }
  };

  let handleSearchInputClick = (event) => {
    event.stopPropagation();
  };

  let handleSearchCloseOnBodyClick = () => {
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

  let handleSearchCloseOnMenuClick = () => {
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

  let clearSearch = () => {
    textInput.current.value = "";
    updateHeaderSearchValue("");
    updateHeaderSearchClear(false);
    document.body.classList.remove("search-active");
    history.push(routeTo);
  };

  let handleSearchSubmit = (event) => {
    const inputValue = event.target.value;
    updateHeaderSearchValue(inputValue);
    if (inputValue.length > 0) {
      updateHeaderSearchClear(true);
      document.body.classList.add("search-active");
      history.push("/search/" + inputValue);
    } else {
      clearSearch();
    }
  };

  let handleSearchClear = () => {
    textInput.current.focus();
    clearSearch();
  };

  return (
    <div className="header-search-wrapper">
      <button
        type="button"
        className="btn search-btn"
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
