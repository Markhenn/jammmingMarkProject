import React from "react";
import "./PlaylistList.css";
import { PlaylistListItem } from "../PlaylistListItem/PlaylistListItem";

export class PlaylistList extends React.Component {
  componentWillMount() {
    this.props.getPlaylists();
  }

  render() {
    return (
      <div className="PlaylistList">
        <h2>Local Playlists</h2>
        {this.props.playlists.map(playlist => {
          return (
            <PlaylistListItem
              playlist={playlist}
              key={playlist.id}
              onSelect={this.props.selectPlaylist}
            />
          );
        })}
      </div>
    );
  }
}
