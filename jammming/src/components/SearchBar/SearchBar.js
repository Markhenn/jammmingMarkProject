import React from 'react';
import './SearchBar.css';



export class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }


    handleSearch(){
        this.props.searchSpotify();
    }

    render(){
        return (
            <div className="SearchBar">
                <input placeholder='Enter a Song, Album or Artist' />
                <a onClick={this.handleSearch}>SEARCH</a>
            </div>
        )
    }
}


