import React from "react";
import "./SearchBar.css";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "" };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(event) {
    const searchTerm = event.target.value;
    this.setState({ searchTerm });
  }

  handleSearch() {
    this.props.onSearch(this.state.searchTerm);
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter a Song, Album or Artist"
          onChange={this.handleTermChange}
        />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
}
