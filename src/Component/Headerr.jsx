import { Link } from "react-router-dom";

function Headerr() {
  const role = localStorage.getItem("role");

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>

      {role === "admin" && (
        <Link to="/dashboard">Dashboard</Link>
      )}
    </nav>
  );
}

export default Headerr;