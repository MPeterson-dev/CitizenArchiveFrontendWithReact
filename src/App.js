import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import "./App.css";
import SubjectCard from "./components/Subjects/SubjectCard";
import TopicsList from "./components/Topics/TopicsList";
import axios from "axios";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import DefaultCards from "./components/Subjects/DefaultCard";
import AdminPage from "./components/Admin/AdminPage";
import LessonPage from "./components/Lessons/LessonPage";

const App = () => {
  const [subjects, setSubjects] = useState([]);
  // Capture user input from search bar
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
 
  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/subjects");
      console.log("Fetched Subjects: ", response.data);
      setSubjects(response.data);
      setError(false); // No error if data is successfully fetched
    } catch (error) {
      console.error("Error fetching subjects: ", error);
      setError(true); //Trigger default cards if unsuccessful
    }
  };

  // Fetch subjects when component mounts
  useEffect(() => {
    fetchSubjects();
  }, []);

  const filteredSubjects = subjects.filter((subject) =>
    subject.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // useNavigate for Subject card click, nav to Topics page of that Subject.
  const navigate = useNavigate();

  const handleCardClick = (title) => {
    // Navigate to subjects topic page
    navigate(`/topics/${title}`);
  };

  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    setIsAdmin(user.isAdmin); // Set if user is Admin
    navigate("/"); // Redirect to homepage after successful login
  }

  return (
    <div>
      {/* Set searchTerm state to capture user input in search bar. */}
      <NavBar setSearchTerm={setSearchTerm} />
      <main className="main-container mt-4">
        {error ? (
            <DefaultCards />
        ) : (
        <Routes>
          {/* Home page with Subject Cards */}
          <Route
            path="/"
            element={
              <div className="subject-grid">
                {/* Filters subjects based on user input in search bar */}
                {filteredSubjects.map((subject, index) => (
                  <div key={index}>
                    <SubjectCard
                      icon={subject.icon}
                      title={subject.title}
                      topic_count={subject.topic_count}
                      onClick={() => handleCardClick(subject.title)}
                    />
                  </div>
                ))}
              </div>
            }
          />
          {/* Dynamic Topic Page Route, e.g., clicking Science card goes to /topics/Science */}
          <Route path="/topics/:subject" element={<TopicsList />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess }/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/lessons/:topicId" element={<LessonPage />} />
          {/* Protected Admin Route */}
          <Route path="/admin" element={isAuthenticated && isAdmin ? ( <AdminPage />) : (<Navigate to="/" />)} />
        </Routes>
        )}
        </main>
    </div>
  );
};

export default App;
