import React from "react";
import PropTypes from "prop-types";

function DropDown(props) {
  return (
    <div className="dropdown-wrapper">
      <button type="button" className="btn dropdown-btn">
        {props.dropdownText}
      </button>
      <div className="dropdown-list-wrapper">{props.dropdownList}</div>
    </div>
  );
}

DropDown.propType = {
  dropdownText: PropTypes.func.required,
};

export default DropDown;
