import React from 'react';
import './Playlist.css';
import { Song } from '../Song/Song';
import { PlaylistName } from './Playlistname';
import { SavePlaylist } from './SavePlaylist';

export class Playlist extends React.Component {


    render(){
        return (
            <div className="Playlist">
                <PlaylistName changePLName={this.props.changePLName} />
                <div className="TrackList">
                {
                        this.props.playlist.map(track => <Song key={track.id} song={track} onClick={this.props.deleteFromPlaylist} addDelete='-'/>)
                }                   
                </div>
                <SavePlaylist onClick={this.props.savePlaylist} />
            </div>
        )
    }
}





