import React, { Component } from 'react';
import '../styles/Button.css'

class Button extends Component{

    render() {
        return (
            <div className='button-wrapper'>
                <button onClick={this.props.onClick} style={this.props.styles}>{this.props.text.toUpperCase()} </button>
            </div>
        )
    }
}
export default Button;
