import React, { Component } from 'react';
import '../styles/Button.css'

class Button extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isHovered: false,
        };
      }
    
      handleMouseEnter = () => {
        this.setState({ isHovered: true });
      };
    
      handleMouseLeave = () => {
        this.setState({ isHovered: false });
      };

    render() {
        const defaultStyling = {
            width: '100px',
            height: '40px',
            margin: '3px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'box-shadow 0.3s',
          }
    
          // Styles for hover effect
        const hoverStyles = {
            boxShadow: '0px 0px 5px #000000',
          };
    
        const styles = this.props.styles
          // merging the user passed styles with some defult styling
        const combinedStyles = {
            ...defaultStyling,
            ...styles,
            ...this.state.isHovered ? hoverStyles: {}
        }
        return (
            <div className='button-wrapper'>
                <button onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.props.onClick} style={combinedStyles}>{this.props.text.toUpperCase()} </button>
            </div>
        )
    }
}
export default Button;
