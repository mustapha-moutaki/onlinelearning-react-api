import React, { useEffect, useState } from "react";
import axios from "axios";
import TagCard from "./TagCard";

function TagsList() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching tags...");
    axios
      .get("http://127.0.0.1:8000/api/tags")
      .then((response) => {
        console.log("API tags response:", response.data);
        setTags(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
        setError("Failed to load tags");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading tags...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
      {tags.length === 0 ? (
        <p>No tags available</p>
      ) : (
        tags.map((tag, index) => (
          <TagCard key={tag.id || index} tag={tag} />
        ))
      )}
    </div>
  );
}

export default TagsList;