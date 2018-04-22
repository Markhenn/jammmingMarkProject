import React from 'react';
import './Playlist.css';
import { Track } from '../Track/Track';
import { PlaylistName } from './Playlistname';
import { SavePlaylist } from './SavePlaylist';

export class Playlist extends React.Component {


    render(){
        return (
            <div className="Playlist">
                <PlaylistName changePLName={this.props.changePLName} />
                <div className="TrackList">
                {
                        this.props.playlist.map(track => <Track key={track.id} track={track} onClick={this.props.deleteFromPlaylist} addDelete='-'/>)
                }                   
                </div>
                <SavePlaylist onClick={this.props.savePlaylist} />
            </div>
        )
    }
}





