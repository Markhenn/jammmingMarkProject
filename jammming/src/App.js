import React, { Component } from 'react';
import './App.css';
import {SearchBar} from './components/SearchBar/SearchBar';
import {Searchlist} from './components/Searchlist/Searchlist';
import {Playlist} from './components/Playlist/Playlist';
import {Spotify} from './util/Spotify';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchlist: [],
      playlist: [],
      name: '',
    }
    this.searchSpotify = this.searchSpotify.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.deleteFromPlaylist = this.deleteFromPlaylist.bind(this);
    this.changePlaylistName = this.changePlaylistName.bind(this);
    this.saveToSpotify = this.saveToSpotify.bind(this);
  }

  searchSpotify(searchWord){;
   Spotify.search(searchWord).then(searchlist => {
     this.setState({ searchlist });
   });
  }

  saveToSpotify(){
    const uriArray = this.state.playlist.map(track => {
      return track.uri;
    });
    Spotify.save(this.state.name, uriArray);
  }

  addToPlaylist(track){
    //this checks if the song is already in the playlist
    let SongNotInList = this.state.playlist.every(song => song !== track);

    if(SongNotInList) {
      const playlist = this.state.playlist;
      playlist.push(track);
      this.setState({ playlist });
    } 

  }

  deleteFromPlaylist(track){
    let playlist = this.state.playlist;
    playlist.splice(playlist.findIndex(song => song === track), 1);
    this.setState({playlist});

  }

  changePlaylistName(name){
    this.setState({name});
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchSpotify={this.searchSpotify} />
          <div className="App-playlist">
            <Searchlist addToPlaylist={this.addToPlaylist} searchlist={this.state.searchlist} /> 
            <Playlist deleteFromPlaylist={this.deleteFromPlaylist} playlist={this.state.playlist} changePLName={this.changePlaylistName} savePlaylist={this.saveToSpotify}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
