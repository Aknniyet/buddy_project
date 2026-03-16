import "../styles/navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-content">
        <div className="logo">BuddyConnect</div>

        <nav className="nav-links">
          <NavLink to="/"  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}> 
           Home 
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
           About
          </NavLink>

            <NavLink to="/guide" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}> 
            Adaptation Guide 
            </NavLink>
        </nav>

        <div className="nav-actions">
          <a href="/login" className="login">
            Log in
          </a>
          <button className="signup-btn">Sign up</button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;