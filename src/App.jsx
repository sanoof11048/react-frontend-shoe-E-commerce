import { useState } from "react";
import "virtual:uno.css";
import "./App.css";
import Home from "./pages/Home";
import Science from "./pages/streams/Science";
import Commerce from "./pages/streams/Commerce";
import Humanities from "./pages/streams/Humanities";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import { CourseProvider } from "./components/Context/courseData";

function App() {
  return (
    <CourseProvider>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/science" element={<Science />} />
    <Route path="/commerce" element={<Commerce />} />
    <Route path="/humanities" element={<Humanities />} />
  </Routes>
    </CourseProvider>
  );
}

export default App;
