import React from "react";
import "./SearchBar.css";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "" };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
  }

  handleTermChange(event) {
    const searchTerm = event.target.value;
    sessionStorage.setItem("seachTerm", searchTerm);
    this.setState({ searchTerm });
  }

  handleSearch() {
    this.props.onSearch(this.state.searchTerm);
  }

  componentDidMount() {
    //update the state with the value from storage right before the render
    const searchTerm = JSON.parse(sessionStorage.getItem("searchTerm"));

    if (searchTerm) {
      this.setState({ searchTerm });
    }
  }

  enterPressed(event) {
    if (event.keyCode === 13) {
      this.handleSearch();
    }
  }

  render() {
    return <div className="SearchBar">
        <input 
          value={this.state.searchTerm} 
          placeholder="Enter a Song, Album or Artist" 
          onChange={this.handleTermChange} 
          onKeyDown={this.enterPressed} 
        />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>;
  }
}
