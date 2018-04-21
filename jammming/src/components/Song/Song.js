import React from 'react';
import './song.css';

export class Song extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        const track = this.props.song;
        this.props.onClick(track);
    }

    
    render(){
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.song.track}</h3>
                    <p>{this.props.song.artist} | {this.props.song.album}</p>
                </div>
                <a className="Track-action" onClick={this.handleClick}>{this.props.addDelete}</a>
            </div>
        )
    }
};