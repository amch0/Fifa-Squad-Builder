import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo" />
      <div className="nav-links-container">
        <Link to="/players">Players</Link>
        <Link to="/teams">Teams</Link>
      </div>
    </div>
  );
};

export default Navbar;
