import React from 'react';
import './Searchlist.css';
import {Track} from '../Track/Track';

export class Searchlist extends React.Component {


    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <div className="TrackList">
                    {
                        this.props.searchlist.map(track => {
                            return <Track key={track.id} track={track} onClick={this.props.addToPlaylist} addDelete='+' />;
                        })
                           
                    }
                </div>
            </div>


        )
    }
} 

