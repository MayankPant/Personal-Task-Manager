import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/NavItem.css";


class NavItem extends Component {
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
      padding: "5px",
      height: "30px",
      width: "100px",
      margin: "3px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "0.9em",
      transition: "box-shadow 0.3s",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textDecoration: "none",
      fontVariantCaps: "all-petite-caps",
      
    };

    const passedStyling = this.props.styles;
    // Styles for hover effect
    const hoverStyles = {
      boxShadow: this.state.isHovered ? "0px 0px 5px #000000": ''
    };

    const combinedStyles = {
      ...passedStyling,
      ...hoverStyles,
      ...defaultStyling,
    };

    return (
      
        <div
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <NavLink to={this.props.routeTo} style={combinedStyles}>
            {this.props.navItemName}
          </NavLink>
        </div>
      
    );
  }
}

export default NavItem;
