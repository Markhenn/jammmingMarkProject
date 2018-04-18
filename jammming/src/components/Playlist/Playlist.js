import React from 'react';
import './Playlist.css';
import { Song } from '../Song/Song';
import { PlaylistName } from './Playlistname';

export class Playlist extends React.Component {


    


    render(){
        return (
            <div className="Playlist">
                <PlaylistName />
                <div className="TrackList">
                {
                        this.props.playlist.map(track => <Song key={track.id} song={track} onClick={this.props.deleteFromPlaylist} addDelete='-'/>)
                }                   
                </div>
                <a className="Playlist-save">SAVE TO SPOTIFY</a>
            </div>
        )
    }
}





