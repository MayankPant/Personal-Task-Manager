import React, { Component } from "react";
import FabButton from "./FabButton";
import Button from "./Button";
import "../styles/Modal.css";

const fabButtonStyles = {
  backgroundColor: "#673AB7",
  color: "#eee25b",
  border: "none",
  fontSize: "24px",
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
              <div className="form">
                <form className="submit-form" action="/submit" method="POST">
                
                
                
                </form>
              </div>
              <div className="button-wrapper">
                <Button
                  text={"CLOSE"}
                  onClick={this.closeModal}
                  styles={{
                    backgroundColor: "#673ab7",
                    color: "#eee25b",
                    border: "2px solid #eee25b",
                    fontWeight: "900",
                  }}
                >
                  Close
                </Button>
                <Button
                  text={"SAVE"}
                  onClick={this.closeModal}
                  styles={{
                    backgroundColor: "#673ab7",
                    color: "#eee25b",
                    border: "2px solid #eee25b",
                    fontWeight: "900",
                  }}
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
