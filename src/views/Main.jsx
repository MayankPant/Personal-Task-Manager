import React, { Component } from "react";
import Card from "../Components/Card.jsx";
import taskCompleted from "../assets/resources/task-completed.svg";
import pending from "../assets/resources/pending.svg";
import completed from "../assets/resources/completed.svg";
import ListItem from "../Components/ListItem.jsx";
import Modal from "../Components/Modal.jsx";
import "../styles/Main.css";
import axios from "axios";
import AccessTokenContext from "../context/AccessTokenContext.js";

class Main extends Component {
  static contextType = AccessTokenContext;
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      total_tasks: 0,
      pending_tasks: 0,
      completed_tasks: 0,
      five_urgent_tasks: {},
    };
  }
  componentDidMount = async () => {
    const url =
      process.env.REACT_APP_TASK_MANAGER_BASE_ADDRESS.concat(
        "/api/analytics/3/"
      );
    const header = {
      Authorization: `Bearer ${this.context.accessToken}`,
    };
    var response = await axios.get(url, {
      headers: header,
    });

    console.log("Initial data fetched: ", response);

    if (response.status === 207) {
      const fetched_data = response.data;
      console.log("Fetched Data: ", fetched_data);
      const { total_tasks, pending_tasks, completed_tasks, five_urgent_tasks } =
        fetched_data;

      this.setState(
        {
          total_tasks: total_tasks,
          pending_tasks: pending_tasks,
          completed_tasks: completed_tasks,
          five_urgent_tasks: [...five_urgent_tasks],
        },
        () => {
          console.log(this.state);
        }
      );
    }
  };

  closeModal = () => {
    this.setState({ active: false });
  };

  openModal = () => {
    this.setState({ active: true });
  };
  render() {
    return (
      <div className="App-main">
        <Modal fabButtonText={"+"} />
        <div className="cards">
          <Card
            icon={taskCompleted}
            title={"Total Tasks"}
            subtitle={"tasks in total"}
            number={this.state.total_tasks}
          />
          <Card
            icon={pending}
            title={"Pending Tasks"}
            subtitle={"tasks pending"}
            number={this.state.pending_tasks}
          />
          <Card
            icon={completed}
            title={"Completed Tasks"}
            subtitle={"tasks completed"}
            number={this.state.completed_tasks}
          />
        </div>
        <div className="recent-tasks">
          {this.state.five_urgent_tasks.length > 0 ? (
            this.state.five_urgent_tasks.map((task, index) => (
              <ListItem
                key={index}
                taskName={task.title}
                dueDate={task.due_date}
                priority={task.priority}
                status={task.status}
                assignedTo={task.assigned_to}
              />
            ))
          ) : (
            <p>No urgent tasks available</p>
          )}
        </div>
      </div>
    );
  }
}

export default Main;
