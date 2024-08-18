import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Main from "./Components/Main.jsx";
import Header from "./Components/Header.jsx";
import TaskList from "./Components/TaskList.jsx";
import Login from "./views/Login.jsx";

const dummyTasks = [
  {
    id: 1,
    title: "Complete project proposal",
    description: "Draft and finalize the proposal for the new client project",
    dueDate: "2024-08-20",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Schedule team meeting",
    description: "Arrange a team sync to discuss Q3 goals and objectives",
    dueDate: "2024-08-15",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 3,
    title: "Review budget report",
    description: "Analyze and approve the monthly budget report from finance",
    dueDate: "2024-08-25",
    priority: "High",
    status: "Pending",
  },
  {
    id: 4,
    title: "Update client presentation",
    description: "Incorporate feedback and finalize slides for client meeting",
    dueDate: "2024-08-18",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: 5,
    title: "Conduct performance reviews",
    description: "Complete annual performance evaluations for team members",
    dueDate: "2024-09-10",
    priority: "High",
    status: "Pending",
  },
  {
    id: 6,
    title: "Optimize website SEO",
    description: "Implement SEO improvements based on latest audit results",
    dueDate: "2024-08-30",
    priority: "Low",
    status: "In Progress",
  },
  {
    id: 7,
    title: "Prepare monthly newsletter",
    description: "Gather content and design the company's monthly newsletter",
    dueDate: "2024-08-28",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 8,
    title: "Update employee handbook",
    description: "Revise and distribute the updated employee handbook",
    dueDate: "2024-09-15",
    priority: "Low",
    status: "Pending",
  },
  {
    id: 9,
    title: "Resolve customer support tickets",
    description: "Address and close all open high-priority support tickets",
    dueDate: "2024-08-17",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 10,
    title: "Backup database",
    description: "Perform monthly backup of all company databases",
    dueDate: "2024-08-31",
    priority: "Medium",
    status: "Completed",
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  render() {

    return (
      <div className="App">
        <Router>
          <Header />
          <main className="contents">
            <Routes>
            <Route path="/" element={this.state.loggedIn ? <Navigate to={'/'} /> : <Login />} />
              <Route path="/" element={<Main />} />
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
