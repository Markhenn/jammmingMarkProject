import React from "react";
import "./Searchlist.css";
import { Tracklist } from "../Tracklist/Tracklist";

export class Searchlist extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <Tracklist
          addRemoveButton={this.props.addToPlaylist}
          tracklist={this.props.searchlist}
          isRemoval={false}
        />
      </div>
    );
  }
}
