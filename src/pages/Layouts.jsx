import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav style={{ padding: "16px", background: "#f0f0f0", marginBottom: "20px" }}>
        <ul style={{ display: "flex", listStyle: "none", gap: "20px" }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Link to="/statistics">Statistics</Link>
          </li>
          <li>
            <Link to="/tags">Tags</Link>
          </li>
        </ul>
      </nav>
      <main style={{ padding: "0 20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;