import React from 'react';
import SubjectCard from './SubjectCard';

const defaultSubjects = [
    { icon: 'X', title: 'Subject1', topicCount: 0 },
    { icon: 'X', title: 'Subject2', topicCount: 0 },
    { icon: 'X', title: 'Subject3', topicCount: 0 },
    { icon: 'X', title: 'Subject4', topicCount: 0 },
    { icon: 'X', title: 'Subject5', topicCount: 0 },
];

const DefaultCards = () => (
    <div className='container mt-4'>
        <p className='alert alert-warning'> These are default Subjects. Please connect to the backend for live data.</p>
        <div className='subject-grid'>
            {defaultSubjects.map((subject, index) => (
                <div key={index} className='subject-card'>
                    <SubjectCard
                    icon={subject.icon}
                    title={subject.title}
                    topicCount={subject.topicCount}
                    />
                </div>
            ))}
        </div>
    </div>
);

export default DefaultCards;