import React, { Component } from "react";
import FabButton from "./FabButton";
import Button from "./Button";
import "../styles/Modal.css";
import Input from "./Input";

const fabButtonStyles = {
  backgroundColor: "#673AB7",
  color: "#eee25b",
  border: "none",
  fontSize: "24px",
};

const buttonStyles = {
  backgroundColor: "#673ab7",
  color: "#eee25b",
  border: "2px solid #eee25b",
  fontWeight: "900",
};

class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      task_info: {
        title: "",
        description: "",
        dueDate: "",
        priority: "",
        status: "",
      },
    };
  }

  openModal = () => {
    this.setState({ isOpen: true });
  };

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  handleChange = (name, value) => {
    this.setState((prevState) => ({
      task_info: {
        ...prevState.task_info,
        [name]: value,
      },
    }), () => console.log("Task_info: ", this.state.task_info));
    
  };

  render() {
    return (
      // the fab button is initially visible which controls opening the modal
      <div>
        <FabButton
          text={this.props.fabButtonText}
          onClick={this.openModal}
          styles={fabButtonStyles}
        />

        {this.state.isOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>SAVE TASK</h2>
              <div className="save-form">
                <Input
                  name={"title"}
                  type={"text"}
                  onChange={this.handleChange}
                  placeholder={"Enter title of task."}
                  value={this.state.task_info.title}
                  meta={{}}
                />
                <Input
                  name={"description"}
                  type={"textarea"}
                  onChange={this.handleChange}
                  placeholder={"Please Describe Task"}
                  value={this.state.task_info.description}
                  meta={{}}
                />
                <Input
                  name={"dueDate"}
                  type={"date"}
                  onChange={this.handleChange}
                  placeholder={'DD/MM/YYYY'}
                  value={this.state.task_info.dueDate}
                  meta={{}}
                />
                <Input
                  name={"priority"}
                  type={"list"}
                  onChange={this.handleChange}
                  value={this.state.task_info.priority}
                  meta={{
                    data: {
                      options: [
                        {value: "Please Select", label: "Please Select"},
                        { value: "medium", label: "Medium" },
                        { value: "low", label: "Low" },
                        { value: "high", label: "High" },
                      ],
                    },
                  }}
                />
                <Input
                  name={"status"}
                  type={"radio"}
                  onChange={this.handleChange}
                  value={this.state.task_info.status}
                  meta={{
                    data: {
                      options: [
                        { value: "Not Started", label: "Not Started" },
                        { value: "In progress", label: "In progress" },
                        { value: "Completed", label: "Completed" },
                      ],
                    },
                  }}
                />
              </div>
              <div className="button-wrapper">
                <Button
                  text={"CLOSE"}
                  onClick={this.closeModal}
                  styles={buttonStyles}
                >
                  Close
                </Button>
                <Button
                  text={"SAVE"}
                  onClick={this.closeModal}
                  styles={buttonStyles}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Background blur effect */}
        {this.state.isOpen && <div className="background-blur"></div>}
      </div>
    );
  }
}

export default ModalComponent;
