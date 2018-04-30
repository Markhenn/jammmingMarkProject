import React from "react";
import { Track } from "../Track/Track";
import './Tracklist.css';

export class Tracklist extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracklist.map(track => {
          return (
            <Track
              key={track.id}
              track={track}
              onClick={this.props.addRemoveButton}
              isRemoval={this.props.isRemoval}
            />
          );
        })}
      </div>
    );
  }
}
