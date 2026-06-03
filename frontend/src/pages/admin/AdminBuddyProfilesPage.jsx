import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { apiRequest } from "../../lib/api";
import "../../styles/admin.css";

const statusLabel = {
  pending: "Pending review",
  approved: "Approved",
  rejected: "Rejected",
  suspended: "Suspended",
  not_applied: "Not applied",
  deleted: "Deleted",
};

function isDeletedAccount(buddy) {
  return (
    buddy?.account_status === "deleted" ||
    buddy?.email?.endsWith("@deleted.local") ||
    /^Deleted user\b/i.test(buddy?.full_name || "")
  );
}

function AdminBuddyProfilesPage() {
  const [buddies, setBuddies] = useState([]);
  const [reasonById, setReasonById] = useState({});
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingActionKey, setPendingActionKey] = useState(null);

  const loadBuddies = async () => {
    const result = await apiRequest("/admin/matches");
    setBuddies(result.buddyProfiles || []);
  };

  useEffect(() => {
    loadBuddies().catch((loadError) => setError(loadError.message));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, statusFilter]);

  const isActionPending = (actionKey) => pendingActionKey === actionKey;

  const filteredBuddies = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return buddies.filter((buddy) => {
      const deletedAccount = isDeletedAccount(buddy);
      const searchableName = deletedAccount ? "deleted buddy account" : buddy.full_name;
      const searchableEmail = deletedAccount ? "" : buddy.email;
      const matchesQuery =
        !query ||
        [
          searchableName,
          searchableEmail,
          buddy.city,
          buddy.study_program,
          buddy.languages?.join(" "),
          buddy.hobbies?.join(" "),
          buddy.support_areas?.join(" "),
          buddy.preferred_meeting_mode,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" || buddy.buddy_status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [buddies, searchValue, statusFilter]);

  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredBuddies.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedBuddies = filteredBuddies.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  const handleBuddyStatus = async (buddy, buddyStatus) => {
    const actionKey = `${buddyStatus}-${buddy.id}`;

    try {
      setError("");
      setPendingActionKey(actionKey);
      const reason = reasonById[buddy.id] || "";

      await apiRequest(`/admin/buddies/${buddy.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ buddyStatus, reason }),
      });

      setStatus(buddyStatus === "approved" ? "Buddy profile approved." : `Buddy profile marked as ${buddyStatus}.`);
      setReasonById((prev) => ({ ...prev, [buddy.id]: "" }));
      await loadBuddies();
    } catch (actionError) {
      setError(actionError.message || "Could not update buddy profile.");
    } finally {
      setPendingActionKey(null);
    }
  };

  return (
    <DashboardLayout title="Buddy Profiles" sidebarType="admin">
      <section className="admin-page">
        <div className="admin-page-header">
          <h1>Buddy Profiles</h1>
          <p>Review buddy applications, approve trusted buddies, or temporarily remove them from matching.</p>
        </div>

        {status ? <div className="admin-status">{status}</div> : null}
        {error ? <div className="admin-status admin-error">{error}</div> : null}

        <div className="dashboard-card admin-list-card">
          <div className="admin-section-header">
            <h3>Buddy applications</h3>
            <p>Only approved buddies with free capacity appear in Find Buddies and Match Management.</p>
          </div>

          <div className="admin-toolbar-controls admin-buddy-toolbar">
            <div className="admin-search">
              <input
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search by name, email, city, language or program"
              />
            </div>

            <select
              className="admin-select admin-toolbar-select"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending review</option>
              <option value="approved">Approved</option>
              <option value="suspended">Suspended</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="admin-list">
            {filteredBuddies.length === 0 ? (
              <div className="admin-empty-state">No buddy profiles match the current search or filter.</div>
            ) : null}
            {paginatedBuddies.map((buddy) => {
              const deletedAccount = isDeletedAccount(buddy);
              const isApproved = buddy.buddy_status === "approved";
              const isRejected = buddy.buddy_status === "rejected";
              const isSuspended = buddy.buddy_status === "suspended";
              const activeStudents = Number(buddy.active_students_count || 0);
              const maxBuddies = Number(buddy.max_buddies || 3);
              const cannotDisable = activeStudents > 0;
              const reason = reasonById[buddy.id] || "";
              const approvePending = isActionPending(`approved-${buddy.id}`);
              const rejectPending = isActionPending(`rejected-${buddy.id}`);
              const suspendPending = isActionPending(`suspended-${buddy.id}`);
              const rowPending = approvePending || rejectPending || suspendPending;
              const displayStatus = deletedAccount ? "deleted" : buddy.buddy_status;

              return (
                <article
                  className={`admin-list-item admin-profile-item ${deletedAccount ? "is-archived" : ""}`}
                  key={buddy.id}
                >
                  <div className="admin-item-main">
                    <div className="admin-item-title-row">
                      <h4>{deletedAccount ? "Deleted buddy account" : buddy.full_name}</h4>
                      <span className={`admin-status-pill ${displayStatus}`}>
                        {statusLabel[displayStatus] || displayStatus}
                      </span>
                    </div>
                    {deletedAccount ? (
                      <>
                        <p className="admin-muted-text">Email removed after deletion</p>
                        <div className="admin-archived-note">
                          This account was anonymized after deletion approval. Buddy application actions are no longer available here.
                        </div>
                      </>
                    ) : (
                      <>
                        <p>{buddy.email}</p>
                        <div className="admin-meta">
                          <span>{buddy.city || "Kazakhstan"}</span>
                          <span>{buddy.study_program || "Program not set"}</span>
                          <span>{activeStudents}/{maxBuddies} active students</span>
                          <span>{buddy.preferred_meeting_mode ? buddy.preferred_meeting_mode.replaceAll("_", " ") : "both"} meetings</span>
                          <span>{buddy.max_weekly_hours || 2}h/week</span>
                          <span>{buddy.languages?.length ? buddy.languages.join(", ") : "Languages not set"}</span>
                          <span>{buddy.hobbies?.length ? buddy.hobbies.join(", ") : "Interests not set"}</span>
                          <span>{buddy.support_areas?.length ? buddy.support_areas.join(", ") : "Support areas not set"}</span>
                        </div>
                        <p>{buddy.about_you || "This buddy has not added a bio yet."}</p>
                        {cannotDisable ? (
                          <p className="admin-warning-text">Reassign or close active matches before rejecting or suspending this buddy.</p>
                        ) : null}
                      </>
                    )}
                  </div>

                  {deletedAccount ? null : (
                    <div className="admin-action-panel">
                      <textarea
                        className="admin-note-input compact"
                        rows={2}
                        placeholder="Reason for reject/suspend, visible to buddy..."
                        value={reason}
                        disabled={rowPending}
                        onChange={(event) => setReasonById((prev) => ({ ...prev, [buddy.id]: event.target.value }))}
                      />
                      <div className="admin-inline-actions">
                        <button
                          type="button"
                          className="admin-primary-btn"
                          disabled={isApproved || rowPending}
                          onClick={() => handleBuddyStatus(buddy, "approved")}
                          aria-busy={approvePending}
                        >
                          {approvePending ? "Approving..." : isApproved ? "Approved" : "Approve"}
                        </button>
                        <button
                          type="button"
                          className="admin-danger-btn"
                          disabled={cannotDisable || isRejected || !reason.trim() || rowPending}
                          onClick={() => handleBuddyStatus(buddy, "rejected")}
                          aria-busy={rejectPending}
                        >
                          {rejectPending ? "Rejecting..." : isRejected ? "Rejected" : "Reject"}
                        </button>
                        <button
                          type="button"
                          className="admin-secondary-btn"
                          disabled={cannotDisable || isSuspended || !reason.trim() || rowPending}
                          onClick={() => handleBuddyStatus(buddy, "suspended")}
                          aria-busy={suspendPending}
                        >
                          {suspendPending ? "Suspending..." : isSuspended ? "Suspended" : "Suspend"}
                        </button>
                      </div>
                    </div>
                  )}
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

export default AdminBuddyProfilesPage;