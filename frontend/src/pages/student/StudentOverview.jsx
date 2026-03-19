import DashboardLayout from "../../layouts/DashboardLayout";
import OverviewCards from "../../components/dashboard/OverviewCards";
import NextStepsCard from "../../components/dashboard/NextStepsCard";
import RecentMessagesCard from "../../components/dashboard/RecentMessagesCard";

function StudentOverviewPage() {
  return (
    <DashboardLayout>
      <section className="overview-page">
        <div className="overview-welcome">
          <h1>Welcome back, Yuki!</h1>
          <p>Here's an overview of your adaptation journey</p>
        </div>

        <OverviewCards />

        <div className="overview-bottom-grid">
          <NextStepsCard />
          <RecentMessagesCard />
        </div>
      </section>
    </DashboardLayout>
  );
}

export default StudentOverviewPage;