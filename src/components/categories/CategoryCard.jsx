import React from "react";
import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        background: "#f9f9f9",
      }}
    >
      <h3>{category.name}</h3>
      {category.description && <p>{category.description}</p>}
      <Link
        to={`/courses?category=${category.id}`}
        style={{
          display: "inline-block",
          marginTop: "10px",
          padding: "8px 16px",
          background: "#28a745",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        View Courses
      </Link>
    </div>
  );
}

export default CategoryCard;