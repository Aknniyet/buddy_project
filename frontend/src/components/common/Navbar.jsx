import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import "../../styles/navbar.css";
import logo from "../../assets/kazakhbuddy-logo-brand.png";
import { useI18n } from "../../context/I18nContext";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useI18n();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-content">
        <NavLink
          to="/"
          className="logo"
          aria-label={`${t("common.brand")} ${t("nav.home")}`}
          onClick={closeMenu}
        >
          <img src={logo} alt={t("common.brand")} className="logo-mark" />
          <span className="logo-text">
            <span className="logo-text-primary">Kazakh</span>
            <span className="logo-text-accent">Buddy</span>
          </span>
        </NavLink>

        <div className="navbar-mobile-tools">
          <NavLink to="/login" className="mobile-login-link-top" onClick={closeMenu}>
            {t("common.logIn")}
          </NavLink>

          <button
            type="button"
            className="nav-toggle"
            aria-label={isMenuOpen ? t("common.closeMenu") : t("common.openMenu")}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div className={`nav-panel ${isMenuOpen ? "open" : ""}`}>
          <nav className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={closeMenu}
            >
              {t("nav.home")}
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={closeMenu}
            >
              {t("nav.about")}
            </NavLink>

            <NavLink
              to="/guide"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={closeMenu}
            >
              {t("nav.guide")}
            </NavLink>
          </nav>

          <div className="nav-actions">
            <div className="desktop-theme-control">
              <ThemeToggle />
            </div>
            <div className="desktop-language-control">
              <LanguageSwitcher />
            </div>

            <div className="mobile-utility-row">
              <div className="mobile-theme-control">
                <ThemeToggle compact />
              </div>
              <LanguageSwitcher className="mobile-language-switcher" />
            </div>

            <NavLink to="/login" className="login desktop-auth-link" onClick={closeMenu}>
              {t("common.logIn")}
            </NavLink>

            <NavLink to="/signup" className="signup-btn desktop-auth-link" onClick={closeMenu}>
              {t("common.signUp")}
            </NavLink>

            <NavLink to="/signup" className="signup-btn mobile-signup-link" onClick={closeMenu}>
              {t("common.signUp")}
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
