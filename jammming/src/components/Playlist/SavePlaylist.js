import React from 'react';



export class SavePlaylist extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        this.props.onClick();
    }

    render(){
        return (
            <a className="Playlist-save" onClick={this.handleClick}>SAVE TO SPOTIFY</a>
        )
    }
}