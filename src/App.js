import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import './App.css';

const App = () => {
    return (
        <div>
            <NavBar />
            {/* Other components here */}
        </div>
    );
};

export default App;
