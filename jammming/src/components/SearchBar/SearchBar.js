import React from "react";
import "./SearchBar.css";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchWord: "" };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const search = event.target.value;
    this.setState({ searchWord: search });
  }

  handleSearch() {
    this.props.searchSpotify(this.state.searchWord);
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter a Song, Album or Artist"
          onChange={this.handleChange}
        />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
}
