import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const useAutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const decoded = jwtDecode(token);

    if (!decoded.exp) throw new Error("No exp in token");

    const expTime = decoded.exp * 1000;
    const timeLeft = expTime - Date.now();

    if (timeLeft <= 0) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      const timer = setTimeout(() => {
        localStorage.removeItem("token");
        alert("Session expired. Please login again.");
        navigate("/login");
      }, timeLeft);

      return () => clearTimeout(timer);
    }
  } catch (err) {
    // yaha hmy btye ga token invalid , expired , dummy
    localStorage.removeItem("token");
    navigate("/login");
  }
}, [navigate]);

};

export default useAutoLogout;
