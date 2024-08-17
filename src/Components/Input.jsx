import React, { Component } from "react";
import "../styles/Input.css";

class Input extends Component {
  constructor(props) {
    super(props);
    const { name, type, onChange, placeholder, value, meta } = this.props;

    this.state = {
      name: name,
      type: type,
      onChange: onChange,
      placeholder: placeholder,
      value: value,
      meta: meta,
    };
  }

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      this.setState({
        skills: { ...this.state.skills, [name]: checked },
      });
    } else if (type === "file") {
      console.log(type, "check here");
      this.setState({ [name]: e.target.files[0] });
    } else {
      this.setState({ [name]: value });
      this.props.onChange(name, value);
    }
  };

  render() {
    if (!this.props.meta.data) {
      if (this.props.type === "date") {
        return (
          <div className="input-wrapper">
            <label htmlFor={this.props.name}>
              {this.props.name.toUpperCase()}
            </label>
            <br></br>
            <input
              className="date-input"
              type={this.props.type}
              name={this.props.name}
              id={this.props.name}
              value={this.state.value}
              onChange={this.handleChange}
              onFocus={() => (this.type = "date")}
              onBlur={() => (this.type = "text")}
              placeholder={this.props.placeholder}
            />
          </div>
        );
      }

      return (
        <div className="input-wrapper">
          <label htmlFor={this.props.name}>
            {this.props.name.toUpperCase()}
          </label>
          <br></br>
          <input
            type={this.props.type}
            name={this.props.name}
            value={this.state.value}
            onChange={this.handleChange}
            placeholder={
              this.props.type !== "date" ? this.props.placeholder : {}
            }
            style={
              this.props.type === "textarea"
                ? { height: "100px", width: "100%" }
                : {}
            }
          />
        </div>
      );
    } else {
      if (this.props.meta.data.options) {
        const options = this.props.meta.data.options;
        var optionsInput = options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ));
        switch (this.props.type) {
          case "list":
            return (
              <div className="list">
                <label htmlFor={this.props.name}>{this.props.name}</label>
                <br />
                <select
                  name={this.props.name}
                  onChange={this.handleChange}
                  id={this.props.name}
                >
                  {optionsInput}
                </select>
              </div>
            );
          case "radio":
            optionsInput = options.map((option) => {
              return (
                <div key={option.value}>
                  <label className="radio-label" htmlFor={option.value}>
                    {option.label}
                  </label>
                  <input
                    type="radio"
                    id={option.value}
                    name={this.props.name}
                    label={option.label}
                    onChange={this.handleChange}
                    value={this.state.value}
                    checked = {true}
                  />
                </div>
              );
            });
            return (
              <div className="radio-buttons">
                <label htmlFor={this.props.name}>{this.props.name}</label>
                <br />
                {optionsInput}
              </div>
            );
          case "checkbox":
            optionsInput = options.map((option) => {
              return (
                <div key={option.value} className="checkbox">
                  <label htmlFor={option.value}>{option.label}</label>
                  <input
                    type="checkbox"
                    id={option.value}
                    name={this.props.name}
                    label={option.label}
                    onChange={this.handleChange}
                    value={this.state.value}
                  />
                </div>
              );
            });
            return (
              <div>
                <label htmlFor={this.props.name}>{this.props.name}</label>
                <br />
                {optionsInput}
              </div>
            );

          default:
            return <h2>{"Component not configured"}</h2>;
        }
      }
    }
  }
}

export default Input;
