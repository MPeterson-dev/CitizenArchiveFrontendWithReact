import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
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
import SearchBar from "./components/SearchBar/SearchBar";

const App = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null); //store user info

  const navigate = useNavigate();
  const location = useLocation(); // To track the current route

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/subjects");
      console.log("Fetched Subjects: ", response.data);
      setSubjects(response.data);
      setError(false);
    } catch (error) {
      console.error("Error fetching subjects: ", error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const filteredSubjects = subjects.filter((subject) =>
    subject.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (title) => {
    navigate(`/topics/${title}`);
  };

  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    setIsAdmin(user.isAdmin);
    setUser(user); //Update user state (logged in or null)

    if(user.isAdmin){
      navigate("/admin");
    }else{
    navigate("/");
    }
  };

  return (
    <div>
      <NavBar user={user}/>
      <main className="main-container mt-4">
        <div className="search-and-subjects">
          {/* Conditionally render the search bar only on the home page */}
          {location.pathname === "/" && (
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          )}
          {error ? (
            <DefaultCards />
          ) : (
            <Routes>
              <Route path="/" element={
                  <div className="subject-grid">
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
              <Route path="/topics/:subject" element={<TopicsList />} />
              <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/lessons/:topicId" element={<LessonPage currentUser={isAuthenticated ? user?.email : null }/>} />
              <Route path="/admin" element={isAuthenticated && isAdmin ? <AdminPage /> : <Navigate to="/" />}/>
            </Routes>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
