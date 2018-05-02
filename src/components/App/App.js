import React, { Component } from "react";
import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { Searchlist } from "../Searchlist/Searchlist";
import { Playlist } from "../Playlist/Playlist";
import { Spotify } from "../../util/Spotify";
import { PlaylistList } from "../PlaylistList/PlaylistList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchlist: [],
      playlist: [],
      playlists: [],
      playlistName: "",
      playlistId: null
    };
    this.searchSpotify = this.searchSpotify.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.deleteFromPlaylist = this.deleteFromPlaylist.bind(this);
    this.changePlaylistName = this.changePlaylistName.bind(this);
    this.saveToSpotify = this.saveToSpotify.bind(this);
    this.getPlaylistsFromSpotify = this.getPlaylistsFromSpotify.bind(this);
    this.selectPlaylist = this.selectPlaylist.bind(this);
    this.emptyPlaylist = this.emptyPlaylist.bind(this);
  }

  searchSpotify(searchWord) {
    Spotify.search(searchWord).then(searchlist => {
      this.setState({ searchlist });
    });
  }

  saveToSpotify() {
    const uriArray = this.state.playlist.map(track => {
      return track.uri;
    });
    Spotify.save(this.state.playlistName, uriArray, this.state.playlistId);
    this.setState({
      playlist: [],
      playlistName: "",
      playlistId: null
    });
  }

  addToPlaylist(track) {
    //this checks if the song is already in the playlist
    let SongNotInList = this.state.playlist.every(
      trackInList => trackInList.id !== track.id
    );
    if (SongNotInList) {
      const playlist = this.state.playlist;
      playlist.push(track);
      this.setState({ playlist });
    }
  }

  deleteFromPlaylist(track) {
    let playlist = this.state.playlist;
    playlist.splice(playlist.findIndex(song => song === track), 1);
    this.setState({ playlist });
  }

  changePlaylistName(playlistName) {
    this.setState({ playlistName });
  }

  getPlaylistsFromSpotify() {
    Spotify.getUserPlaylists().then(playlists => {
      this.setState({ playlists });
    });
  }

  selectPlaylist(id) {
    const playlistName = this.state.playlists
      .filter(playlist => playlist.id === id)
      .reduce((acc, currValue) => acc.concat(currValue));

    Spotify.getPlaylistTracks(id).then(playlist => {
      this.setState({
        playlistName: playlistName.name,
        playlistId: id,
        playlist: playlist
      });
    });
  }

  emptyPlaylist() {
    this.setState({ playlist: [], playlistName: "", playlistId: null });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.searchSpotify} />
          <div className="App-playlist">
            <Searchlist
              addToPlaylist={this.addToPlaylist}
              searchlist={this.state.searchlist}
            />
            <Playlist
              playlistName={this.state.playlistName}
              deleteFromPlaylist={this.deleteFromPlaylist}
              playlist={this.state.playlist}
              changePLName={this.changePlaylistName}
              savePlaylist={this.saveToSpotify}
            />
            <PlaylistList
              getPlaylists={this.getPlaylistsFromSpotify}
              selectPlaylist={this.selectPlaylist}
              playlists={this.state.playlists}
              emptyPlaylist={this.emptyPlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
