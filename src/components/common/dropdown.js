import React, { useEffect } from "react";
import PropTypes from "prop-types";

function DropDown(props) {
  let wrapperClass = "dropdown-list-wrapper";
  if (props.dropdownPosition) {
    wrapperClass += " " + props.dropdownPosition;
  }

  let dropdownBtnClass = "btn dropdown-btn";

  if (props.dropdownTextClass) {
    dropdownBtnClass += " " + props.dropdownTextClass;
  }

  useEffect(() => {
    document.body.addEventListener("click", handleCloseDropdownonBodyClick);
    return () =>
      window.removeEventListener("click", handleCloseDropdownonBodyClick);
  }, []);

  let handleDropDownToggle = (event) => {
    event.stopPropagation();
    let _this = event.currentTarget;

    Object.keys(document.querySelectorAll(".dropdown-btn")).forEach(
      (objectKey) => {
        let _element = document.querySelectorAll(".dropdown-btn")[objectKey];
        if (_element !== _this) {
          Object.keys(_element.parentNode.children).forEach((siblingsKey) => {
            _element.parentNode.children[siblingsKey].classList.remove("show");
          });
        }
      }
    );

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
        className={dropdownBtnClass}
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
  dropdownTextClass: PropTypes.string,
};

export default DropDown;
