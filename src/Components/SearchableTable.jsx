import React, { Component } from "react";
import SearchComponent from "./SearchComponent";
import TaskList from "./TaskList";
import "../styles/SearchableTable.css";
import axios from "axios";
import AccessTokenContext from "../context/AccessTokenContext";

class SearchableTable extends Component {
static contextType = AccessTokenContext;
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      tasks: [],
    };
  }
  componentDidMount = async () => {
    const url =
      process.env.REACT_APP_TASK_MANAGER_BASE_ADDRESS.concat("/api/analytics/");
    const header = {
      Authorization: `Bearer ${this.context.accessToken}`,
    };
    var response = await axios.get(url, {
      headers: header,
    });

    console.log("Initial All data fetched: ", response);

    if (response.status === 207) {
      const fetched_data = response.data;
      console.log("Fetched All Data: ", fetched_data);
      const { five_urgent_tasks } = fetched_data;

      this.setState(
        {
          tasks: [...five_urgent_tasks],
        },
        () => {
          console.log(this.state);
        }
      );
    }
  };
  filteredData = () => {
    const data = this.state.tasks;
    console.log("Data to be filtered: ", data);
    return data.filter((item) => {
        return Object.values(item).some((value) => {
            return (
                value.toString().toLowerCase().includes(this.state.searchTerm.toLowerCase())
            )
        })
    })
  }

  handleSearch = (term) => {
    this.setState({ searchTerm: term }, () => {
      console.log("Search term state: ", this.state.searchTerm);
    });
  };

  render() {
    return (
      <>
        <div className="container">
          <SearchComponent onSearch={this.handleSearch} />
          <TaskList data={this.filteredData} />
        </div>
      </>
    );
  }
}
export default SearchableTable;
