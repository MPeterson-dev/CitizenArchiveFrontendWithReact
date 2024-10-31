// src/components/NavBar.js
import React from 'react';
import './NavBar.css';

const NavBar = ({ setSearchTerm }) => {
    return ( 
        <nav className='navbar navbar-expand-lg bg-light'>
            <div className='container d-flex justify-content-between align-items-center'>
                {/* Logo */}
                <a className='navbar-brand' href='/' title='Home'>
                    <img src='CALogo.png' alt='Logo' width='70' height='30'/>                    
                </a>

                {/* Search bar */}
                <div className='d-flex flex-grow-1 justify-content-center'>
                    <input
                        type="text"
                        className='form-control w-50'
                        placeholder='Search...'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Login button */}
                <div className='d-flex justify content-end'>
                    <button className='btn btn-primary'>Login</button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;