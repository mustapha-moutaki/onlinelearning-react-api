import React from "react";

const TagCard = ({ tag }) => {
  return (
    <div style={{
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      padding: "16px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      backgroundColor: "#f9f9f9",
      transition: "transform 0.2s ease",
      cursor: "pointer"
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
    onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
    >
      <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>{tag.name}</h3>
      {tag.description && (
        <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>{tag.description}</p>
      )}
      {tag.count && (
        <div style={{ marginTop: "10px", fontSize: "12px", color: "#888" }}>
          {tag.count} courses
        </div>
      )}
    </div>
  );
};

export default TagCard;