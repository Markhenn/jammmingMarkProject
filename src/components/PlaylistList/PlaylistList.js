import React from "react";
import "./PlaylistList.css";
import { PlaylistListItem } from "../PlaylistListItem/PlaylistListItem";

export class PlaylistList extends React.Component {
  constructor(props){
    super(props);
    this.emptyList = this.emptyList.bind(this);
  }
  componentWillMount() {
    this.props.getPlaylists();
  }

  emptyList(){
    this.props.emptyPlaylist();
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
        <a className="EmptyPl" onClick={this.emptyList}>Empty Playlist</a>
      </div>
    );
  }
}
