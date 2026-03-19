import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { currentUser } from "../../constants/dashboardData";

function DashboardTopbar() {
  return (
    <header className="dashboard-topbar">
      <h2>Overview</h2>

      <div className="topbar-actions">
        <Link to="/student/notifications" className="icon-button">
          <Bell size={20} />
        </Link>

        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="topbar-avatar"
        />
      </div>
    </header>
  );
}

export default DashboardTopbar;