import React, { Component } from "react";
import logo from "../assets/resources/logo.svg";
import Input from "../Components/Input";
import Button from "../Components/Button";
import "../styles/Login.css";
import AccessTokenContext from "../context/AccessTokenContext";
import { Navigate} from "react-router-dom";
class Login extends Component {
  static contextType = AccessTokenContext;

  constructor(props) {
    super(props);
    this.state = {
      login_info: {
        username: "",
        password: "",
      },
      isLoggedIn: false,
    };
  }

  handleInputChange = (name, value) => {
    this.setState((prevState) => ({
      login_info: {
        ...prevState.login_info,
        [name]: value,
      },
    }));
  };

  login = async () => {
      const {username, password} = this.state.login_info;
      const success = await this.context.login(username, password);
      if(success){
       this.setState({isLoggedIn: true})
      }
      else{
        alert("Login Failed");
      }
  };

  render() {
    if(this.state.isLoggedIn){
     return <Navigate to="/home" />
    }
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
              meta={{}}
            />
            <Input
              name={"password"}
              type={"password"}
              onChange={this.handleInputChange}
              placeholder={"Enter your password"}
              value={this.state.login_info.login_password}
              meta={{}}
            />
            <Button
              text={"Login"}
              styles={{ backgroundColor: "#7c49d3" }}
              onClick={this.login}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
