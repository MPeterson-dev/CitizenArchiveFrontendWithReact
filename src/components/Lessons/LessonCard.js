import React, { useState } from "react";
import './LessonCard.css';

const LessonCard = ({ lessonData }) => {
    const { title, description, videoUrl } = lessonData;
    const [ upvotes, setUpvotes ] = useState(0);
    const [ comments, setComments ] = useState([]);
    const [ commentText, setCommentText ] = useState('');

    const handleUpvote = () => {
        // Upvote logic here
        setUpvotes(upvotes + 1);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if(commentText.trim()){
            setComments([...comments, commentText]);
            setCommentText('');
        }
    };

    const handleReport = () => {
        //Report logic here
        alert('This lesson has been reported for review.');
    };

    return (
        <div className="lesson-card">
            {/* Video Area */}
            <div className="video-container">
                <iframe
                src={videoUrl}
                title={title}
                frameBorder="0"
                allowFullScreen
                ></iframe>
            </div>

            {/* Lesson details */}
            <div className="lesson-details">                
                <p>{description}</p>
            </div>

            {/* Interactions row */ }
            <div className="lesson-interactions">
                <button className="upvote-button" onClick={handleUpvote}>
                👍 {upvotes}
                </button>
                <button className="report-button" onClick={handleReport}>
                🚩 Report
                </button>
            </div>

            {/* Comments section */}
            <div className="lesson-comments">
                <h3>Comments</h3>
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
                <form onSubmit={handleCommentSubmit}>
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        required
                        />
                        <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default LessonCard;