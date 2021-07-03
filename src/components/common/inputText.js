import React, { useState } from "react";
import PropTypes from "prop-types";

function InputText(props) {
  let wrapperClass = "form-group";
  let inputClass = "form-control";
  let labelClass = "form-label";
  const [inputFocus, updateInputFocus] = useState(false);

  if (props.formGroupClassName) {
    wrapperClass += " " + props.formGroupClassName;
  }

  if (props.hasIcon === "true") {
    wrapperClass += " has-icons icon-" + props.iconPosition;
  }

  if (
    props.placeholder ||
    inputFocus ||
    (props.value && props.value.length > 0)
  ) {
    wrapperClass += " active";
  }

  if (props.floatingLabels === "true") {
    wrapperClass += " floating-label-group";
    labelClass += " floating-label";
    inputClass += " floating-input";
  }

  if (props.error.length > 0) {
    wrapperClass += " has-error";
    inputClass += " is-invalid";
  }

  if (props.inputClassName) {
    inputClass += " " + props.formGroupClassName;
  }

  if (props.labelClassName) {
    labelClass += " " + labelClass;
  }

  // if (props.value) {
  //   updateInputHasValue(props.value);
  // }

  let handleInputFocusIn = () => {
    updateInputFocus(true);
  };

  let handleInputFocusOut = () => {
    updateInputFocus(false);
  };

  return (
    <div className={wrapperClass}>
      {props.floatingLabels !== "true" && (
        <label htmlFor={props.id} className={labelClass}>
          {props.label}
        </label>
      )}
      {props.type === "textarea" ? (
        <textarea
          id={props.id}
          type={props.type}
          name={props.name}
          onChange={props.onChange}
          className={inputClass}
          value={props.value}
          placeholder={props.placeholder}
          onFocus={handleInputFocusIn}
          onBlur={handleInputFocusOut}
        ></textarea>
      ) : (
        <input
          id={props.id}
          type={props.type}
          name={props.name}
          onChange={props.onChange}
          className={inputClass}
          value={props.value}
          placeholder={props.placeholder}
          autoComplete="off"
          onFocus={handleInputFocusIn}
          onBlur={handleInputFocusOut}
        />
      )}
      {props.floatingLabels && props.floatingLabels === "true" && (
        <label htmlFor={props.id} className={labelClass}>
          {props.label}
        </label>
      )}
      {props.hasIcon === "true" && (
        <span className="icon-wrapper" key="props.id">
          {props.iconText}
        </span>
      )}
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
}

InputText.propType = {
  id: PropTypes.string.required,
  name: PropTypes.string.required,
  type: PropTypes.string.required,
  label: PropTypes.string.required,
  placeholder: PropTypes.string,
  formGroupClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.string,
  hasIcon: PropTypes.bool,
  iconPosition: PropTypes.string,
  iconText: PropTypes.string,
  floatingLabels: PropTypes.bool,
};

InputText.defaultProps = {
  error: "",
};

export default InputText;
