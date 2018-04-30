import React from "react";
import "./PlaylistListItem.css";

export class PlaylistListItem extends React.Component {
  render() {
    return <div className="PlaylistListItem">
        <div className="PlaylistListItem-Information">
          <p className="PlaylistAction">{this.props.playlistName}</p>
        </div>
      </div>;
  }
}
