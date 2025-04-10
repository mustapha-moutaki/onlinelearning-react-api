import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layouts";
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Tags from "./pages/Tag";

import Statistics from './pages/Statistics';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="courses" element={<Courses />} />
         
        <Route path="/statistics" element={<Statistics />} />
        <Route path="tags" element={<Tags />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;