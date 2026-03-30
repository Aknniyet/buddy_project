import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import RequestsTabs from "../../components/buddy-requests/RequestsTabs";
import RequestCard from "../../components/buddy-requests/RequestCard";
import PastRequestsEmptyState from "../../components/buddy-requests/PastRequestsEmptyState";
import {
  initialPendingBuddyRequests,
  initialPastBuddyRequests,
} from "../../constants/buddyRequestsData";
import "../../styles/buddy-requests.css";

function BuddyRequestsPage() {
  const [activeTab, setActiveTab] = useState("pending");
  const [pendingRequests, setPendingRequests] = useState(
    initialPendingBuddyRequests
  );
  const [pastRequests, setPastRequests] = useState(initialPastBuddyRequests);

  const handleAccept = (requestId) => {
    const selectedRequest = pendingRequests.find(
      (request) => request.id === requestId
    );

    if (!selectedRequest) return;

    const updatedRequest = {
      ...selectedRequest,
      status: "accepted",
    };

    setPendingRequests((prev) =>
      prev.filter((request) => request.id !== requestId)
    );

    setPastRequests((prev) => [updatedRequest, ...prev]);
    setActiveTab("past");
  };

  const handleDecline = (requestId) => {
    const selectedRequest = pendingRequests.find(
      (request) => request.id === requestId
    );

    if (!selectedRequest) return;

    const updatedRequest = {
      ...selectedRequest,
      status: "declined",
    };

    setPendingRequests((prev) =>
      prev.filter((request) => request.id !== requestId)
    );

    setPastRequests((prev) => [updatedRequest, ...prev]);
    setActiveTab("past");
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
          pendingCount={pendingRequests.length}
        />

        {activeTab === "pending" ? (
          pendingRequests.length > 0 ? (
            <div className="buddy-requests-list">
              {pendingRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                />
              ))}
            </div>
          ) : (
            <div className="buddy-past-empty-card">
              <div className="buddy-past-empty-content">
                <h3>No pending requests</h3>
                <p>New buddy requests will appear here.</p>
              </div>
            </div>
          )
        ) : pastRequests.length > 0 ? (
          <div className="buddy-requests-list">
            {pastRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                isPast={true}
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