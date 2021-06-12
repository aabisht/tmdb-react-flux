import React from "react";
import PropTypes from "prop-types";

function DropDown(props) {
  let wrapperClass = "dropdown-list-wrapper";
  if (props.dropdownPosition) {
    wrapperClass += " " + props.dropdownPosition;
  }
  return (
    <div className="dropdown-wrapper">
      <button type="button" className="btn dropdown-btn">
        {props.dropdownText}
      </button>
      <div className={wrapperClass}>{props.dropdownList}</div>
    </div>
  );
}

DropDown.propType = {
  dropdownText: PropTypes.func.required,
};

export default DropDown;
