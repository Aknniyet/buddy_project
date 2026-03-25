import { NavLink, Link, useNavigate } from "react-router-dom";
import { LogOut, Users } from "lucide-react";
import { sidebarLinks, currentUser } from "../../constants/dashboardData";
import {
  localSidebarLinks,
  localCurrentUser,
} from "../../constants/localDashboardData";

function DashboardSidebar({ sidebarType = "student" }) {
  const navigate = useNavigate();

  const links = sidebarType === "buddy" ? localSidebarLinks : sidebarLinks;
  const user = sidebarType === "buddy" ? localCurrentUser : currentUser;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="dashboard-sidebar">
      <div>
        <Link to="/" className="sidebar-logo">
          <div className="logo-icon">
            <Users size={18} />
          </div>
          <span>BuddyConnect</span>
        </Link>

        <nav className="sidebar-nav">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">{user.initials}</div>
          <div>
            <h4>{user.name}</h4>
            <p>{user.role}</p>
          </div>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;