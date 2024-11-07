import React from "react";
import './SubjectCard.css';

const SubjectCard = ({ icon, title, topicCount, onClick }) => {
    return (
        <div className="card subject-card" onClick={onClick} role="button">
            <div className="card-body text-center">
                <span className="subject-icon">{icon}</span>
                <h5 className="card-title mt-2">{title}</h5>
                <p className="topic-count">Topics: {topicCount}</p>
            </div>
        </div>
    );
};

export default SubjectCard;