import React from 'react';
import './Track.css';

export class Track extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        const track = this.props.track;
        this.props.onClick(track);
    }

    
    render(){
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.track}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <a className="Track-action" onClick={this.handleClick}>{this.props.addDelete}</a>
            </div>
        )
    }
};