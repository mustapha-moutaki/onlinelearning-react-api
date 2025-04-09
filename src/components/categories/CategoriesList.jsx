import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "./CategoryCard";

function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const fetchCategories = () => {
    setLoading(true);
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
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const openAddModal = () => {
    setFormData({ name: "", description: "" });
    setIsAddModalOpen(true);
  };

  const openEditModal = (category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name || "",
      description: category.description || "",
    });
    setIsEditModalOpen(true);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    setLoading(true);
    
    axios
      .post("http://127.0.0.1:8000/api/categories", formData)
      .then((response) => {
        console.log("Category added:", response.data);
        setIsAddModalOpen(false);
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error adding category:", error);
        setError("Failed to add category");
        setLoading(false);
      });
  };

  const handleEditCategory = (e) => {
    e.preventDefault();
    if (!currentCategory) return;
    
    setLoading(true);
    axios
      .put(`http://127.0.0.1:8000/api/categories/${currentCategory.id}`, formData)
      .then((response) => {
        console.log("Category updated:", response.data);
        setIsEditModalOpen(false);
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        setError("Failed to update category");
        setLoading(false);
      });
  };

  if (loading && categories.length === 0) return <p>Loading categories...</p>;
  if (error && categories.length === 0) return <p>Error: {error}</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Categories</h2>
        <button
          onClick={openAddModal}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add New Category
        </button>
      </div>

  
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
        {categories.length === 0 ? (
          <p>No categories available</p>
        ) : (
          categories.map((category, index) => (
            <CategoryCard 
              key={category.id || index} 
              category={category} 
              onEdit={() => openEditModal(category)}
            />
          ))
        )}
      </div>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "5px",
            width: "400px",
            maxWidth: "90%"
          }}>
            <h3>Add New Category</h3>
            <form onSubmit={handleAddCategory}>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
              </div>
             
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    padding: "8px 15px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "8px 15px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {isEditModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "5px",
            width: "400px",
            maxWidth: "90%"
          }}>
            <h3>Edit Category</h3>
            <form onSubmit={handleEditCategory}>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="edit-name" style={{ display: "block", marginBottom: "5px" }}>Name:</label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
              </div>
              
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    padding: "8px 15px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "8px 15px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriesList;