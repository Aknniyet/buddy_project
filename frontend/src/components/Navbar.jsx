import "../styles/navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-content">
        <div className="logo">BuddyConnect</div>

        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/guide">Adaptation Guide</a>
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