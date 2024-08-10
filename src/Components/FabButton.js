import React, { Component } from "react";
import "../styles/FabButton.css";

class FabButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="fab-container">
        <button style={this.props.styles} onClick={this.props.onClick}>
          {this.props.text}
        </button>
      </div>
    );
  }
}
export default FabButton;
