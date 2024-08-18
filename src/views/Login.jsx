import React, { Component } from "react";
import logo from "../assets/resources/logo.svg";
import Input from "../Components/Input";
import Button from "../Components/Button";
import "../styles/Login.css";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        login_info: {
            username: '',
            password: ''
        }
    }
    
  }

  handleInputChange = (name, value) => {

    this.setState(prevState => ({
        login_info: {
            ...prevState.login_info,
            [name]: value
        }
    }));
  };

  login = async () => {
    const loginUrl = process.env.REACT_APP_AUTH_BASE_ADDRESS.concat("/api/auth/login");
    console.log("Login Url: ", loginUrl);
    console.log("Entered username: ", this.state.login_info.username);
    console.log("Entered password: ", this.state.login_info.password);
    const payload = {
        "username": this.state.login_info.username,
        "password": this.state.login_info.password
    }
    try {
        var response = await axios.post(loginUrl, payload);
        console.log("Returned Response from login: ", response);
        
    } catch (error) {
        console.log("Error Occured", error);
    }
  }

  render() {
    return (
      <div className="login-container">
        <div className="panel">
        <img src={logo} alt="icon" />
        </div>
        <div className="panel">
          <div className="content-container">
            <h1>{"Welcome!"}</h1>
            <Input
              name={"username"}
              type={"text"}
              onChange={this.handleInputChange}
              placeholder={"Enter your usename."}
              value={this.state.login_info.login_username}
              meta={""}
            />
            <Input
              name={"password"}
              type={"password"}
              onChange={this.handleInputChange}
              placeholder={"Enter your password"}
              value={this.state.login_info.login_password}
              meta={""}
            />
            <Button text={"Login"} styles={{ backgroundColor: "#7c49d3" }} onClick={this.login} />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
