import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './Api'; // import Axios instance with interceptor

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const goToSignup = () => navigate("/signup");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous error
    try {
      const res = await api.post("/user/login", { email, password });
      
      // Save token once
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role); // 👈 important
      localStorage.setItem("admin", res.data.role);
      alert("Login successful");

      // Clear form
      setEmail("");
      setPassword("");

      if (res.data.role === "admin") {
      navigate("/dashboard");   // admin dashboard
    } else {
      navigate("/");           // normal home page
    }
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>

        <p className="text-center text-gray-600 mt-2">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={goToSignup}
            className="text-blue-600 hover:underline font-semibold"
          >
            Signup
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
