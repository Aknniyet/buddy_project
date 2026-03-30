import "../../styles/login.css";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-wrapper">
        <Link to="/" className="login-brand">
          <div className="login-brand-icon">
            <Users size={22} />
          </div>
          <h1>KazakhBuddy</h1>
        </Link>

        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="login-subtitle">
            Sign in to your account to continue
          </p>

          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="email@university.edu"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>

          <p className="login-footer-text">
            Don&apos;t have an account?{" "}
            <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;