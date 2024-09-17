import React from "react";
import { Checkbox, Chip, IconButton } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowForwardIos as ArrowForward,
  ArrowBackIos as ArrowBack,
  FileDownload,
} from "@mui/icons-material";
import "../styles/TaskList.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import AccessTokenContext from "../context/AccessTokenContext";
import DownloadJSON from "./DownloadJSON";

const ITEM_RANGE = 10;

const TableFooter = ({tasks, currentPage, itemsRange, totalItems, changePage, downloadFile }) => {
  return (
    <div className="table-footer">
      <div className="pagination-controls">
        <button onClick={() => changePage("prev", totalItems)}>
          <ArrowBack sx={{color: '#eee25b'}} />
        </button>
        <span>
          {itemsRange} of {totalItems}
        </span>
        <button onClick={() => changePage("next", totalItems)}>
          <ArrowForward sx={{color: '#eee25b'}}/>
        </button>
      </div>
      <div className="page-info">
        <input type="text" value={`Page: ${currentPage}`} readOnly />
      </div>
      <DownloadJSON data={tasks} filename={"task"} icon= {<FileDownload sx={{color: '#eee25b', backgroundColor: '#673ab7', padding: 0}}/>} />
    </div>
  );
};

class TaskList extends React.Component {
  static contextType = AccessTokenContext;
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      leftPointer: 0,
      rightPointer: ITEM_RANGE,
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
      const { five_urgent_tasks } = fetched_data;

      this.setState(
        {
          tasks: [...five_urgent_tasks],
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
    console.log("Date to be formatted: ", date);
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString("en-US", {
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
  changePage = (direction, totalItems) => {
    if (direction !== "next" && direction !== "prev") {
      console.log("Wrong parameter in change page");
      return;
    }

    if (direction === "next") {
      const newLeft =
        this.state.rightPointer !== totalItems
          ? this.state.rightPointer
          : this.state.leftPointer;
      console.log("LEFTPOINTER: ", newLeft);
      const newRight =
        this.state.rightPointer + ITEM_RANGE > totalItems
          ? totalItems
          : (this.state.rightPointer + ITEM_RANGE) % totalItems;
      console.log("RIGHT POINTER: ", newRight);
      this.setState({
        leftPointer: newLeft,
        rightPointer: newRight,
      });
    } else if (direction === "prev") {
      const newRight =
        this.state.leftPointer <= 0 ? ITEM_RANGE : this.state.leftPointer;
      console.log("RIGHT POINTER: ", newRight);
      const newLeft =
        this.state.leftPointer - ITEM_RANGE < 0
          ? 0
          : (this.state.leftPointer - ITEM_RANGE) % totalItems;
      console.log("LEFT POINTER: ", newLeft);
      this.setState({
        leftPointer: newLeft,
        rightPointer: newRight,
      });
    }
  };

  render() {
    const totalItems = this.state.tasks.length;
    const tasks = this.state.tasks.slice(
      this.state.leftPointer,
      this.state.rightPointer
    );

    const totalPages = Math.ceil(totalItems / 10); // assuming 10 rows for each page

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
                <td>{this.formatDate(task.due_date)}</td>
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
        <TableFooter
          tasks={this.state.tasks}
          currentPage={Math.ceil(this.state.leftPointer / totalItems)}
          totalPages={totalPages}
          itemsRange={this.state.rightPointer - this.state.leftPointer}
          totalItems={totalItems}
          changePage={this.changePage}
        />
      </div>
    );
  }
}

export default TaskList;
