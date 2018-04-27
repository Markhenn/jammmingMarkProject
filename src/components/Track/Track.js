import React from "react";
import "./Track.css";

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.removeTrack = this.removeTrack.bind(this);
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack() {
    const track = this.props.track;
    this.props.onClick(track);
  }

  removeTrack() {
    const track = this.props.track;
    this.props.onClick(track);
  }

  renderAction(isRemoval) {
    if (isRemoval) {
      return (
        <a className="Track-action" onClick={this.removeTrack}>
          -
        </a>
      );
    } else {
      return (
        <a className="Track-action" onClick={this.addTrack}>
          +
        </a>
      );
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p>
        </div>
        {this.renderAction(this.props.isRemoval)}
      </div>
    );
  }
}
