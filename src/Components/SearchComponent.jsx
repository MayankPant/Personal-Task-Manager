import React, { Component } from "react";
import "../styles/SearchComponent.css";
import search from "../assets/resources/search.svg";
import AccessTokenContext from "../context/AccessTokenContext";

class SearchComponent extends Component {
  static contextType = AccessTokenContext;
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }

  

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchTerm: value }, () => {
      console.log("Search term in Search component: ", this.state.searchTerm);
      this.props.onSearch(this.state.searchTerm);
    });
  };

  render() {
    return (
      <>
        <div className="search-bar">
          <input
            onChange={this.handleChange}
            style={{ background: search }}
            type="search"
            placeholder="Search tasks..."
            name="Search Bar"
          />
        </div>
      </>
    );
  }
}

export default SearchComponent;
