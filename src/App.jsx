import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Tags from "./pages/Tags";
import "./App.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="categories" element={<Categories />} />
          <Route path="courses" element={<Courses />} />
          <Route path="tags" element={<Tags />} />
          {/* <Route path="courses/:id" element={<CourseDetail />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}