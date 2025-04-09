import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Online Learning Platform</h1>
      <p>Browse our selection of courses and start learning today!</p>
      <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
        <Link to="/courses" style={{ 
          padding: "10px 20px", 
          background: "#007bff", 
          color: "white", 
          textDecoration: "none",
          borderRadius: "4px"
        }}>
          View Courses
        </Link>
        <Link to="/categories" style={{ 
          padding: "10px 20px", 
          background: "#28a745", 
          color: "white", 
          textDecoration: "none",
          borderRadius: "4px"
        }}>
          Explore Categories
        </Link>
      </div>
    </div>
  );
};

export default Home;