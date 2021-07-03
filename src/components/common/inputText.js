import React from "react";
import PropTypes from "prop-types";

function InputText(props) {
  let wrapperClass = "form-group";
  let inputClass = "form-control";

  if (props.formGroupClassName) {
    wrapperClass += " " + props.formGroupClassName;
  }

  if (props.inputClassName) {
    inputClass += " " + props.formGroupClassName;
  }

  if (props.hasIcon === "true") {
    wrapperClass += " has-icons icon-" + props.iconPosition;
  }

  if (props.error.length > 0) {
    wrapperClass += " has-error";
    inputClass += " is-invalid";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={props.id} className={props.labelClassName}>
        {props.label}
      </label>
      {props.type === "textarea" ? (
        <textarea
          id={props.id}
          type={props.type}
          name={props.name}
          onChange={props.onChange}
          className={inputClass}
          value={props.value}
          placeholder={props.placeholder}
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
        />
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
