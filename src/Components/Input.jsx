import React, { Component } from "react";
import PropTypes from "prop-types";
import "../styles/Input.css";

class Input extends Component {
  handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const { onChange, meta } = this.props;

    if (type === "checkbox") {
      onChange(name, checked);
    } else if (type === "file") {
      onChange(name, files[0]);
    }
    else if(type ==='select-one'){
     // Find the selected option based on its value
    const selectedOption = meta.data.options.find(option => option.value === value);

    // Pass both the value and label to the onChange handler
    onChange(name, { value: selectedOption.value, label: selectedOption.label });
    } else {
      onChange(name, value);
    }
  };

  render() {
    const { name, type, placeholder, value, meta } = this.props;

    const renderInput = () => {
      switch (type) {
        case "list":
          const selectValue = value && typeof(value) === 'object' ? value.value : value || "";
          console.log(`Rendering select for ${name}:`, { selectValue, value });

          return (
            <select name={name}  value={selectValue}  onChange={this.handleChange}>
              {meta.data?.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        case "radio":
          return meta.data?.options.map((option) => (
            <div key={option.value} className="radio">
              <label htmlFor={option.label}>
                {option.label}
                <input
                  type="radio"
                  id={option.value}
                  name={name}
                  value={option.value}
                  onChange={this.handleChange}
                  checked={this.props.value === option.value}
                />
              </label>
            </div>
          ));
        case "checkbox":
          return meta.data?.options.map((option) => (
            <div key={option.value} className="checkbox">
              <label htmlFor={option.value}>{option.label}</label>
              <input
                type="checkbox"
                id={option.value}
                name={name}
                onChange={this.handleChange}
                checked={value.includes(option.value)}
              />
            </div>
          ));
        case "textarea":
          return (
            <textarea
              name={name}
              value={value}
              onChange={this.handleChange}
              placeholder={placeholder}
              style={{}}
            />
          );
        default:
          return (
            <input
              type={type}
              name={name}
              value={value}
              onChange={this.handleChange}
              placeholder={placeholder}
              className={type === "date" ? "date-input" : ""}
            />
          );
      }
    };

    return (
      <div className="input-wrapper">
        <label htmlFor={name}>{name.toUpperCase()}</label>
        <br />
        {renderInput()}
      </div>
    );
  }
}

Input.defaultProps = {
  placeholder: "",
  meta: {},
  value: ""
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    data: PropTypes.shape({
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.any.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    }),
  }),
};

export default Input;
