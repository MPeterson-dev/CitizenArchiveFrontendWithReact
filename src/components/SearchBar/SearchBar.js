import React from 'react';
import "./SearchBar.css";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className='search-bar-container'>
            <input
            type="text"
            value={searchTerm}
            onChange={(element) => setSearchTerm(element.target.value)}
            placeholder='Search subjects...'
            className='search-bar'
            />
        </div>
    )
};

export default SearchBar;