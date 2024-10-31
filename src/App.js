import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import './App.css';

const App = () => {
    return (
        <div>
            <NavBar />
            <main className='container mt-4'>
                <h1>Home page</h1>
            </main>
        </div>
    );
};

export default App;
