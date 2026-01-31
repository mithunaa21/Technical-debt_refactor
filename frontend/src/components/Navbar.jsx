// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>AI Tech Debt</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/analyze">Analyze</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
