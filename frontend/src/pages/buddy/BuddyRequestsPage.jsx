import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import RequestsTabs from "../../components/buddy-requests/RequestsTabs";
import RequestCard from "../../components/buddy-requests/RequestCard";
import PastRequestsEmptyState from "../../components/buddy-requests/PastRequestsEmptyState";
import {pendingBuddyRequests,pastBuddyRequests, } from "../../constants/buddyRequestsData";
import "../../styles/buddy-requests.css";

function BuddyRequestsPage() {
  const [activeTab, setActiveTab] = useState("pending");

  const handleAccept = (requestId) => {
    console.log("Accepted request:", requestId);
  };

  const handleDecline = (requestId) => {
    console.log("Declined request:", requestId);
  };

  return (
    <DashboardLayout title="Requests" sidebarType="buddy">
      <section className="buddy-requests-page">
        <div className="buddy-requests-header">
          <h1>Buddy Requests</h1>
          <p>
            Review and respond to connection requests from international students
          </p>
        </div>

        <RequestsTabs
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          pendingCount={pendingBuddyRequests.length}
        />
        
        {activeTab === "pending" ? (
        <div className="buddy-requests-list">
            {pendingBuddyRequests.map((request) => (
            <RequestCard
                key={request.id}
                request={request}
                onAccept={handleAccept}
                onDecline={handleDecline}
            />
            ))}
        </div>
        ) : pastBuddyRequests.length > 0 ? (
        <div className="buddy-requests-list">
            {pastBuddyRequests.map((request) => (
            <RequestCard
                key={request.id}
                request={request}
                onAccept={handleAccept}
                onDecline={handleDecline}
            />
            ))}
        </div>
        ) : (
        <PastRequestsEmptyState />
        )}
      </section>
    </DashboardLayout>
  );
}

export default BuddyRequestsPage;