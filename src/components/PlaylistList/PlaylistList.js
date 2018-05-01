import React from "react";
import "./PlaylistList.css";
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
      this.setState({playlists})
    });
  }

  render() {
    return (
      <div className="PlaylistList">
        <h2>Local Playlists</h2>
        {this.state.playlists.map(playlist => {
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
