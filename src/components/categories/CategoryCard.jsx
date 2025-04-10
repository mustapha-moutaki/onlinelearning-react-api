import React from "react";

const CategoryCard = ({ category, onEdit, onDelete }) => {
  return (
    <div style={{
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      padding: "16px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      backgroundColor: "#f9f9f9",
      position: "relative"
    }}>
      <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>{category.name}</h3>
      {category.description && (
        <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>{category.description}</p>
      )}
      
      <div style={{ 
        display: "flex", 
        justifyContent: "flex-end", 
        gap: "10px", 
        marginTop: "15px" 
      }}>
        <button 
          onClick={onEdit}
          style={{
            backgroundColor: "#2196F3",
            color: "white",
            padding: "5px 10px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          Edit
        </button>
        <button 
          onClick={onDelete}
          style={{
            backgroundColor: "#f44336",
            color: "white",
            padding: "5px 10px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;