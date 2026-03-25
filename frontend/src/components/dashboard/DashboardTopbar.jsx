import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { currentUser } from "../../constants/dashboardData";
import { localCurrentUser } from "../../constants/localDashboardData";

function DashboardTopbar({ title = "Overview", sidebarType = "student" }) {
  const notificationsPath =
    sidebarType === "buddy"
      ? "/buddy/notifications"
      : "/student/notifications";

  const user =
    sidebarType === "buddy"
      ? localCurrentUser
      : currentUser;

  return (
    <header className="dashboard-topbar">
      <h2>{title}</h2>

      <div className="topbar-actions">
        <Link to={notificationsPath} className="icon-button">
          <Bell size={20} />
        </Link>

        <img src={user.avatar} alt={user.name} className="topbar-avatar" />
      </div>
    </header>
  );
}

export default DashboardTopbar;