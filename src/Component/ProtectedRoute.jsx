import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsValid(false);
      return;
    }

    axios.get("http://localhost:5000/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setIsValid(true); // token valid
    })
    .catch(() => {
      localStorage.removeItem("token");
      setIsValid(false); // token invalid
    });

  }, [token]);

  if (isValid === null) return <p>Loading...</p>;

  return isValid ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;