import { NavLink, Link } from "react-router-dom";
import { LogOut, Users } from "lucide-react";
import { sidebarLinks, currentUser } from "../../constants/dashboardData";

function DashboardSidebar() {
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
          {sidebarLinks.map((item) => {
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
          <div className="sidebar-user-avatar">{currentUser.initials}</div>
          <div>
            <h4>{currentUser.name}</h4>
            <p>{currentUser.role}</p>
          </div>
        </div>

        <button className="logout-button">
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;