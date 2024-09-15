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
        const { icon, title, number, subtitle } = this.props;
        return (
            <div className="card-wrapper">
                <div className="icon">
                <img src={icon} alt="card"></img>
                </div>
                <label className="title">{title.toUpperCase()}</label>
                <label className="number">{number}</label>
                <label className="subtitle">{subtitle.toUpperCase()}</label>
            </div>
        )
    }
}
export default Card;