import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "./CategoryCard";

function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching categories...");
    axios
      .get("http://127.0.0.1:8000/api/categories")
      .then((response) => {
        console.log("API categories response:", response.data);
        setCategories(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
      {categories.length === 0 ? (
        <p>No categories available</p>
      ) : (
        categories.map((category, index) => (
          <CategoryCard key={category.id || index} category={category} />
        ))
      )}
    </div>
  );
}

export default CategoriesList;