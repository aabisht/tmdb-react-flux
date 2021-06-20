import React, { useEffect } from "react";

function HeaderSearch() {
  useEffect(() => {
    document.body.addEventListener("click", handleSearchCloseOnBodyClick);
    return () =>
      window.removeEventListener("click", handleSearchCloseOnBodyClick);
  }, []);

  let handleSearchToggle = (event) => {
    event.stopPropagation();
    let _this = event.currentTarget;

    for (let sibling of _this.parentNode.children) {
      sibling.classList.contains("show")
        ? sibling.classList.remove("show")
        : sibling.classList.add("show");
    }
  };

  let handleSearchInputClick = (event) => {
    event.stopPropagation();
  };

  let handleSearchCloseOnBodyClick = (event) => {
    for (let element of document.querySelectorAll(".search-btn.show")) {
      element.classList.remove("show");
    }
    for (let element of document.querySelectorAll(
      ".search-form-control.show"
    )) {
      element.classList.remove("show");
    }
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
      <input
        type="text"
        className="form-control search-form-control"
        onClick={handleSearchInputClick}
      />
    </div>
  );
}

export default HeaderSearch;
