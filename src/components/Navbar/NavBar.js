import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = ({ setSearchTerm }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <a className="navbar-brand" href="/" title="Home">
          <img src="CALogo.png" alt="Logo" width="70" height="30" />
        </a>

        {/* Login button */}
        <div className="d-flex justify content-end">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
