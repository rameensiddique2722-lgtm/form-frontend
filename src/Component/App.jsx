import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Contact from "./Contact";
import About from "./About";
import Skill from "./Skill";
import Experience from "./Experience";
import Header from "./Header";
import Project from "./Project";

function App() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Login or Signup page pe header hide karne ke liye
  const hideHeader = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideHeader && <Header />} {/* header show only if not login/signup */}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={token ? <Navigate to="/" /> : <Signup />} />

        {/* Protected Routes */}
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/about" element={token ? <About /> : <Navigate to="/login" />} />
        <Route path="/project" element={token ? <Project /> : <Navigate to="/login" />} />
        <Route path="/contact" element={token ? <Contact /> : <Navigate to="/login" />} />
        <Route path="/skill" element={token ? <Skill /> : <Navigate to="/login" />} />
        <Route path="/experience" element={token ? <Experience /> : <Navigate to="/login" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
