import React, { Component } from 'react';
import './App.css';
import {SearchBar} from './components/SearchBar/SearchBar';
import {Songlist} from './components/Songlist/Songlist';
import {Playlist} from './components/Playlist/Playlist';
import {Spotify} from './util/Spotify';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      songlist: [],
      playlist: [],
      name: ''
    }
    this.searchSpotify = this.searchSpotify.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.deleteFromPlaylist = this.deleteFromPlaylist.bind(this);
    this.changePlaylistName = this.changePlaylistName.bind(this);
    this.saveToSpotify = this.saveToSpotify.bind(this);
  }

  searchSpotify(){
    let songlist = Spotify.search();
    this.setState({songlist});
    
  }

  saveToSpotify(){
    console.log(`Saving Playlist: ${this.state.name} to Spotify!`);
  }

  addToPlaylist(track){

    
    let SongNotInList = true;
    this.state.playlist.forEach(song => {

      if(track.id === song.id){
        console.log('Track already in List. Please choose another song!');
        return SongNotInList = false;
      } 
      
    });

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
    console.log(this.state.name);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchSpotify={this.searchSpotify} />
          <div className="App-playlist">
            <Songlist addToPlaylist={this.addToPlaylist} songlist={this.state.songlist} /> 
            <Playlist deleteFromPlaylist={this.deleteFromPlaylist} playlist={this.state.playlist} changePLName={this.changePlaylistName} savePlaylist={this.saveToSpotify}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;


/* old app class saved
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
*/