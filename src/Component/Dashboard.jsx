import React, { useEffect, useState } from "react";
import api from "./Api";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Admin welcome message
    api.get("/user/admin", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage(err.response?.data?.message || "Error"));

    // Optional: fetch all users (admin only)
    api.get("/user/all", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => setUsers(res.data.users))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-6">{message}</p>

      <h2 className="text-xl font-semibold mb-2">All Users</h2>
      <ul>
        {users.length > 0 ? (
          users.map(user => (
            <li key={user._id}>
              {user.name} - {user.email} - {user.role}
            </li>
          ))
        ) : (
          <p>No users found</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;