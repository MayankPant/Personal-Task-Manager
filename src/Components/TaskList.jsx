import React from "react";
import { Checkbox, Chip, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, ArrowForwardIos as ArrowForward, ArrowBackIos as ArrowBack, FileDownload } from "@mui/icons-material";
import "../styles/TaskList.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import AccessTokenContext from "../context/AccessTokenContext";
const TableFooter = ({
  currentPage,
  totalPages,
  itemsRange,
  totalItems,
  onPageChange,
}) => {
  return (
    <div className="table-footer">
      <div className="pagination-controls">
        <button onClick={() => onPageChange("prev")}><ArrowBack/></button>
        <span>
          {itemsRange} of {totalItems}
        </span>
        <button onClick={() => onPageChange("next")}><ArrowForward/></button>
      </div>
      <div className="page-info">
        <input type="text" value={`${currentPage}`} readOnly />
      </div>
      <button onClick={() => onPageChange("next")}><FileDownload/></button>
    </div>
  );
};

class TaskList extends React.Component {
  static contextType = AccessTokenContext;
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  componentDidMount = async () => {
    const url =
      process.env.REACT_APP_TASK_MANAGER_BASE_ADDRESS.concat("/api/analytics/");
    const header = {
      Authorization: `Bearer ${this.context.accessToken}`,
    };
    var response = await axios.get(url, {
      headers: header,
    });

    console.log("Initial All data fetched: ", response);

    if (response.status === 207) {
      const fetched_data = response.data;
      console.log("Fetched All Data: ", fetched_data);
      const {five_urgent_tasks } =
        fetched_data;

      this.setState(
        {
          tasks: [...five_urgent_tasks]
        },
        () => {
          console.log(this.state);
        }
      );
    }
  };

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  }

  formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  getPriorityColor(priority) {
    switch (priority.toLowerCase()) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  }

  getStatusColor(status) {
    switch (status.toLowerCase()) {
      case "pending":
        return "default";
      case "in progress":
        return "info";
      case "completed":
        return "success";
      default:
        return "default";
    }
  }

  render() {
    const { tasks } = this.state;

    const theme = createTheme({
      components: {
        MuiCheckbox: {
          styleOverrides: {
            root: {
              color: "#eee25b",
              "&.Mui-checked": {
                color: "#eee25b",
              },
            },
          },
        },
      },
    });

    return (
      <div className="table-container">
        <table aria-label="task list">
          <thead>
            <tr className="table-header">
              <th>
                <ThemeProvider theme={theme}>
                  <Checkbox />
                </ThemeProvider>
              </th>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="spacer-row">
              <td colSpan={7}></td>
            </tr>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>
                  <Checkbox />
                </td>
                <td>{task.title}</td>
                <td>{this.truncateText(task.description, 30)}</td>
                <td>{this.formatDate(task.dueDate)}</td>
                <td>
                  <Chip
                    label={task.priority}
                    color={this.getPriorityColor(task.priority)}
                  />
                </td>
                <td>
                  <Chip
                    label={task.status}
                    color={this.getStatusColor(task.status)}
                  />
                </td>
                <td>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TableFooter  currentPage={5}
        totalPages={5}
        itemsRange={10}
        totalItems={10}
        onPageChange={10}  />
      </div>
      
    );
  }
}

export default TaskList;
