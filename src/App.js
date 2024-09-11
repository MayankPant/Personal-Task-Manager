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
import AuthProvider from "./Components/AuthProvider.jsx";
import AccessTokenContext from "./context/AccessTokenContext.js";
import { useContext } from "react";

import dummyTasks from "./DummyTasks.js";

// Private route component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AccessTokenContext);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const { isAuthenticated, isLoading } = useContext(AccessTokenContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router>
        {isAuthenticated && <Header />}
        <main className="contents">
          <Routes>
            <Route path="/" element={<Navigate to={"/home"} />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Main />
                </PrivateRoute>
              }
            />
            <Route
              path="tasklist"
              element={
                <PrivateRoute>
                  <TaskList tasks={dummyTasks} />
                </PrivateRoute>
              }
            />
            <Route path="login" element={<Login />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}
export default App;
