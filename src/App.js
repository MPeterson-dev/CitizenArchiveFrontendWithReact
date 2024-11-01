import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import './App.css';
import SubjectCard from './components/SubjectCard';
import TopicPage from './components/TopicPage';

const subjects = [
    { icon: '🔬', title: 'Science', topicCount: 15 },
    { icon: '📐', title: 'Math', topicCount: 10 },
    { icon: '📜', title: 'History', topicCount: 8 },
]

const App = () => {
    const navigate = useNavigate();

    const handleCardClick = (title) => {
        // Navigate to subjects topic page
        navigate(`/topics/${title}`);
    };

    return (
        
            <div>
                <NavBar />
                <main className='container mt-4'>
                    <Routes>
                        {/* Home page with Subject Cards */}
                        <Route
                            path='/'
                            element={
                                <div className='d-flex flex-wrap justify-content-center'>
                                    {subjects.map((subject, index) => (
                                        <SubjectCard
                                        key={index}
                                        icon={subject.icon}
                                        title={subject.title}
                                        topicCount={subject.topicCount}
                                        onClick={() => handleCardClick(subject.title)}
                                        />
                                    ))}
                                </div>
                            }
                        />
                        {/* Dynamic Topic Page Route e.g. click Science card /topics/Science  */}
                        <Route path='/topics/:subject' element={<TopicPage />} />    
                    </Routes>
                </main>            
            </div>
        
    );
};

export default App;
