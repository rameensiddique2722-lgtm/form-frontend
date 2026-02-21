import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const [isValid, setIsValid] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsValid(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const user = res.data.user;

        // Optional: role-based authorization
        if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
          console.log("You are NOT authorized for this action");
          setIsValid(false);
          return;
        }

        console.log("Authorized!");
        setIsValid(true); // token valid & authorized
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          console.log("You are NOT authenticated");
        } else if (err.response?.status === 403) {
          console.log("You are NOT authorized for this action");
        } else {
          console.log("Token invalid or expired");
        }
        localStorage.removeItem("token");
        setIsValid(false);
      });
  }, [token, allowedRoles]);

  if (isValid === null) return <p>Loading...</p>;

  return isValid ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;