import { Link } from "react-router-dom";
import "../styles/auth.css";

export default function Signup() {
  return (
    <div className="auth-container">
      <h2>Sign Up</h2>

      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button className="primary-btn">Create Account</button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
