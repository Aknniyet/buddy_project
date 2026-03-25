import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import "../../styles/buddy-my-buddies.css";

function MyBuddiesPage() {
  return (
    <DashboardLayout title="My Buddies" sidebarType="buddy">
      <section className="my-buddies-page">
        <div className="my-buddies-header">
          <h1>My Buddies</h1>
          <p>International students you're currently helping</p>
        </div>

        <div className="my-buddies-summary-card">
          <div className="my-buddies-summary-left">
            <div className="my-buddies-summary-icon">
              <Users size={20} />
            </div>

            <div>
              <h3>0 Active Buddies</h3>
              <p>You can support up to 3 students</p>
            </div>
          </div>

          <div className="my-buddies-summary-badge">0/3 slots filled</div>
        </div>

        <div className="my-buddies-empty-card">
          <div className="my-buddies-empty-content">
            <Users size={52} />
            <h3>No buddies yet</h3>
            <p>
              International students will send you buddy requests. You'll
              be notified when someone wants to connect.
            </p>

            <Link to="/buddy/buddy-requests" className="pending-link">
              Check pending requests
            </Link>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default MyBuddiesPage;