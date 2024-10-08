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
import AccessTokenContext from "../context/AccessTokenContext";
import DownloadJSON from "./DownloadJSON";
import GenericModal from "./GenericModal";
import axios from "axios";

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
      currentPage: 1,
      tasks: null,
      formData: {
        formFields: [],
        formButtons: []
      },
      isEditing: false,
      taskIndex: -1,
      isDeleting: false
    };
  }

  

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  }

  formatDate(date) {

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
    const totalPages = Math.ceil(totalItems/ITEM_RANGE);
    if (direction === "next") {
      this.setState({currentPage: Math.min(totalPages, this.state.currentPage + 1)});
    } else if (direction === "prev") {
      this.setState({currentPage: Math.max(1, this.state.currentPage - 1)});
    }
  };

  closeModal = () => this.setState({isEditing: false, isDeleting: false});



  sendEditRequest = async (formData) => {
    const url = process.env.REACT_APP_TASK_MANAGER_BASE_ADDRESS.concat("/api/task");
    // appeindig the selected task id to payload
    formData["task_id"] = this.state.taskIndex;

    const payload = formData;
    const header = {
      Authorization: `Bearer ${this.context.accessToken}`,
    };
    var response = await axios.put(url, payload, {
      headers: header,
    });

    console.log("Edit data fetched: ", response);

    if(response.status === 202){
      this.props.updateTask(response.data.task_edited);
      this.closeModal();
    }
    else{
      console.log("Error Occured: ", response.data);
    }
  }

  sendDeleteRequest = async (formData) => {
    const url = process.env.REACT_APP_TASK_MANAGER_BASE_ADDRESS.concat(`/api/task/${this.state.taskIndex}`);
    // appeindig the selected task id to payload
    formData["task_id"] = this.state.taskIndex;

    const header = {
      Authorization: `Bearer ${this.context.accessToken}`,
    };
    var response = await axios.delete(url, {
      headers: header,
    });

    console.log("Delete data fetched: ", response);

    if(response.status === 200){
      this.props.deleteTask(this.state.taskIndex);
      this.closeModal();
    }
    else{
      console.log("Error Occured: ", response.data);
    }
  }




  editTask = (task_id) => {
    console.log("Task index to be edited: ", task_id);
    const taskToEdit = this.props.data().find(task => task.task_id === task_id);
    console.log("Task to be edited: ", taskToEdit);
    const formFields =  [
      {
        name: "title",
        type: 'text',
        placeholder: 'Enter title of task.',
        value: taskToEdit.title,
        meta: {}
      },
      {
        name:"description",
        type:"textarea",
        placeholder:"Please Describe Task",
        value:taskToEdit.description,
        meta:{}
      },
      {
        name:"dueDate",
        type:"date",
        placeholder:'DD/MM/YYYY',
        value:taskToEdit.due_date,
        meta:{}
      },
     {
      name:"priority",
      type:"list",
      value:{
        value: taskToEdit.priority.toLowerCase(),
        label: taskToEdit.priority
      },
      meta:{
        data: {
          options: [
            { value: "medium", label: "Medium" },
            { value: "low", label: "Low" },
            { value: "high", label: "High" },
          ],
        },
      }},
      {
        name:"status",
        type:"radio",
        value:taskToEdit.status,
        meta:{
          data: {
            options: [
              { value: "Pending", label: "Pending" },
              { value: "In progress", label: "In Progress" },
              { value: "Completed", label: "Completed" },
            ],
          },
        }
      }
    ]

    const buttonFields = [
      {
        text: "CLOSE",
        onClick: () => {this.closeModal()},
        styles: {}
      }
    ]

    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        formFields: formFields,
        formButtons: buttonFields,
        
      },
      isEditing: true,
      taskIndex: task_id
    }), () => console.log("Current state of task list state:", this.state));
      
  }
  
  deleteTask = (task_id) => {
    console.log("Task index to be edited: ", task_id);
    const taskToEdit = this.props.data().find(task => task.task_id === task_id);
    console.log("Task to be edited: ", taskToEdit);
    const formFields =  [
      {
        name: "Warning:",
        type: 'label',
        placeholder: '',
        value: "Are you sure you want to delete this entry?",
        meta: {}
      },
    ]

    const buttonFields = [
      {
        text: "CLOSE",
        onClick: () => {this.closeModal()},
        styles: {}
      }
    ]

    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        formFields: formFields,
        formButtons: buttonFields,
        
      },
      isDeleting: true,
      taskIndex: task_id
    }), () => console.log("Current state of task list state:", this.state));
      
  }
  render() {
    console.log("Form Data: ", this.state.formData);
    const data = this.props.data();
    const totalItems = data.length;
    const startIndex = (this.state.currentPage - 1) * ITEM_RANGE + 1;
    const endIndex = Math.min(this.state.currentPage * ITEM_RANGE, totalItems);
    const tasks = data.slice(
      startIndex - 1,
      endIndex + 1
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
        {/* using the key to enure a new instance of GenericModal is created each time we click on edit */}
        {   this.state.isEditing && <GenericModal key={`edit-task-${this.state.taskIndex}`} formFields = {this.state.formData.formFields} buttonFields={this.state.formData.formButtons} onSubmit={this.sendEditRequest}/>      }
        {   this.state.isDeleting && <GenericModal key={`edit-task-${this.state.taskIndex}`} formFields = {this.state.formData.formFields} buttonFields={this.state.formData.formButtons} onSubmit={this.sendDeleteRequest}/>      }
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
            {tasks.map((task) => (
              <tr key={task.task_id}>
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
                  <IconButton aria-label="edit" onClick={() => this.editTask(task.task_id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => this.deleteTask(task.task_id)}>
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TableFooter
          tasks={tasks}
          currentPage={this.state.currentPage}
          totalPages={totalPages}
          itemsRange={endIndex}
          totalItems={totalItems}
          changePage={this.changePage}
        />
      </div>
    );
  }
}

export default TaskList;
