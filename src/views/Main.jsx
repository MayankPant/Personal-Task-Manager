import React, { Component } from "react";
import Card from "../Components/Card.jsx";
import taskCompleted from "../assets/resources/task-completed.svg";
import pending from "../assets/resources/pending.svg";
import completed from "../assets/resources/completed.svg";
import ListItem from "../Components/ListItem.jsx";
import Modal from "../Components/Modal.jsx";
import "../styles/Main.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  closeModal = () => {
    this.setState({ active: false });
  };

  openModal = () => {
    this.setState({ active: true });
  };
  render() {
    return (
      <div className="App-main">
        <Modal fabButtonText={"+"} accessToken = {this.props.accessToken}  />
        <div className="cards">
          <Card
            icon={taskCompleted}
            title={"Total Tasks"}
            subtitle={"tasks in total"}
            number={20}
          />
          <Card
            icon={pending}
            title={"Pending Tasks"}
            subtitle={"tasks pending"}
            number={8}
          />
          <Card
            icon={completed}
            title={"Completed Tasks"}
            subtitle={"tasks completed"}
            number={12}
          />
        </div>
        <div className="recent-tasks">
          <ListItem
            taskName={"Design Homepage Layout"}
            dueDate={"2024-08-15"}
            priority={"High"}
            status={"In Progress"}
            assignedTo="Alice"
          />
          <ListItem
            taskName={"Optimise Database Queries"}
            dueDate={"2024-08-19"}
            priority={"low"}
            status={"Completed"}
            assignedTo="Morgan"
          />
        </div>
      </div>
    );
  }
}

export default Main;
