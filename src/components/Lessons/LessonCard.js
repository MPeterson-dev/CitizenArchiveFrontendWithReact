import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LessonCard.css";

const LessonCard = ({ lessonData, isAuthenticated, currentUser }) => {
    const { id, title, description, video_url } = lessonData;
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

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
                // Append the new comment to the comments array
                setComments([...comments, { username: currentUser, text: newComment.trim(), created_at: new Date().toISOString() }]);
                setNewComment(""); // Clear the input
            }
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    return (
        <div className="lesson-card">
            {/* Video Area */}
            <div className="video-container">
                <iframe
                    src={video_url}
                    title={title}
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
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

                {/* Show the comment form only if the user is authenticated */}
                {isAuthenticated ? (
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
