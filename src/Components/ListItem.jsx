import React, { Component } from "react";
import "../styles/ListItem.css"; // Import the CSS file
import {
  FaTasks,
  FaCalendarAlt,
  FaExclamationCircle,
  FaUser,
  FaCheckCircle,
} from "react-icons/fa";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false, // Initial state to track hover
    };

    // Bind event handlers
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  // Event handler for mouse enter
  handleMouseEnter() {
    this.setState({ isHovered: true });
  }

  // Event handler for mouse leave
  handleMouseLeave() {
    this.setState({ isHovered: false });
  }

  render() {
    const {
      taskName,
      dueDate,
      priority,
      assignedTo = "Unassigned",
      status,
    } = this.props;
    const { isHovered } = this.state;

    // Define styles for different priorities
    const priorityClass = priority.toLowerCase(); // "high", "medium", or "low"

    // Define icons for different statuses
    const statusIcons = {
      Completed: <FaCheckCircle className="status-icon completed" />,
      "In Progress": <FaTasks className="status-icon in-progress" />,
      Pending: <FaExclamationCircle className="status-icon pending" />,
    };

    // Combine class names based on hover state
    const listItemClass = `list-item ${priorityClass} ${
      isHovered ? "hovered" : ""
    }`;

    return (
      <li
        className={listItemClass}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="task-details">
          <div className="task-icon">
            {" "}
            <FaTasks />
          </div>
          <div>
            <strong className="task-name">{taskName}</strong>
            <p className="task-info">
              <FaCalendarAlt className="info-icon" />
              Due: {dueDate}
            </p>
            <p className={`task-info priority ${priorityClass}`}>
              <FaExclamationCircle className="info-icon" />
              Priority: {priority.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="task-meta">
          <p className="task-status">
            {statusIcons[status]}
            <span className="status-text">{status}</span>
          </p>
          <p className="task-assigned">
            <FaUser className="info-icon" />
            Assigned to: {assignedTo}
          </p>
        </div>
      </li>
    );
  }
}

export default ListItem;
