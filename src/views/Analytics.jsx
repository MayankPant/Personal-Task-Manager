import React, {Component } from "react";
import BasicPie from "../Components/PieChart";
import '../styles/Analytics.css'

class Analytics extends Component{
    render() {
        return(
            <div className="chart-container">
                <BasicPie />
            </div>
        )
    }
}

export default Analytics;
