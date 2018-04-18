import React from 'react';



export class PlaylistName extends React.Component{
    constructor(props){
        super(props);
        this.state = {name: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value});
        console.log(this.state.name);
    }

    render(){
        return (
            <input placeholder='New Playlist' onChange={this.handleChange} />
        )
    }
}