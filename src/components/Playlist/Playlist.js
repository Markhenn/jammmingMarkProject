import React from "react";
import "./Playlist.css";
import { Tracklist } from "../Tracklist/Tracklist";

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { plName: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
  }

  handleChange(event) {
    this.setState({ plName: event.target.value });
    this.props.changePLName(event.target.value);
  }

  handleClick() {
    this.props.savePlaylist();
  }

  enterPressed(event) {
    if (event.keyCode === 13) {
      this.handleClick();
      this.setState({ plName: "" });
    }
  }

  render() {
    return (
      <div className="Playlist">
        <input
          placeholder={"New Playlist"}
          value={this.state.plName}
          onChange={this.handleChange}
          onKeyDown={this.enterPressed}
        />
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
