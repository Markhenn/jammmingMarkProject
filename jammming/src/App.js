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
      playlist: []
    }
    this.searchSpotify = this.searchSpotify.bind(this);
  }

  searchSpotify(){
    let songlist = Spotify.search();
    console.log(songlist);
    this.setState({songlist});
    
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchSpotify={this.searchSpotify} />
          <div className="App-playlist">
            <Songlist songlist={this.state.songlist} /> 
            <Playlist />
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