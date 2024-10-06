import React, { Component } from "react";
import BasicPie from "../Components/PieChart";
import '../styles/Analytics.css'
import BasicLineChart from "../Components/LineChart";
import axios from "axios";
import AccessTokenContext from "../context/AccessTokenContext";

class Analytics extends Component {
  static contextType = AccessTokenContext;

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true, // Add loading state
    };
  }

  componentDidMount = async () => {
    try {
      const url = process.env.REACT_APP_TASK_MANAGER_BASE_ADDRESS.concat(
        "/api/analytics/"
      );
      const header = {
        Authorization: `Bearer ${this.context.accessToken}`,
      };

      const response = await axios.get(url, { headers: header });

      console.log("Initial data fetched: ", response);

      if (response.status === 207) {
        const fetched_data = response.data;
        console.log("Analytics Fetched Data: ", fetched_data);
        this.setState({
          data: fetched_data, // Set the fetched data
          loading: false, // Update loading state
        });
      } else {
        console.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  getLineChartData = () => {
    const data = this.state.data["five_urgent_tasks"];

    if (!data || data.length === 0) {
      return { xAxis: [], yAxis: [] }; // Return empty data if not available
    }

    data.sort((a, b) => -(new Date(b["due_date"]) - new Date(a["due_date"])));
    let completed_tasks = 0;
    const xAxis = [];
    const yAxis = [];

    data.forEach((task) => {
      xAxis.push(task["due_date"]);
      yAxis.push(task["status"] === "Completed" ? (completed_tasks += 1) : completed_tasks);
    });

    return { xAxis, yAxis };
  };

  getPieChartData = () => {
    const data = this.state.data;
    if (!data || data.length === 0) {
        return { }; // Return empty data if not available
    }

    return data["user_analytics"]
  };

  render() {
    if (this.state.loading) {
      return <div>Loading data...</div>; // Loading state before data is fetched
    }

    const lineChartData = this.getLineChartData();
    const pieChartData = this.getPieChartData();

    return (
      <div className="chart-container">
        <BasicPie data = {pieChartData}/>
        <BasicLineChart data={lineChartData} />
      </div>
    );
  }
}

export default Analytics;
