import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class BasicLineChart extends React.Component {
  render() {
    const { data } = this.props;
    console.log("Line chart data: ", data);
    if (!data || !data.xAxis || !data.yAxis) {
      return <div>Loading chart...</div>; // Show loading state if data isn't ready yet
    }

    const xAxis = data["xAxis"];
    const yAxis = data["yAxis"];

    const parsedData = []
    for(let i = 0;  i < xAxis.length; i++){
        parsedData.push({"date" : xAxis[i], "value": yAxis[i]});
    }

    console.log("Line chart parsed Data: ", parsedData);


    return (
        <LineChart width={400} height={300} data={parsedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        
        <Line type="monotone" dataKey="value" stroke="#ff0000" />
      </LineChart>
    )
  }
}

export default BasicLineChart;
