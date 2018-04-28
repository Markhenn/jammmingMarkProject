import React from "react";
import "./PlaylistListItem.css";

export class PlaylistListItem extends React.Component {
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <p>{this.props.playlistName}</p>
        </div>
      </div>
    );
  }
}
