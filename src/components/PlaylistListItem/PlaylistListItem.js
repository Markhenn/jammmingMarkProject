import React from "react";
import "./PlaylistListItem.css";

export class PlaylistListItem extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onSelect(this.props.playlist.id);
  }

  render() {
    return (
      <div className="PlaylistListItem">
        <div className="PlaylistListItem-Information">
          <a className="PlaylistAction" onClick={this.handleClick}>
            {this.props.playlist.name}
          </a>
        </div>
      </div>
    );
  }
}
