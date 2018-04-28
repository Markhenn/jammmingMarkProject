import React from "react";
import "../Playlist/Playlist.css";
import { PlaylistListItem } from "../PlaylistListItem/PlaylistListItem";

export class PlaylistList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: []
    };
  }

  componentWillMount() {
    this.props.getPlaylists().then(playlists => {
      const shortPlaylists = playlists.items.map(playlist => {
        return { name: playlist.name, id: playlist.id };
      })
      this.setState({ playlists: shortPlaylists });
    });
  }

  render() {
    return (
      <div className="Playlist">
        <h2>Local Playlists</h2>
        {this.state.playlists.map(playlist => {
          return <PlaylistListItem playlistName={playlist.name} key={playlist.id} />;
        })}  
      </div>
    );
  }
}
