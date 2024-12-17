import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LessonCard from "./LessonCard";
import "./LessonPage.css";

const LessonPage = ({ currentUser }) => { // Destructure properly here
    const { topicId } = useParams(); // Get topic ID from URL
    const [lessons, setLessons] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/lesson/${topicId}`);
                console.log("Fetched lessons:", response.data);

                if (Array.isArray(response.data) && response.data.length > 0) {
                    setLessons([response.data[0]]); // Display only the first lesson
                } else {
                    setLessons([]); // No lessons available
                }
                setError(false);
            } catch (err) {
                console.error("Error fetching lessons:", err);
                setError(true);
            }
        };

        fetchLessons();
    }, [topicId]);

    if (error) {
        return <p>Error loading lessons. Please try again later.</p>;
    }

    if (lessons.length === 0) {
        return <p>No lessons available for this topic.</p>;
    }

    return (
        <div className="lesson-page-container">
            <h2>{lessons[0].title}</h2> {/* Display the lesson title */}
            {lessons.map((lesson) => (
                <LessonCard key={lesson.id} lessonData={lesson} currentUser={currentUser} />
            ))}
        </div>
    );
};

export default LessonPage;
