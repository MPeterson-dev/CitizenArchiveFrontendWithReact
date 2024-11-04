import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import './App.css';
import SubjectCard from './components/SubjectCard';
import TopicPage from './components/TopicPage';

const subjects = [
    { icon: '🔬', title: 'Science', topicCount: 15 },
    { icon: '📐', title: 'Math', topicCount: 10 },
    { icon: '📜', title: 'History', topicCount: 8 },
    //Will create list in database later. Only admin be able to add subjects. 
]

const App = () => {
    // useNavigate for Subject card click, nav to Topics page of that Subject.
    const navigate = useNavigate();
    
    const handleCardClick = (title) => {
        // Navigate to subjects topic page
        navigate(`/topics/${title}`);
    };
    
    // Filter subjects based on user input in the search bar
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSubjects = subjects.filter(subject =>
            subject.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );


    return (
        <div>
            {/* Set searchTerm state to capture user input in search bar. */}
            <NavBar setSearchTerm={setSearchTerm} />
            <main className='container mt-4'>
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
                </Routes>
            </main>
        </div>
    );
};

export default App;
