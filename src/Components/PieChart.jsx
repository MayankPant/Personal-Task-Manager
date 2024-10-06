import React, {Component } from "react";
import { PieChart } from '@mui/x-charts/PieChart';  






class BasicPie extends Component {
    render() {
        const {high_priority_tasks, low_priority_tasks, medium_priority_tasks} = this.props.data;
        return (
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: high_priority_tasks, label: 'High Priority', color: "Red"},
                    { id: 1, value: medium_priority_tasks, label: 'Medium Priority', color: "Orange" },
                    { id: 2, value: low_priority_tasks, label: 'Low Priority', color: "Green" },
                  ],
                },
              ]}
              width={600}
              height={200}
            />
          );
    }
  }
export default BasicPie;