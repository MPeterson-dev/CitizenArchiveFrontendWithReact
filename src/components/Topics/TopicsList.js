import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TopicsList.css';
import { useNavigate } from 'react-router-dom';

const TopicsList = () => {
    const { subject } = useParams(); // Get subject from URL
    const [topics, setTopics] = useState([]);
    const [, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopics = async() => {
            try {
                const response = await axios.get(`http://localhost:5000/api/topics/${subject}`);
                setTopics(response.data);
            }catch(error){
                console.error('Error fetching topics:', error);    
                setError(true);
            }
        };
        fetchTopics();
    }, [subject]);

    return(
        <div className='topics-list-container'>
            <h2>Topics for {subject}</h2>
            <ul className='topics-list'>
                {topics.map((topic) => (
                    <li key={topic.id} className='topic-item'>
                        <h3 className='topic-title' onClick={() => navigate(`/topics/${subject}/${topic.id}`)} role='button'>{topic.title}</h3>
                        <p className='topic-description'>{topic.description}</p>                        
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopicsList;