import React, { Component } from "react";
import logo from "../assets/resources/logo.svg";
import "../styles/AppBar.css";
import NavItem from "./NavItem";



const Logo = ({ logo, title }) => {
  return (
    <div className="logo">
      <img src={logo} alt="Task Manager" />
      <label>{title.toUpperCase()}</label>
    </div>
  );
};


const navItemStyles = {
  backgroundColor: "#eee25b",
  color: "#673AB7",
};

class AppBar extends Component {
  home() {}
  render() {
    return (
      <div className="app-bar">
        <Logo logo={logo} title={"Task Manager"} />
        <div className="nav-items">
          <NavItem navItemName={"HOME"} routeTo={"/"} styles={navItemStyles} />
          <NavItem
            navItemName={"TASKS"}
            routeTo={"tasklist"}
            styles={navItemStyles}
          />
          <NavItem
            navItemName={"ABOUT"}
            routeTo={"/about"}
            styles={navItemStyles}
          />
          <NavItem
            navItemName={"CONTACT"}
            routeTo={"/contact"}
            styles={navItemStyles}
          />
        </div>
      </div>
    );
  }
}

export default AppBar;
