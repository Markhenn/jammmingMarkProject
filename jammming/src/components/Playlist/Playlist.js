import React from 'react';
import './Playlist.css';
import { Track } from '../Track/Track';

export class Playlist extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.props.changePLName(event.target.value)
    }

    handleClick() {
        this.props.deleteFromPlaylist();
    }

    render(){
        return (
            <div className="Playlist">
                <input placeholder='New Playlist' onChange={this.handleChange} />
                <div className="TrackList">
                {
                        this.props.playlist.map(track => {
                            return <Track 
                            key={track.id} 
                            track={track} 
                            onClick={this.props.deleteFromPlaylist} 
                            addDelete='-'/>
                        })
                }                   
                </div>
                <a className="Playlist-save" onClick={this.handleClick}>SAVE TO SPOTIFY</a>
                
            </div>
        )
    }
}





