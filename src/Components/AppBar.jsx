import React, { Component } from "react";
import logo from "../assets/resources/logo.svg";
import "../styles/AppBar.css";
import NavItem from "./NavItem";
import { PowerSettingsNew } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import AccessTokenContext from "../context/AccessTokenContext";
import { Navigate } from "react-router-dom";

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
  
  static contextType = AccessTokenContext;

  logout = async () => {
    await this.context.logout();
  }
  
  render() {
    if(!this.context.isAuthenticated){
      return <Navigate to={"login"} />
    }
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
          <IconButton
            onClick={() => this.logout()}
            aria-label="logout"
          >
            <PowerSettingsNew sx={{ color: "#eee25b", fontSize: 30, marginLeft: "2px" }} />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default AppBar;
