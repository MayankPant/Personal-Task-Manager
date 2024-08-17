import React, { Component } from "react";
import "../styles/FabButton.css";

class FabButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };
  render() {
    const defaultStyling = {
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s',
      }

      // Styles for hover effect
    const hoverStyles = {
        boxShadow: '0px 0px 5px #000000',
      };

    const styles = this.props.styles
      // merging the user passed styles with some defult styling
    const combinedStyles = {
        ...defaultStyling,
        ...styles,
        ...this.state.isHovered ? hoverStyles: {}
    }
    return (
      <div className="fab-container">
        <button
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          style={combinedStyles}
          onClick={this.props.onClick}
        >
          {this.props.text}
        </button>
      </div>
    );
  }
}
export default FabButton;
