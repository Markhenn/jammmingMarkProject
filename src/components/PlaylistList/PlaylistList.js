import React from "react";
import "../Playlist/Playlist.css";
import { PlaylistListItem } from "./PlaylistListItem";

export class PlaylistList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: []
    };
  }

  componentWillMount() {
    this.props.getPlaylists();
  }

  render() {
    return (
      <div className="Playlist">
        <h2>Local Playlists</h2>
        {this.state.playlists.map(playlist => {
          return <p>{playlist.name}</p>;
        })}
      </div>
    );
  }
}

//<PlaylistListItem playlistName={playlist.name} />
