import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./Api";

const Signup = () => {
  const [role, setRole] = useState("user"); // default 'user'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
console.log({ name, email, password, role });
  try {
    const res = await api.post("/user/signup", { name, email, password, role });

    // Save token
    localStorage.setItem("token", res.data.token);

    // Save role
    localStorage.setItem("role", res.data.user.role);

    // Save username (optional)
    localStorage.setItem("loggedInUser", res.data.user.name);

    alert("Signup successful");

    navigate("/"); // go to home directly
  } catch (err) {
    setError(err.response?.data?.message || "Signup failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Signup</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  className="border p-2 rounded"
>
  <option value="user">User</option>
  <option value="admin">Admin</option>
</select>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
