import React, { Component } from "react";
import "../styles/GenericModal.css";
import AccessTokenContext from "../context/AccessTokenContext";
import Input from "./Input";
import Button from "./Button";


const buttonStyles = {
  backgroundColor: "#673ab7",
  color: "#eee25b",
  border: "2px solid #eee25b",
  fontWeight: "900",
};

class GenericModal extends Component {
  static contextType = AccessTokenContext;
  constructor(props) {
    super(props);
    
    this.state = {
      isOpen: true,
      formData: {}
    };
  }
  componentDidMount() {
    console.log("Initial Form Fields to set: ", this.props.formFields);
    this.setFormFields(this.props.formFields);
  }

  handleChange = (name, value) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }), () => console.log("Form Data: ", this.state.formData));
    
  };

  openModal = () => {
    this.setState({ isOpen: true });
  };

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.formData);
    this.props.closeModal(); // closes the modal after submission

  }

  setFormFields = (fields) => {
    fields.forEach(field => {
      this.setState((prevState) => ({
        formData: {
          ...prevState.formData,
          [field.name]: field.value
        }
      }), () => {
        // Logging state after it has been updated
        console.log("State after setting form fields: ", this.state);
      });
    });
  };
  

  renderformFields = () => {
    const {formFields} = this.props;
    const formData = this.state.formData;
    console.log("Form Data to be rendered using: ", formData);

    console.log("Form Fields to render: ", formFields);
    return formFields.map((field, index) => {
      switch(field.type){
        case 'text':
        case 'email':
        case 'password':
        case 'date':
        case 'checkbox':
        case 'radio':
        case 'textarea':
            return (
              <div key={index}>
                <Input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                onChange={this.handleChange}                
                value={formData[field.name]}
                meta={field.meta}
                />
              </div>
            );
        case 'list':
          return (
            <div key={index}>
                <Input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                onChange={this.handleChange}                
                value={formData[field.name]}
                meta={field.meta}
                />
              </div>
            
          );
    
        default:
          return null;
          
      }
    })
  }
  renderButtonFields = () => {
    const {buttonFields} = this.props;
    const combinedStyles =  {

      ...buttonStyles
    }
    return (buttonFields.map((button, index) => {
       return <div key={index}>
        <Button text={button.text} onClick={button.onClick} styles={combinedStyles} />
       </div>
    }));
  }

  

  render() {
    return (
      <div className="modal-overlay">
        {/* Background blur effect */}
        {this.state.isOpen && <div className="background-blur"></div>}
        <div className="modal-content">
          <h2>{this.props.modalName}</h2>
          <div className="form">

            {this.renderformFields()}

          </div>
          <div className="button-wrapper">
            {this.renderButtonFields()}
          </div>
        </div>
      </div>
    )
  }
}

export default GenericModal;
