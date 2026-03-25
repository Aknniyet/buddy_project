import DashboardLayout from "../../layouts/DashboardLayout";
import LocalOverviewCards from "../../components/local-dashboard/LocalOverviewCards";
import MyBuddiesCard from "../../components/local-dashboard/MyBuddiesCard";
import PendingRequestsCard from "../../components/local-dashboard/PendingRequestsCard";
import "../../styles/local-dashboard.css";

function BuddyOverviewPage() {
  return (
    <DashboardLayout title="Overview" sidebarType="buddy">
      <section className="local-overview-page">
        <div className="local-overview-header">
          <h1>Welcome back, Aigerim!</h1>
          <p>Thank you for helping international students adapt!</p>
        </div>

        <LocalOverviewCards />

        <div className="local-overview-bottom-grid">
          <MyBuddiesCard />
          <PendingRequestsCard />
        </div>
      </section>
    </DashboardLayout>
  );
}

export default BuddyOverviewPage;