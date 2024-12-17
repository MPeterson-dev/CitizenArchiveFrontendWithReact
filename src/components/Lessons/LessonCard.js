import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LessonCard.css";

const LessonCard = ({ lessonData, currentUser }) => {
    const { id, title, description, video_url } = lessonData;
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [upvotes, setUpvotes] = useState(0); // Track upvotes

    // Fetch comments for the lesson
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/comments/${id}`);
                setComments(response.data);
            } catch (err) {
                console.error("Error fetching comments:", err);
            }
        };
        fetchComments();
    }, [id]);

    // Handle Upvote
    const handleUpvote = () => {
        setUpvotes((prev) => prev + 1); // Placeholder logic for upvote
    };

    // Handle Report
    const handleReport = () => {
        alert("Lesson reported for review.");
    };

    // Handle Share
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href); // Copy lesson URL
        alert("Lesson link copied to clipboard!");
    };

    // Submit a new comment
    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!newComment.trim()) {
            alert("Comment cannot be empty.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/comments", {
                lesson_id: id,
                username: currentUser, // Use current logged-in user's username
                text: newComment.trim(),
            });

            if (response.data.success) {
                setComments([...comments, { username: currentUser, text: newComment.trim(), created_at: new Date().toISOString() }]);
                setNewComment("");
            }
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    return (
        <div className="lesson-card">
            {/* Video Area */}
            <div className="video-container">
                <iframe src={video_url} title={title} frameBorder="0" allowFullScreen></iframe>
            </div>

            {/* Interaction Buttons */}
            <div className="lesson-buttons">
                <button className="upvote-button" onClick={handleUpvote}>
                    👍 Upvote {upvotes}
                </button>
                <button className="report-button" onClick={handleReport}>
                    🚩 Report
                </button>
                <button className="share-button" onClick={handleShare}>
                    🔗 Share
                </button>
            </div>

            {/* Lesson Details */}
            <div className="lesson-details">
                <p>{description}</p>
            </div>

            {/* Comments Section */}
            <div className="lesson-comments">
                <h3>Comments</h3>
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>
                            <strong>{comment.username}:</strong> {comment.text}
                        </li>
                    ))}
                </ul>

                {/* Comment Form */}
                {currentUser ? (
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>
                ) : (
                    <p>You must be logged in to add a comment.</p>
                )}
            </div>
        </div>
    );
};

export default LessonCard;
