// Login.js (with email update from previous step)
import React, { useState } from "react";
import axios from "axios";
import "./UserForms.css";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      if (response.data.success) {
        onLoginSuccess(response.data.user); // Pass user data with isAdmin
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="form-card">
        <h2>Login</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Submit
          </button>
        </form>
        <p className="mt-3">
          New user? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
