import React, { useEffect } from "react";
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
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import useAutoLogout from "./useAutoLogout";
import axios from "axios";

function App() {

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.get("/verify", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login";
      });
    }
  }, []);

  useAutoLogout();

  const token = localStorage.getItem("token");
  const location = useLocation();

  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>

        {/* Public Routes */}
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/" /> : <Signup />}
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/project"
          element={
            <ProtectedRoute>
              <Project />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route
          path="/skill"
          element={
            <ProtectedRoute>
              <Skill />
            </ProtectedRoute>
          }
        />

        <Route
          path="/experience"
          element={
            <ProtectedRoute>
              <Experience />
            </ProtectedRoute>
          }
        />

        {/* ✅ Admin Only Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </>
  );
}

export default App;