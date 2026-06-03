import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { apiRequest } from "../../lib/api";
import { formatAstanaDate } from "../../utils/datetime";
import "../../styles/admin.css";

function formatRole(role) {
  return role === "local" ? "Buddy" : "International Student";
}

function AdminAccountDeletionRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [filterValue, setFilterValue] = useState("pending");
  const [noteByRequest, setNoteByRequest] = useState({});
  const [pendingActionKey, setPendingActionKey] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const loadRequests = async () => {
    const result = await apiRequest("/admin/account-deletion-requests");
    setRequests(result);
  };

  useEffect(() => {
    loadRequests().catch((loadError) => setError(loadError.message));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterValue]);

  const filteredRequests = useMemo(
    () =>
      requests.filter((request) =>
        filterValue === "all" ? true : request.status === filterValue
      ),
    [filterValue, requests]
  );

  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedRequests = filteredRequests.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  const handleReview = async (request, decision) => {
    const actionKey = `${decision}-${request.id}`;
    const adminNote = noteByRequest[request.id] || "";

    try {
      setError("");
      setPendingActionKey(actionKey);
      const result = await apiRequest(`/admin/account-deletion-requests/${request.id}/review`, {
        method: "PATCH",
        body: JSON.stringify({ decision, adminNote }),
      });
      setStatus(result.message);
      setNoteByRequest((prev) => ({ ...prev, [request.id]: "" }));
      await loadRequests();
    } catch (actionError) {
      setError(actionError.message || "Could not review deletion request.");
    } finally {
      setPendingActionKey(null);
    }
  };

  return (
    <DashboardLayout title="Account Deletion Requests" sidebarType="admin">
      <section className="admin-page">
        <div className="admin-page-header">
          <h1>Account Deletion Requests</h1>
          <p>Review user deletion requests, check active platform relationships, and approve or decline safely.</p>
        </div>

        {status ? <div className="admin-status">{status}</div> : null}
        {error ? <div className="admin-status admin-error">{error}</div> : null}

        <div className="dashboard-card admin-main-panel admin-combined-panel">
          <div className="admin-toolbar-controls admin-toolbar-merged">
            <select
              className="admin-select admin-toolbar-select"
              value={filterValue}
              onChange={(event) => setFilterValue(event.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="declined">Declined</option>
              <option value="all">All requests</option>
            </select>
          </div>

          <div className="admin-combined-divider" />

          <div className="admin-section-header admin-section-header-tight">
            <h3>Requests</h3>
            <p>Approving anonymizes the account and closes active matches or pending requests.</p>
          </div>

          <div className="admin-list">
            {filteredRequests.length === 0 ? (
              <div className="admin-empty-state">No account deletion requests match this filter.</div>
            ) : null}

            {paginatedRequests.map((request) => {
              const note = noteByRequest[request.id] || "";
              const approveKey = `approve-${request.id}`;
              const declineKey = `decline-${request.id}`;
              const approvePending = pendingActionKey === approveKey;
              const declinePending = pendingActionKey === declineKey;

              return (
                <article className="admin-list-item admin-match-item" key={request.id}>
                  <div className="admin-item-main">
                    <div className="admin-item-title-row">
                      <h4>{request.user_name}</h4>
                      <span className={`admin-status-pill ${request.status}`}>
                        {request.status}
                      </span>
                    </div>
                    <p>{request.user_email}</p>
                    <div className="admin-meta">
                      <span>{formatRole(request.user_role)}</span>
                      <span>Requested: {formatAstanaDate(request.requested_at)}</span>
                      <span>{request.active_matches_count} active matches</span>
                      <span>{request.pending_requests_count} pending requests</span>
                    </div>
                    <div className="admin-request-reason">
                      <strong>Deletion reason</strong>
                      <p>{request.reason}</p>
                    </div>
                    {request.admin_note ? (
                      <p className="admin-warning-text">Admin note: {request.admin_note}</p>
                    ) : null}
                  </div>

                  {request.status === "pending" ? (
                    <div className="admin-action-panel">
                      <textarea
                        className="admin-note-input compact"
                        rows={3}
                        placeholder="Admin note, required when declining..."
                        value={note}
                        onChange={(event) =>
                          setNoteByRequest((prev) => ({ ...prev, [request.id]: event.target.value }))
                        }
                      />
                      <div className="admin-inline-actions">
                        <button
                          type="button"
                          className="admin-danger-btn"
                          onClick={() => handleReview(request, "approve")}
                          disabled={approvePending}
                          aria-busy={approvePending}
                        >
                          {approvePending ? "Approving..." : "Approve deletion"}
                        </button>
                        <button
                          type="button"
                          className="admin-secondary-btn"
                          onClick={() => handleReview(request, "decline")}
                          disabled={declinePending || note.trim().length < 5}
                          aria-busy={declinePending}
                        >
                          {declinePending ? "Declining..." : "Decline"}
                        </button>
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>

          <div className="admin-pagination">
            <button
              type="button"
              className="admin-page-btn"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={safePage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={`admin-page-btn ${safePage === page ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              className="admin-page-btn"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={safePage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default AdminAccountDeletionRequestsPage;