import React from "react";
import { useParams } from 'react-router-dom';

const TopicPage = () => {
    const { subject } = useParams(); // Get subject title from URL

    return (
        <div>
            <h2>{subject} Topics</h2>
            
        </div>
    )
}

export default TopicPage;