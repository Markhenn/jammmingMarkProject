import React from "react";
import "./Playlist.css";
import { Tracklist } from "../Tracklist/Tracklist";

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.props.changePLName(event.target.value);
  }

  handleClick() {
    this.props.savePlaylist();
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={"New Playlist"} onChange={this.handleChange} />
        <Tracklist
          addRemoveButton={this.props.deleteFromPlaylist}
          tracklist={this.props.playlist}
          isRemoval={true}
        />
        <a className="Playlist-save" onClick={this.handleClick}>
          SAVE TO SPOTIFY
        </a>
      </div>
    );
  }
}
