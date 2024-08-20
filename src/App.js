import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "./views/Main.jsx";
import Header from "./views/Header.jsx";
import TaskList from "./Components/TaskList.jsx";
import Login from "./views/Login.jsx";

import dummyTasks from './DummyTasks.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      JWTAccessToken: null,
      JWTRefreshToken: null
    };
  }

  onLoginSucessfull = (accessToken) => {
    this.setState(
      {
        JWTAccessToken: accessToken,
        loggedIn: true,
      },
      () => {
        // By passing a callback function as the second argument to this.setState, you
        // can ensure that your console.log statements run after the state has been updated,
        // showing the correct, updated state.
        console.log("Logged In successfully. Access Token: ", this.state.JWTAccessToken);
        console.log(
          "Logged In successfully. Logged In status: ",
          this.state.loggedIn
        );
      }
    );
  };

  render() {
    return (
      <div className="App">
        <Router>
          {this.state.loggedIn && <Header /> }  
          <main className="contents">
            <Routes>
              <Route
                path="/"
                element={
                  this.state.loggedIn ? (
                    <Navigate to={"/home"} />
                  ) : (
                    <Login onChange={this.onLoginSucessfull} />
                  )
                }
              />
              <Route
                path="/home"
                element={
                  this.state.loggedIn ? (
                    <Main />
                  ) : (
                    <Login onChange={this.onLoginSucessfull} />
                  )
                }
              />
              <Route
                path="tasklist"
                element={<TaskList tasks={dummyTasks} />}
              />
              <Route path="login" element={<Login />} />
            </Routes>
          </main>
        </Router>
      </div>
    );
  }
}

export default App;
