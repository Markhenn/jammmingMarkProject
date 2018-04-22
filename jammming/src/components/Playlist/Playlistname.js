import React from 'react';
export class PlaylistName extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.changePLName(event.target.value)  
    }

    render(){
        return (
            <input placeholder='New Playlist' onChange={this.handleChange} />
        )
    }
}