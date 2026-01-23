import { Link } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  return (
    <div className="auth-container">
      <h2>Login</h2>

      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button className="primary-btn">Login</button>

      <p>
        New user? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
