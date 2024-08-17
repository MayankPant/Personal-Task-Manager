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
    };
  }

  openModal = () => {
    this.setState({ isOpen: true });
  };

  closeModal = () => {
    this.setState({ isOpen: false });
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
                  name={"Title"}
                  type={"text"}
                  onChange={this.handleChange}
                  placeholder={"Enter title of task."}
                  value={""}
                  meta={""}
                />
                <Input
                  name={"Description"}
                  type={"textarea"}
                  onChange={this.handleChange}
                  placeholder={"Please Describe Task"}
                  value={""}
                  meta={""}
                />
                <Input
                  name={"Due Date"}
                  type={"date"}
                  onChange={this.handleChange}
                  placeholder={'DD/MM/YYYY'}
                  value={""}
                  meta={""}
                />
                <Input
                  name={"Priority"}
                  type={"list"}
                  onChange={this.handleChange}
                  meta={{
                    data: {
                      options: [
                        { value: "medium", label: "Medium" },
                        { value: "low", label: "Low" },
                        { value: "high", label: "High" },
                      ],
                    },
                  }}
                />
                <Input
                  name={"Status"}
                  type={"radio"}
                  onChange={this.handleChange}
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
