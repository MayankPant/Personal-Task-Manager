import React, {Component} from "react";
import '../styles/Card.css'

class Card extends Component{
    constructor(props){
        super(props)
        const {
            icon,
            title,
            number,
            subtitle
        } = this.props

        this.state = {
            icon: icon,
            title: title,
            number: number,
            subtitle: subtitle
        }
    }

    render() {
        return (
            <div className="card-wrapper">
                <div className="icon">
                <img src={this.state.icon} alt="card"></img>
                </div>
                <label className="title">{this.state.title.toUpperCase()}</label>
                <label className="number">{this.state.number}</label>
                <label className="subtitle">{this.state.subtitle.toUpperCase()}</label>
            </div>
        )
    }
}
export default Card;