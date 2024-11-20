import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TopicsList.css";

const TopicsList = () => {
    const { subject } = useParams(); // Get subject from URL
    const [topics, setTopics] = useState([]); // Fetch topics based on subject
    const [error, setError] = useState(false);
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/topics/${subject}`);
                setTopics(response.data);
                setError(false);
            } catch (err) {
                console.error("Error fetching topics:", err);
                setError(true);
            }
        };

        fetchTopics();
    }, [subject]);

    if (error) {
        return <p>Error loading topics for {subject}. Please try again later.</p>;
    }

    return (
        <div className="topics-list-container">
            <h2>Topics for {subject}</h2>
            <ul className="topics-list">
                {topics.map((topic) => (
                    <li
                        key={topic.id}
                        className="topics-list-item"
                        onClick={() => {
                            console.log(`Navigating to lesson with topic ID: ${topic.id}`);
                            navigate(`/lessons/${topic.id}`)}}>
                        <h3 className="topic-title">{topic.title}</h3>
                        <p className="topic-description">{topic.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopicsList;
