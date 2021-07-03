import React, { useEffect } from "react";
import PropTypes from "prop-types";

function DropDown(props) {
  let wrapperClass = "dropdown-list-wrapper";
  if (props.dropdownPosition) {
    wrapperClass += " " + props.dropdownPosition;
  }

  useEffect(() => {
    document.body.addEventListener("click", handleCloseDropdownonBodyClick);
    return () =>
      window.removeEventListener("click", handleCloseDropdownonBodyClick);
  }, []);

  let handleDropDownToggle = (event) => {
    event.stopPropagation();
    let _this = event.currentTarget;

    for (let sibling of _this.parentNode.children) {
      sibling.classList.contains("show")
        ? sibling.classList.remove("show")
        : sibling.classList.add("show");
    }
  };

  let handleDropdownListClick = (event) => {
    event.stopPropagation();
  };

  let handleCloseDropdownonBodyClick = () => {
    for (let element of document.querySelectorAll(".dropdown-btn.show")) {
      element.classList.remove("show");
    }
    for (let element of document.querySelectorAll(
      ".dropdown-list-wrapper.show"
    )) {
      element.classList.remove("show");
    }
  };

  return (
    <div className="dropdown-wrapper">
      <button
        type="button"
        className="btn dropdown-btn"
        onClick={handleDropDownToggle}
      >
        {props.dropdownText}
      </button>
      <div className={wrapperClass} onClick={handleDropdownListClick}>
        {props.dropdownList}
      </div>
    </div>
  );
}

DropDown.propType = {
  dropdownText: PropTypes.func.required,
  dropdownList: PropTypes.func.required,
  dropdownPosition: PropTypes.string,
};

export default DropDown;
