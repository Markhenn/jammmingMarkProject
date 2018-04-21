import React from 'react';
import './Songlist.css';
import {Song} from '../Song/Song';

export class Songlist extends React.Component {


    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <div className="TrackList">
                    {
                        this.props.songlist.map(song => {
                            return <Song key={song.id} song={song} onClick={this.props.addToPlaylist} addDelete='+' />;
                        })
                           
                    }
                </div>
            </div>


        )
    }
} 

