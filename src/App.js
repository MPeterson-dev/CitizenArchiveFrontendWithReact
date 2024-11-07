import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
import './App.css';
import SubjectCard from './components/Subjects/SubjectCard';
import TopicPage from './components/Navbar/TopicPage';
import axios from 'axios';
import Login from './components/User/Login';
import Register from './components/User/Register';

const App = () => {
    const [subjects, setSubjects] = useState([]);
    // Capture user input from search bar
    const [searchTerm, setSearchTerm] = useState('');

    const fetchSubjects = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/subjects');
            console.log("Fetched Subjects: ", response.data)
            setSubjects(response.data);
        }catch(error){
            console.error('Error fetching subjects: ', error);
        }
    };

    // Fetch subjects when component mounts
    useEffect(() => {
        fetchSubjects();
    }, []);

    const filteredSubjects = subjects.filter(subject => 
        subject.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // useNavigate for Subject card click, nav to Topics page of that Subject.
    const navigate = useNavigate();
    
    const handleCardClick = (title) => {
        // Navigate to subjects topic page
        navigate(`/topics/${title}`);
    };
    
    return (
        <div>
            {/* Set searchTerm state to capture user input in search bar. */}
            <NavBar setSearchTerm={setSearchTerm} />
            <main className='container-fluid d-flex justify-content-center align-items-center mt-4'>
                <Routes>
                    {/* Home page with Subject Cards */}
                    <Route
                        path='/'
                        element={
                            <div className='row justify-content-center'>
                                {/* Filters subjects based on user input in search bar */}
                                {filteredSubjects.map((subject, index) => (
                                    <div key={index} className='col-6 col-md-4 col-lg-3 col-xl-2 mb-4'>
                                        <SubjectCard
                                            icon={subject.icon}
                                            title={subject.title}
                                            topicCount={subject.topicCount}
                                            onClick={() => handleCardClick(subject.title)}
                                        />
                                    </div>
                                ))}
                            </div>
                        }
                    />
                    {/* Dynamic Topic Page Route, e.g., clicking Science card goes to /topics/Science */}
                    <Route path='/topics/:subject' element={<TopicPage />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
